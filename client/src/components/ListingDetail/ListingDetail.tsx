import {
  Avatar,
  Card,
  CardMedia,
  Grid,
  Box,
  Typography
} from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';

import { GetListing_listing } from '../../lib/graphql/queries/Listing/__generated__/GetListing';
import { useStyles } from './styles';

interface Props {
  listing: GetListing_listing;
}

const ListingDetail = ({ listing }: Props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={10}>
        <Card>
          <CardMedia image={listing.image} className={classes.media} />
        </Card>
      </Grid>
      <Grid item xs={12} className={classes.location}>
        <span className={classes.city}>
          <LocationOnOutlinedIcon />
          <Typography variant='subtitle2'>{listing.city}</Typography>
        </span>
        <span>
          <Typography variant='body1' color='textSecondary'>
            {listing.address}
          </Typography>
        </span>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h5' color='primary'>
          <Box fontSize='h5.fontSize' fontWeight='fontWeightBold'>
            {listing.title}
          </Box>
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.host}>
        <Avatar
          src={listing.host.avatar}
          className={classes.avatar}
          component={Link}
          to={`/user/${listing.host.id}`}
        />
        <Typography
          component={Link}
          to={`/user/${listing.host.id}`}
          className={classes.userName}
        >
          <Box fontFamily='Monospace' fontSize='h4.fontSize' fontStyle='italic'>
            {listing.host.name}
          </Box>
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.detail}>
        <Typography variant='h6' color='primary'>
          <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
            Detail about this listing
          </Box>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Chip
          label={listing.type}
          variant='outlined'
          color='secondary'
          className={classes.chip}
        />
        <Chip
          label={`${listing.numOfGuests} Guests`}
          variant='outlined'
          color='secondary'
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='overline'>{listing.description}</Typography>
      </Grid>
    </Grid>
  );
};

export default ListingDetail;
