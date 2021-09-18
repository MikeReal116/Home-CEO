import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import { CircularProgress, Container } from '@material-ui/core';
import moment from 'moment';

import ListingDetail from '../ListingDetail/ListingDetail';
import { GET_LISTNG } from '../../lib/graphql/queries/Listing';
import {
  GetListing as ListingData,
  GetListingVariables
} from '../../lib/graphql/queries/Listing/__generated__/GetListing';
import { errorNotification } from '../../lib/notifications/error';
import { useStyles } from './styles';
import ListingBook from '../ListingBook/ListingBook';
import { Viewer } from '../../lib/types';
import ModalComponent from '../Modal/Modal';

interface Params {
  id: string;
}

interface Props {
  viewer: Viewer;
}
const LIMIT = 4;
const PAGE = 1;

const Listing = ({ viewer }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams<Params>();
  const { data, loading, error } = useQuery<ListingData, GetListingVariables>(
    GET_LISTNG,
    { variables: { id, limit: LIMIT, page: PAGE } }
  );
  const classes = useStyles();

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return errorNotification('Could not find this listing');
  }

  const checkInDateString = moment(startDate).format('YYYY/MM/DD');
  const checkOutDateString = moment(endDate).format('YYYY/MM/DD');

  const price =
    data && data.listing
      ? (moment(checkOutDateString, 'YYYY/MM/DD').diff(
          moment(checkInDateString, 'YYYY/MM/DD'),
          'days'
        ) +
          1) *
        data?.listing?.price
      : 0;

  const resetData = () => {
    setStartDate(null);
    setEndDate(null);
    setOpenModal(false);
  };

  return (
    <Container>
      <Grid container className={classes.root}>
        <Grid item xs={12} md={6} lg={8}>
          {data && data.listing && <ListingDetail listing={data.listing} />}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {data && data.listing && (
            <ListingBook
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              listing={data.listing}
              viewer={viewer}
              setOpenModal={setOpenModal}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          {data && data.listing && (
            <ModalComponent
              openModal={openModal}
              setOpenModal={setOpenModal}
              checkInDate={checkInDateString}
              checkOutDate={checkOutDateString}
              price={price}
              listingId={data.listing.id}
              resetData={resetData}
              viewerId={viewer.id}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Listing;
