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

import { dbg } from '../utils/log';

class App extends Component {
  state = {
    isInstalled: false
  }

  componentDidMount() {
    dbg('App::componentDidMount - props', this.props)
    if (!this.props.isInstalled) {
      this.setState({
        isInstalled: this.props.isInstalled
      })
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    dbg('App::getDerivedStateFromProps nextProps', nextProps);
    dbg('App::getDerivedStateFromProps prevState', prevState);
    if (nextProps.isInstalled !== undefined && prevState.isInstalled !== undefined && nextProps.isInstalled !== prevState.isInstalled) {
      return {
        ...prevState,
        isInstalled: nextProps.isInstalled
      };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isInstalled !== this.props.isInstalled) {
      this.setState({
        isInstalled: this.props.isInstalled
      });
    }
  }

  render() {
    if (!this.state.isInstalled) {
      return (

        <Router>
          <div className='App mt-5'>
            <Switch>
              <Route exact path='/install' component={Install} />
              <Route render={() => (
                <Redirect to='/install' />
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
