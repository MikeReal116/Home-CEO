import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(5)
  },
  heading: {
    marginBottom: theme.spacing(3)
  },
  paginate: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  card: {
    marginTop: theme.spacing(3)
  }
}));
