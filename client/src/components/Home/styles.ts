import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(10)
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(5)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  infoSec: {
    marginTop: theme.spacing(15),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  btn: {
    textTransform: 'none'
  },
  card: {
    position: 'relative',
    '&:hover': {
      opacity: 0.8
    }
  },
  media: {
    height: 0,
    paddingTop: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken'
  },
  cityName: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    fontWeight: 'bold',
    fontSize: '26px',
    color: '#fff'
  },
  otherListings: {
    marginTop: theme.spacing(15)
  },
  premium: {
    marginTop: theme.spacing(15)
  }
}));
