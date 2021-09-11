import { makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  card: {
    position: 'relative',
    '&:hover': {
      opacity: 0.8
    }
  },
  media: {
    height: 0,
    paddingTop: '150%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken'
  },
  cityName: {
    position: 'absolute',
    bottom: ' 8px',
    left: '8px',
    color: '#fff'
  }
}));
