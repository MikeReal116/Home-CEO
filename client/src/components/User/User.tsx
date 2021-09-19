import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CircularProgress, Container } from '@material-ui/core';

import { GET_USER } from '../../lib/graphql/queries/User';
import {
  GetUser as UserData,
  GetUserVariables as UserVariables
} from '../../lib/graphql/queries/User/__generated__/GetUser';
import UserDetail from '../UserDetail/UserDetail';
import { Viewer } from '../../lib/types';
import { errorNotification } from '../../lib/notifications/error';
import { successNotification } from '../../lib/notifications/success';
import UserListing from '../UserListing/UserListing';
import UserBooking from '../UserBooking/UserBooking';

interface Param {
  id: string;
}

interface Props {
  viewer: Viewer;
  setViewer: React.Dispatch<React.SetStateAction<Viewer>>;
}

const LIMIT = 4;

const User = ({ viewer, setViewer }: Props) => {
  const [bookingPage, setBookingPage] = useState(1);
  const [listingPage, setListingPage] = useState(1);

  const { id } = useParams<Param>();

  const {
    data: userData,
    loading,
    error
  } = useQuery<UserData, UserVariables>(GET_USER, {
    variables: { id, limit: LIMIT, bookingPage, listingPage },
    fetchPolicy: 'cache-and-network'
  });

  const isViewerSameUser = Boolean(
    userData?.user && userData.user.id === viewer.id
  );

  if (loading) {
    return <CircularProgress />;
  }
  if (!loading && error) {
    return errorNotification('Error getting user, try again later');
  }

  const StripeError = new URLSearchParams(window.location.search).get(
    'stripe_error'
  );

  const bookingSuccess = new URLSearchParams(window.location.search).get(
    'booking_success'
  );

  return (
    <div>
      {StripeError &&
        errorNotification('There was a problem connecting with Stripe')}
      {bookingSuccess &&
        successNotification('Congratulations. Booking was successfully made')}
      <Container maxWidth='sm'>
        <UserDetail
          user={userData?.user}
          isViewerSameUser={isViewerSameUser}
          viewer={viewer}
          setViewer={setViewer}
        />
      </Container>
      {userData?.user?.listings && (
        <Container>
          <UserListing
            listings={userData.user.listings}
            listingPage={listingPage}
            setListingPage={setListingPage}
            limit={LIMIT}
          />
        </Container>
      )}
      {isViewerSameUser && userData?.user?.bookings && (
        <Container>
          <UserBooking
            bookingPage={bookingPage}
            setBookingPage={setBookingPage}
            limit={LIMIT}
            bookings={userData?.user?.bookings}
          />
        </Container>
      )}
    </div>
  );
};

export default User;
