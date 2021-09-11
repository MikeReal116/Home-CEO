import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

import london from '../../assets/london.jpg';
import dubai from '../../assets/dubai.jpg';
import toronto from '../../assets/toronto.jpg';
import sanfrancis from '../../assets/sanfrancis.jpg';
import { useStyles } from './styles';

const ImageComp = ({ image, city }: { image: string; city: string }) => {
  const classes = useStyles();
  return (
    <Link to={`/listings/${city}`}>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={image} title='city' />
        <Typography variant='subtitle2' className={classes.cityName}>
          {city}
        </Typography>
      </Card>
    </Link>
  );
};

const HomeHero = () => {
  const images = [
    { name: 'London', path: london },
    { name: 'Dubai', path: dubai },
    { name: 'Toronto', path: toronto },
    { name: 'San Francisco', path: sanfrancis }
  ];
  const renderImage = images.map((image) => (
    <Grid key={image.name} item xs={12} md={3}>
      <ImageComp image={image.path} city={image.name} />
    </Grid>
  ));

  return (
    <Grid container spacing={2}>
      {renderImage}
    </Grid>
  );
};

export default HomeHero;
