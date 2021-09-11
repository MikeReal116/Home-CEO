import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import { useStyles } from './styles';
import { formatPrice } from '../../lib/utils/priceFormat';

interface Props {
  id: string;
  price: number;
  image: string;
  numOfGuests: number;
  title: string;
}

const ListCard = ({ id, price, image, numOfGuests, title }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleCardClick = () => {
    history.push(`/listing/${id}`);
  };

  return (
    <Card className={classes.root} onClick={handleCardClick}>
      <CardMedia className={classes.media} image={image} title={title} />
      <CardContent className={classes.cardContent}>
        <Typography paragraph>
          <span className={classes.price}>{formatPrice(price)}</span> / day
        </Typography>
        <Typography variant='subtitle2' paragraph>
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <PersonOutlineOutlinedIcon color='primary' />
        <Typography variant='body2'>{`${numOfGuests} guests`}</Typography>
      </CardActions>
    </Card>
  );
};

export default ListCard;
