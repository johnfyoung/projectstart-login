import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './parts/Navbar';
import Footer from './parts/Footer';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PublicPage from './pages/PublicPage';
import PrivatePage from './pages/PrivatePage';
import Install from './pages/Install';
import NotFound from './pages/NotFound';

import { checkForInstallation } from '../actions/install';

class App extends Component {
  state = {
    isInstalled: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('App::getDerivedStateFromProps nextProps', nextProps);
    console.log('App::getDerivedStateFromProps prevState', prevState);
    if (nextProps.isInstalled !== undefined && prevState.isInstalled !== undefined && nextProps.isInstalled !== prevState.isInstalled) {
      return {
        ...prevState,
        isInstalled: nextProps.isInstalled
      };
    }

    return prevState;
  }

  componentDidMount() {
    console.log('App::componentDidMount - props', this.props)
    if (!this.props.isInstalled) {

    }
  }

  render() {
    if (!this.props.isInstalled) {
      return (

        <Router>
          <div className='App mt-5'>
            <Switch>
              <Route exact path='/' component={Install} />
              <Route render={() => (
                <Redirect to='/' />
              )}
              />
            </Switch>
          </div>
        </Router >

      );
    }

    return (
      <Router>
        <div className='App'>
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
    );
  }
}

const mapStateToProps = ({ install }) => ({
  isInstalled: install !== undefined ? install.isInstalled : false
});

const mapDispatchToProps = dispatch => ({
  checkForInstallation: () => dispatch(checkForInstallation())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
