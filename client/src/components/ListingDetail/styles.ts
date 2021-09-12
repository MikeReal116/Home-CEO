import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  media: {
    height: 500
  },
  location: {
    display: 'flex',
    alignItems: 'center'
  },
  city: {
    display: 'flex',
    alignItems: 'center',
    color: '#1976d2',
    marginRight: theme.spacing(3)
  },
  host: {
    marginTop: theme.spacing(5),
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 90,
    width: 90,
    marginRight: theme.spacing(3)
  },
  detail: {
    marginTop: theme.spacing(5)
  },
  chip: {
    marginRight: theme.spacing(2)
  },
  userName: {
    '&:link ': {
      color: 'rgba(0, 0, 0, 0.87)',
      textDecoration: 'none'
    },
    '&:visited ': {
      color: 'rgba(0, 0, 0, 0.87)',
      textDecoration: 'none'
    }
  }
}));
