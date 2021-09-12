import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import {
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Container,
  Typography
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

import { useStyles } from './styles';
import HomeHero from '../HomeHero/HomeHero';
import map from '../../assets/city.jpg';
import mexico from '../../assets/mexico.jpg';
import san from '../../assets/san.jpg';
import { LISTINGS } from '../../lib/graphql/queries/Listings';
import {
  Listing as ListingsData,
  ListingVariables
} from '../../lib/graphql/queries/Listings/__generated__/Listing';
import { ListingFilter } from '../../lib/graphql/globalTypes';
import ListCard from '../Card/ListCard';

const LIMIT = 4;
const PAGE = 1;
const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const classes = useStyles();
  const { data: ListingsData, loading } = useQuery<
    ListingsData,
    ListingVariables
  >(LISTINGS, {
    variables: {
      filter: ListingFilter.PRICE_HIGH_TO_LOW,
      limit: LIMIT,
      page: PAGE
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchTerm(e.target.value.trim());
  };

  const disabled = searchTerm ? false : true;

  const renderPremiumListing = () => {
    if (loading) {
      return (
        <Container maxWidth='xs'>
          <CircularProgress />
        </Container>
      );
    }
    if (ListingsData) {
      return (
        <Grid container spacing={2} className={classes.premium}>
          <Grid item xs={12}>
            <Typography variant='h6' color='primary'>
              <strong>Premium listings</strong>
            </Typography>
          </Grid>
          {ListingsData.listings.result.map((listing) => (
            <Grid item xs={12} md={3} key={listing.id}>
              <ListCard
                id={listing.id}
                price={listing.price}
                image={listing.image}
                title={listing.title}
                numOfGuests={listing.numOfGuests}
              />
            </Grid>
          ))}
        </Grid>
      );
    }
    return null;
  };

  console.log(ListingsData);

  return (
    <Container
      maxWidth='xl'
      className={classes.root}
      style={{ backgroundImage: `url(${map})`, backgroundRepeat: 'repeat-x' }}
    >
      <Typography variant='h5' color='primary' paragraph>
        <strong>Find places in the world</strong>
      </Typography>
      <Paper className={classes.search} elevation={3}>
        <InputBase
          className={classes.input}
          placeholder='Search Cities'
          inputProps={{ 'aria-label': 'search cities' }}
          onChange={handleChange}
        />
        <IconButton
          type='submit'
          className={classes.iconButton}
          aria-label='search'
          disabled={disabled}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <HomeHero />
      <Grid container spacing={3} className={classes.infoSec}>
        <Grid item xs={12}>
          <Typography variant='h5' color='primary'>
            <strong>We are here to help you with best housing in town</strong>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color='textSecondary'>
            We will help you make you trip a remarkable on with the best housing
            you can thing of
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button color='primary' variant='contained' className={classes.btn}>
            Popular Listings from the US
          </Button>
        </Grid>
      </Grid>
      {renderPremiumListing()}
      <Grid container spacing={2} className={classes.otherListings}>
        <Grid item xs={12}>
          <Typography paragraph variant='h6' color='primary'>
            <strong> Other interesting listings</strong>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Link to={'/listings/mexico'}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={mexico}
                title='city'
              />
              <Typography variant='subtitle2' className={classes.cityName}>
                Explore the best places in mexico
              </Typography>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Link to={`/listings/san%20francisco`}>
            <Card className={classes.card}>
              <CardMedia className={classes.media} image={san} title='city' />
              <Typography variant='subtitle2' className={classes.cityName}>
                San Francisco with love
              </Typography>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
