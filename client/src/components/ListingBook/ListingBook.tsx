import { Button, Container, Typography } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addMonths } from 'date-fns';
import moment from 'moment';

import { Viewer } from '../../lib/types';
import { GetListing_listing } from '../../lib/graphql/queries/Listing/__generated__/GetListing';
import { formatPrice } from '../../lib/utils/priceFormat';
import { useStyles } from './styles';

interface Props {
  startDate: null | Date;
  endDate: null | Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  listing: GetListing_listing;
  viewer: Viewer;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListingBook = ({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  listing,
  viewer,
  setOpenModal
}: Props) => {
  const classes = useStyles();

  const handleChange = (dates: Date | [Date | null, Date | null]) => {
    const [start, end] = dates as Date[];
    setStartDate(start);
    setEndDate(end);
  };

  const checkBookedDate = () => {
    const excludedDate: Date[] = [];
    let startCursor = moment();
    const endCursor = moment(moment()).add(5, 'M');

    while (endCursor.diff(startCursor, 'days') >= 0) {
      const year = moment(startCursor).format('YYYY');
      const month = moment(startCursor).format('MM');
      const day = moment(startCursor).format('DD');

      const bookingsIndex = JSON.parse(listing.bookingsIndex);
      if (
        bookingsIndex &&
        bookingsIndex[year] &&
        bookingsIndex[year][month] &&
        bookingsIndex[year][month][day] === true
      ) {
        excludedDate.push(new Date(`${year}/${month}/${day}`));
      }

      startCursor = startCursor.add(1, 'days');
    }
    return excludedDate;
  };

  const verifyBooking = () => {
    if (!viewer.id) {
      return 'Please login to book';
    }
    if (viewer.id === listing.host.id) {
      return 'You can not book your own listing';
    }
    if (!listing.host.hasWallet) {
      return 'Host is currently disconnected from Stripe';
    } else {
      return false;
    }
  };

  const excludedDates = checkBookedDate();

  return (
    <Container className={classes.root}>
      <Typography variant='h6' paragraph color='primary'>
        Book your stay
      </Typography>
      <Typography paragraph>
        <span className={classes.price}>{formatPrice(listing.price)}</span> /
        day
      </Typography>

      <DatePicker
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        minDate={new Date()}
        maxDate={addMonths(new Date(), 5)}
        showDisabledMonthNavigation
        excludeDates={excludedDates}
      />
      <Button
        variant='contained'
        color='primary'
        className={classes.btn}
        disabled={startDate && endDate && !verifyBooking() ? false : true}
        onClick={() => setOpenModal(true)}
      >
        Reserve and book
      </Button>
      {verifyBooking() && (
        <Typography variant='caption' color='error'>
          {verifyBooking()}
        </Typography>
      )}
    </Container>
  );
};

export default ListingBook;
