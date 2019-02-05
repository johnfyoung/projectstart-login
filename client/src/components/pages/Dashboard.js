import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Dashboard extends Component {
    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div className='container' >
                <div className='row justify-content-center'>
                    <h1>Dashboard</h1>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(mapStateToProps)(Dashboard)