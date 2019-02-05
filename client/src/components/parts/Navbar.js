import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { logoutUser } from '../../actions/auth';

class Navbar extends Component {
    logout = () => {
        this.props.logoutUser(this.props.history);
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const guestLinks = (
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/login'>Login</Link>
                </li>
            </ul>
        );

        const authLinks = (
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/private'>Private Page</Link>
                </li>
                <li className='nav-item d-flex align-items-center'>
                    <span className='text-light'>{user.name}</span>
                    <img src={user.avatar} alt={`Avatar for ${user.name}`} className='rounded-circle mx-2' style={{ width: '35px' }} title='You must have a gravatar connected to your email to have an iage' />
                </li>
                <li className='nav-item'>
                    <button className='nav-link btn btn-link' onClick={this.logout}>Logout</button>
                </li>
            </ul>
        );

        return (
            <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
                <div className='container'>
                    {isAuthenticated
                        ? <Link to='/dashboard' className='navbar-brand'>LoginBoilerplate</Link>
                        : <Link to='/' className='navbar-brand'>LoginBoilerplate</Link>}

                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#mobile-nav'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id='mobile-nav'>
                        <ul className='navbar-nav mr-auto'>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/public'>Public Page</Link>
                            </li>
                        </ul>

                        {!isAuthenticated ? guestLinks : authLinks}

                    </div>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));