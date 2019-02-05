import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PrivatePage extends Component {
    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div className='private-page' >
                <div className='container'>
                    <div className='row justify-content-center'>
                        <h1>Private Page</h1>
                    </div>
                </div>
            </div>
        )
    }
}

PrivatePage.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(mapStateToProps)(PrivatePage)