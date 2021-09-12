import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  price: {
    fontWeight: 'bold',
    color: '#4791db'
  },
  btn: {
    marginTop: theme.spacing(3)
  }
}));
