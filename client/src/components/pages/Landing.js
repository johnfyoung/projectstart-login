import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        return (
            <div className='landing'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <h1>Landing</h1>
                    </div>
                </div>
            </div>
        )
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(mapStateToProps)(Landing)