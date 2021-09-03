import { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useApolloClient, useMutation } from '@apollo/client';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useStyles } from './styles';
import { GET_AUTH_URL, LOGIN } from '../../lib/graphql';
import { AuthUrl as AuthUrlData } from '../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl';
import { Viewer } from '../../lib/types';
import {
  LogIn as LogInData,
  LogInVariables
} from '../../lib/graphql/mutations/LogIn/__generated__/LogIn';
import { errorNotification } from '../../lib/notifications/error';

interface Props {
  setViewer: React.Dispatch<React.SetStateAction<Viewer>>;
}

const Login = ({ setViewer }: Props) => {
  const client = useApolloClient();
  const classes = useStyles();
  const [
    logInFn,
    { data: logInData, loading: logInLoading, error: logInError }
  ] = useMutation<LogInData, LogInVariables>(LOGIN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem('token', data.logIn.token);
        } else {
          sessionStorage.removeItem('token');
        }
      }
    }
  });

  const logInRef = useRef(logInFn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (code) {
      logInRef.current({ variables: { input: { code } } });
    }
  }, []);

  const handleLoginClick = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: GET_AUTH_URL
      });

      window.location.href = data.authUrl;
    } catch (error) {
      errorNotification('Login failed, try again');
    }
  };

  if (logInLoading) {
    return <CircularProgress />;
  }

  if (logInData && logInData.logIn) {
    const { id } = logInData.logIn;
    return <Redirect to={`/user/${id}`} />;
  }
  if (logInError) {
    errorNotification('Login failed, try again');
  }

  return (
    <Container maxWidth='sm' className={classes.root}>
      <CssBaseline />
      <Paper elevation={3}>
        <Grid container spacing={3} className={classes.form}>
          <Grid item xs={12}>
            <Avatar>🖐</Avatar>
          </Grid>
          <Grid item xs={12}>
            <Typography component='h1' variant='h5' paragraph>
              Sign In To Home-CEO
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' paragraph>
              Sign In to start making booking to your dream apartments
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleLoginClick}
            >
              Login With Google
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' align='center'>
              By signing in, you will be redirected to the Google consent form
              to sign in with your Google account
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
