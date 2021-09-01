import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Listings from './Listings/Listings';
import Home from './Home/Home';
import Host from './Host/Host';
import Listing from './Listing/Listing';
import NotFound from './NotFound/NotFound';
import User from './User/User';
import Login from './Login/Login';
import { Viewer } from '../lib/types';

function App() {
  const [viewer, setViewer] = useState<Viewer>({
    id: null,
    token: null,
    avatar: null,
    hasWallet: null,
    didRequest: false
  });

  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/host' component={Host} />
          <Route exact path='/listing/:id' component={Listing} />
          <Route exact path='/listings/:location?' component={Listings} />
          <Route exact path='/user' component={User} />
          <Route
            exact
            path='/login'
            render={(props) => <Login {...props} setViewer={setViewer} />}
          />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
