import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper
  }
}));
