import { useQuery, useMutation, gql } from '@apollo/client';
import {
  Grid,
  Typography,
  CircularProgress,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Button
} from '@material-ui/core';
import { useStyles } from './styles';

import {
  DeleteListing,
  DeleteListingVariables
} from './__generated__/DeleteListing';

import { GetListings as ListingsData } from './__generated__/GetListings';

const GET_LISTINGS = gql`
  query GetListings {
    listings {
      id
      title
      image
      address
      price
      numOfBeds
      numOfGuests
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    listing: deleteListing(id: $id) {
      id
    }
  }
`;

const Listings = () => {
  const classes = useStyles();
  const { data, loading, error, refetch } =
    useQuery<ListingsData>(GET_LISTINGS);

  const [deleteMutation, { error: deleteError }] = useMutation<
    DeleteListing,
    DeleteListingVariables
  >(DELETE_LISTING);

  const deleteListing = async (id: string) => {
    await deleteMutation({ variables: { id } });
    refetch();
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color='secondary'>Something went Wrong</Typography>;
  }

  const deleteListingError = deleteError ? (
    <Typography color='secondary'>
      Something went wrong! Try again later
    </Typography>
  ) : null;

  const renderListings = data
    ? data.listings.map((listing) => {
        return (
          <Grid item xs={12} key={listing.id}>
            <List className={classes.list}>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar
                    alt={listing.title}
                    src={listing.image}
                    variant='square'
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={listing.title}
                  secondary={listing.address}
                />
              </ListItem>
              <span>
                <Button
                  onClick={() => deleteListing(listing.id)}
                  variant='outlined'
                  size='small'
                  color='primary'
                >
                  Delete
                </Button>
              </span>
            </List>
          </Grid>
        );
      })
    : null;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h5' paragraph>
          Home-CEO Listings
        </Typography>
      </Grid>
      {renderListings}
      {deleteListingError}
    </Grid>
  );
};

export default Listings;
