import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { GetUser_user_bookings as UserBookings } from '../../lib/graphql/queries/User/__generated__/GetUser';
import ListCard from '../Card/ListCard';
import PaginationControlled from '../Pagination/PaginationControlled';
import { useStyles } from './styles ';

interface Props {
  bookingPage: number;
  limit: number;
  setBookingPage: React.Dispatch<React.SetStateAction<number>>;
  bookings: UserBookings;
}

const UserBooking = ({
  limit,
  bookingPage,
  bookings,
  setBookingPage
}: Props) => {
  const classes = useStyles();

  const renderBooking =
    bookings.total === 0 ? (
      <Grid item xs={12}>
        <Typography variant='body1' align='center'>
          You currently havent made any bookings
        </Typography>
      </Grid>
    ) : (
      <>
        <Grid item xs={12}>
          <Typography variant='body1' align='center'>
            {' '}
            Bookings you have made
          </Typography>
        </Grid>
        {limit < bookings.total && (
          <Grid item xs={12} className={classes.paginate}>
            <PaginationControlled
              page={bookingPage}
              count={Math.ceil(bookings.total / limit)}
              onSetPage={setBookingPage}
            />
          </Grid>
        )}
        {bookings.result.map((booking) => {
          return (
            <Grid
              key={booking.id}
              item
              xs={12}
              md={4}
              lg={3}
              className={classes.card}
            >
              <ListCard
                price={booking.listing.price}
                image={booking.listing.image}
                title={booking.listing.title}
                id={booking.listing.id}
                numOfGuests={booking.listing.numOfGuests}
              />
            </Grid>
          );
        })}
      </>
    );
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h6' color='primary' className={classes.heading}>
          Bookings
        </Typography>
      </Grid>
      {renderBooking}
    </Grid>
  );
};

export default UserBooking;
