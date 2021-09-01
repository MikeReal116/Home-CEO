import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET,
  `${process.env.PUBLIC_URL}/login`
);

export const Google = {
  authUrl: oauth2Client.generateAuthUrl({
    access_type: 'online',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  }),
  login: async (code: string) => {
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const { data } = await google
      .people({ version: 'v1', auth: oauth2Client })
      .people.get({
        resourceName: 'people/me',
        personFields: 'names,emailAddresses,photos'
      });
    return { user: data };
  }
};
