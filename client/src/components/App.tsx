import { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { CircularProgress, Container } from '@material-ui/core';

import Listings from './Listings/Listings';
import Home from './Home/Home';
import Host from './Host/Host';
import Listing from './Listing/Listing';
import NotFound from './NotFound/NotFound';
import User from './User/User';
import Login from './Login/Login';
import { Viewer } from '../lib/types';
import Header from './Header/Header';
import { LOGIN } from '../lib/graphql';
import {
  LogInVariables,
  LogIn as LogInData
} from '../lib/graphql/mutations/LogIn/__generated__/LogIn';
import Stripe from './Stripe/Stripe';

function App() {
  const [viewer, setViewer] = useState<Viewer>({
    id: null,
    token: null,
    avatar: null,
    hasWallet: null,
    didRequest: false
  });
  const [loginFn, { error }] = useMutation<LogInData, LogInVariables>(LOGIN, {
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

  const logInRef = useRef(loginFn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if (!error && !viewer.didRequest) {
    return (
      <Container maxWidth='sm'>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Header viewer={viewer} setViewer={setViewer} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/host'>
            {viewer.id ? (
              <Host />
            ) : (
              () => {
                <Redirect to='/login' />;
              }
            )}
          </Route>
          <Route exact path='/listing/:id' component={Listing} />
          <Route exact path='/listings/:location?' component={Listings} />
          <Route
            exact
            path='/user/:id'
            render={(props) => (
              <User {...props} viewer={viewer} setViewer={setViewer} />
            )}
          />
          <Route
            exact
            path='/login'
            render={(props) => <Login {...props} setViewer={setViewer} />}
          />
          <Route
            exact
            path='/stripe'
            render={(props) => (
              <Stripe {...props} viewer={viewer} setViewer={setViewer} />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
