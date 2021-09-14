import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  offset: theme.mixins.toolbar,
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  right: {
    display: 'flex',
    alignItems: 'center'
  },
  host: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(4)
  },
  hostText: {
    marginLeft: theme.spacing(1),
    cursor: 'pointer',
    textDecoration: 'none'
  }
}));
