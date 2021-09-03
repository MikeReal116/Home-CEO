import crypto from 'crypto';
import { Request, Response } from 'express';
import { IResolvers } from '@graphql-tools/utils';

import { Google } from '../../../lib/api/google';
import { Viewer, Database, User } from '../../../lib/types';
import { LogInArgs } from './types';

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === 'development' ? false : true
};
const googleLogin = async (
  code: string,
  token: string,
  db: Database,
  res: Response
): Promise<User | undefined> => {
  try {
    const { user } = await Google.login(code);
    if (!user) {
      throw new Error('Google Login failed');
    }

    const userNameList = user.names?.length ? user.names : null;
    const userPhotosList = user.photos?.length ? user.photos : null;
    const userEmailsList = user.emailAddresses?.length
      ? user.emailAddresses
      : null;

    const userName = userNameList ? userNameList[0].displayName : null;
    const userId = userNameList ? userNameList[0]?.metadata?.source?.id : null;
    const userAvatar = userPhotosList ? userPhotosList[0]?.url : null;
    const userEmail = userEmailsList ? userEmailsList[0]?.value : null;

    if (!userName || !userId || !userAvatar || !userEmail) {
      throw new Error('Google login failed');
    }

    const updateResult = await db.users.findOneAndUpdate(
      { _id: userId },
      { $set: { name: userName, avatar: userAvatar, email: userEmail, token } },
      { returnDocument: 'after' }
    );

    let viewer = updateResult.value;

    if (!viewer) {
      const InsertResult = await db.users.insertOne({
        _id: userId,
        name: userName,
        token,
        email: userEmail,
        avatar: userAvatar,
        income: 0,
        bookings: [],
        listings: []
      });
      const viewerID = InsertResult.insertedId;

      viewer = await db.users.findOne({ _id: viewerID });
    }

    res.cookie('viewer', userId, {
      ...cookieOptions,
      maxAge: 365 * 24 * 60 * 60
    });

    return viewer;
  } catch (error) {
    throw new Error(`Google login failed : ${error}`);
  }
};

const cookieLogin = async (
  token: string,
  db: Database,
  req: Request,
  res: Response
): Promise<User | undefined> => {
  const updateResult = await db.users.findOneAndUpdate(
    { _id: req.signedCookies?.viewer },
    { $set: { token } },
    { returnDocument: 'after' }
  );

  const viewer = updateResult.value;

  if (!viewer) {
    res.clearCookie('viewer', cookieOptions);
  }

  return viewer;
};

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: () => {
      try {
        return Google.authUrl;
      } catch (error) {
        throw new Error(`Failed to get Google Auth Url: ${error}`);
      }
    }
  },
  Mutation: {
    logIn: async (
      _root: undefined,
      { input }: LogInArgs,
      { db, req, res }: { db: Database; req: Request; res: Response }
    ) => {
      try {
        const code = input ? input.code : null;
        const token = crypto.randomBytes(16).toString('hex');
        const viewer = code
          ? await googleLogin(code, token, db, res)
          : await cookieLogin(token, db, req, res);

        if (!viewer) {
          return { didRequest: true };
        }
        return {
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
          didRequest: true
        };
      } catch (error) {
        throw new Error(`Google login failed : ${error}`);
      }
    },
    logOut: (
      _root: undefined,
      _args: Record<string, never>,
      { res }: { res: Response }
    ) => {
      res.clearCookie('viewer', cookieOptions);
      return { didRequest: true };
    }
  },
  Viewer: {
    id: (viewer: Viewer) => viewer._id,
    hasWallet: (viewer: Viewer) => (viewer.walletId ? true : undefined)
  }
};
