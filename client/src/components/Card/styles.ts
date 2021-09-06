import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    maxWidth: 345,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8
    }
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    padding: theme.spacing(2)
  },
  price: {
    fontWeight: 'bold',
    color: '#4791db'
  }
}));
