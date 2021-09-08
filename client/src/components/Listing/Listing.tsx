import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import { CircularProgress, Container } from '@material-ui/core';

import ListingDetail from '../ListingDetail/ListingDetail';
import { GET_LISTNG } from '../../lib/graphql/queries/Listing';
import {
  GetListing as ListingData,
  GetListingVariables
} from '../../lib/graphql/queries/Listing/__generated__/GetListing';
import { errorNotification } from '../../lib/notifications/error';
import { useStyles } from './styles';

interface Params {
  id: string;
}
const LIMIT = 4;
const PAGE = 1;

const Listing = () => {
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

  return (
    <Container>
      <Grid container className={classes.root}>
        <Grid item xs={12} md={6} lg={8}>
          {data && data.listing && <ListingDetail listing={data.listing} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Listing;
