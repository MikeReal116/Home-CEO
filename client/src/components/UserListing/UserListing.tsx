import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import { GetUser_user_listings as ListingData } from '../../lib/graphql/queries/User/__generated__/GetUser';
import ListCard from '../Card/ListCard';
import PaginationControlled from '../Pagination/PaginationControlled';
import { useStyles } from './styles';

interface Props {
  listings: ListingData;
  listingPage: number;
  setListingPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}

const UserListing = ({
  listings,
  listingPage,
  setListingPage,
  limit
}: Props) => {
  const classes = useStyles();

  const renderListing =
    listings.total === 0 ? (
      <Grid item xs={12}>
        <Typography variant='body1' align='center'>
          This user has no listings available yet
        </Typography>
      </Grid>
    ) : (
      <>
        <Grid item xs={12}>
          <Typography paragraph variant='body1' align='center'>
            Listings by this user that are available for booking
          </Typography>
        </Grid>
        {limit < listings.total && (
          <Grid item xs={12} className={classes.paginate}>
            <PaginationControlled
              page={listingPage}
              count={Math.ceil(listings.total / limit)}
              onSetPage={setListingPage}
            />
          </Grid>
        )}
        {listings.result.map((listing) => {
          return (
            <Grid
              key={listing.id}
              item
              xs={12}
              md={4}
              lg={3}
              className={classes.card}
            >
              <ListCard
                price={listing.price}
                image={listing.image}
                title={listing.title}
                id={listing.id}
                numOfGuests={listing.numOfGuests}
              />
            </Grid>
          );
        })}
      </>
    );

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Typography variant='h6' color='primary' className={classes.heading}>
          Listings
        </Typography>
      </Grid>
      {renderListing}
    </Grid>
  );
};

export default UserListing;
