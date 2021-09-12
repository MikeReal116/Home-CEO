import { Button, Container, Typography } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { formatPrice } from '../../lib/utils/priceFormat';
import { useStyles } from './styles';

interface Props {
  startDate: null | Date;
  endDate: null | Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  price: number;
}

const ListingBook = ({
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  price
}: Props) => {
  const classes = useStyles();

  const handleChange = (dates: Date | [Date | null, Date | null]) => {
    const [start, end] = dates as Date[];
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Container className={classes.root}>
      <Typography variant='h6' paragraph color='primary'>
        Book your stay{' '}
      </Typography>
      <Typography paragraph>
        <span className={classes.price}>{formatPrice(price)}</span> / day
      </Typography>

      <DatePicker
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        minDate={new Date()}
        showDisabledMonthNavigation
      />
      <Button
        variant='contained'
        color='primary'
        className={classes.btn}
        disabled={startDate && endDate ? false : true}
      >
        Book now
      </Button>
    </Container>
  );
};

export default ListingBook;
