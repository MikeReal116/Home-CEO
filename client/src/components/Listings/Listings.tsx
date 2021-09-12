import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { LISTINGS } from '../../lib/graphql/queries/Listings';
import {
  Listing as ListingsData,
  ListingVariables
} from '../../lib/graphql/queries/Listings/__generated__/Listing';
import { ListingFilter } from '../../lib/graphql/globalTypes';
import ListCard from '../Card/ListCard';
import Select from '../Select/Select';
import { useStyles } from './styles';
import PaginationControlled from '../Pagination/PaginationControlled';
import { CircularProgress, Typography } from '@material-ui/core';
import { errorNotification } from '../../lib/notifications/error';

interface Params {
  location: string;
}

const LIMIT = 8;
const Listings = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(ListingFilter.PRICE_LOW_TO_HIGH);
  const classes = useStyles();
  const { location } = useParams<Params>();

  const { data, error, loading } = useQuery<ListingsData, ListingVariables>(
    LISTINGS,
    {
      variables: {
        limit: LIMIT,
        page,
        filter,
        location
      }
    }
  );

  const listings = data ? data.listings : null;
  const count = listings ? Math.ceil(listings.total / LIMIT) : 0;

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return errorNotification('Could not get listings, Try again later');
  }

  if (listings && listings.total === 0) {
    return (
      <Typography align='center' variant='caption'>
        Sorry Could not find any listings available. Try Searching to listings
        in other areas or you list properties in this location if you have one
      </Typography>
    );
  }

  const renderSearchText =
    listings && listings.search ? (
      <Grid item xs={12}>
        <Typography color='primary' variant='h6'>
          <strong>{listings.search}</strong>
        </Typography>
      </Grid>
    ) : null;

  const renderSelectAndPaginate = (
    <Grid item xs={12} className={classes.filterPage}>
      <Select
        option={filter}
        setOption={setFilter}
        options={[
          { name: 'Price low to high', value: ListingFilter.PRICE_LOW_TO_HIGH },
          { name: 'Price hight to low', value: ListingFilter.PRICE_HIGH_TO_LOW }
        ]}
      />
      <span>
        {listings && listings.total > LIMIT && (
          <PaginationControlled page={page} count={count} onSetPage={setPage} />
        )}
      </span>
    </Grid>
  );

  return (
    <Container maxWidth='xl' className={classes.root}>
      <Grid container spacing={2}>
        {renderSearchText}
        {renderSelectAndPaginate}
        {listings &&
          listings.result.map((listing) => (
            <Grid item xs={12} md={3} key={listing.id}>
              <ListCard
                id={listing.id}
                title={listing.title}
                image={listing.image}
                price={listing.price}
                numOfGuests={listing.numOfGuests}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Listings;
