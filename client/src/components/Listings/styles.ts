import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(10)
  },
  filterPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  }
}));
