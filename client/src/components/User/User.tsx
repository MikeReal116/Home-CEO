import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Container } from '@material-ui/core';

import { GET_USER } from '../../lib/graphql/queries/User';
import {
  GetUser as UserData,
  GetUserVariables as UserVariables
} from '../../lib/graphql/queries/User/__generated__/GetUser';
import UserDetail from '../UserDetail/UserDetail';

interface Param {
  id: string;
}

const LIMIT = 4;

const User = () => {
  const [bookingPage, setBookingPage] = useState(1);
  const [listingPage, setListingPage] = useState(1);

  const { id } = useParams<Param>();

  const {
    data: userData,
    loading,
    error
  } = useQuery<UserData, UserVariables>(GET_USER, {
    variables: { id, limit: LIMIT, bookingPage, listingPage }
  });

  return (
    <div>
      <Container maxWidth='sm'>
        <UserDetail user={userData?.user} />
      </Container>
    </div>
  );
};

export default User;
