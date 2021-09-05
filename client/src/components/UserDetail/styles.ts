import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatarImage: {
    height: '90px',
    width: '90px'
  }
}));
