import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from '../reducers';
import middleware from '../middleware';

import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/auth';

import Navbar from './parts/Navbar';
import Footer from './parts/Footer';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PublicPage from './pages/PublicPage';
import PrivatePage from './pages/PrivatePage';
import NotFound from './pages/NotFound';

const initialState = {};
const store = createStore(rootReducer, initialState, middleware);

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // decode the token
  const decoded = jwt_decode(localStorage.jwtToken);

  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // TODO: clear profile

    // redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <header className="App-header">
              <Navbar />
            </header>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/public' component={PublicPage} />
              <Route exact path='/private' component={PrivatePage} />
              <Route exact path='/login' component={Login} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
