import { Container, Typography, makeStyles, Theme } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <Container maxWidth='sm' className={classes.root}>
      <Search fontSize='large' />
      <Typography
        variant='h5'
        color='primary'
        paragraph
        className={classes.title}
      >
        The page you are looking for can't be found
      </Typography>
      <Link to='/'>Homepage</Link>
    </Container>
  );
};

export default NotFound;
