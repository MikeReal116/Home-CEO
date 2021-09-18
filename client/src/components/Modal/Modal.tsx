import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { CircularProgress, makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { formatPrice } from '../../lib/utils/priceFormat';
import { errorNotification } from '../../lib/notifications/error';
import { BookListing } from '../../lib/graphql/mutations/bookListing';
import {
  BookListing as BookListingData,
  BookListingVariables
} from '../../lib/graphql/mutations/bookListing/__generated__/BookListing';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: '24px',
    padding: theme.spacing(3)
  },
  card: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    border: '1px solid #424770',
    padding: theme.spacing(3)
  }
}));

interface Props {
  price: number;
  checkInDate: string;
  checkOutDate: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  listingId: string;
  resetData: () => void;
  viewerId: string | null;
}

const ModalComponent = ({
  price,
  checkInDate,
  checkOutDate,
  openModal,
  setOpenModal,
  listingId,
  resetData,
  viewerId
}: Props) => {
  const [error, setError] = useState('');
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();

  const [bookListingFn, { data, loading }] = useMutation<
    BookListingData,
    BookListingVariables
  >(BookListing, {
    onCompleted: (data) => {
      if (data && data.createBooking) {
        resetData();
      }
    }
  });

  const handleModalClose = () => {
    setOpenModal(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (data && data.createBooking) {
    return <Redirect to={`/user/${viewerId}?booking_success=true`} />;
  }

  const handlePaymentSubmit = async (
    e: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    e?.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      return;
    }

    const result = await stripe.createToken(cardElement);
    if (result.error) {
      setError(error ? error : 'There was an error');
    } else {
      bookListingFn({
        variables: {
          input: {
            listing: listingId,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            source: result.token.id
          }
        }
      });
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={handleModalClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className={classes.root}>
        {error && errorNotification(error)}
        <Typography
          variant='h6'
          id='modal-modal-title'
          color='primary'
          paragraph
        >
          Book Listing
        </Typography>
        <Typography variant='subtitle2' paragraph id='modal-modal-description'>
          This is to confirm that you are making a booking from{' '}
          <mark>{`${checkInDate}`}</mark> to <mark>{`${checkOutDate} `}</mark>
        </Typography>
        <Typography paragraph>
          Price: <mark>{formatPrice(price)} </mark>
        </Typography>
        <form onSubmit={handlePaymentSubmit}>
          <CardElement
            className={classes.card}
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',

                  '::placeholder': {
                    color: '#aab7c4'
                  }
                },
                invalid: {
                  color: '#9e2146'
                }
              },
              hidePostalCode: true
            }}
          />

          <Button
            variant='contained'
            color='primary'
            type='submit'
            disabled={!stripe}
          >
            Book Now
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
