import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dbg } from '../../utils/log';

import { install } from '../../actions/install';

class Install extends Component {
    state = {
        errors: {},
        appName: '',
        userFullName: '',
        userEmail: '',
        userPassword: '',
        userPassword2: ''
    };

    componentDidMount() {
        dbg('componentDidMount props', this.props);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors) {
            return {
                ...prevState,
                errors: nextProps.errors
            };
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.errors !== this.props.errors) {
            this.setState({
                errors: this.props.errors
            });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            appName,
            userFullName,
            userEmail,
            userPassword,
            userPassword2
        } = this.state;

        const site = {
            appName,
            userFullName,
            userEmail,
            userPassword,
            userPassword2
        }
        this.props.install(site)
            .then(() => {
                this.props.history.push('/');
            });
    }

    onChange = (e, field) => {
        this.setState({
            [field]: e.target.value
        });
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="card col-md-8">
                        <div className="card-body">
                            <h1 className="card-title">Installation</h1>
                            <p className="card-text">Before you can use this application please provide the following details</p>

                            <form noValidate onSubmit={this.onSubmit}>
                                <h2>App details</h2>
                                <div className="form-group">
                                    <label htmlFor="appName">App name</label>
                                    <input type="appName" className={`form-control ${errors.appName ? 'is-invalid' : ''}`} id="appName" aria-describedby="appNameHelp" placeholder="Enter an app name" value={this.state.appName} onChange={e => this.onChange(e, 'appName')} />
                                    {errors.appName && (<div className="invalid-feedback">{errors.appName}</div>)}
                                    <small id="appNameHelp" className="form-text text-muted">Used to brand your app</small>
                                </div>
                                <hr />
                                <h2>Super user details</h2>
                                <div className="form-group">
                                    <label htmlFor="userFullName">Full name</label>
                                    <input type="userFullName" className={`form-control ${errors.userFullName ? 'is-invalid' : ''}`} id="userFullName" placeholder="Enter full name" value={this.state.userFullName} onChange={e => this.onChange(e, 'userFullName')} />
                                    {errors.userFullName && (<div className="invalid-feedback">{errors.userFullName}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userEmail">Email address</label>
                                    <input type="email" className={`form-control ${errors.userEmail ? 'is-invalid' : ''}`} id="userEmail" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.userEmail} onChange={e => this.onChange(e, 'userEmail')} />
                                    {errors.userEmail && (<div className="invalid-feedback">{errors.userEmail}</div>)}
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userPassword">Password</label>
                                    <input type="password" className={`form-control ${errors.userPassword ? 'is-invalid' : ''}`} id="userPassword" placeholder="Password" value={this.state.userPassword} onChange={e => this.onChange(e, 'userPassword')} />
                                    {errors.userPassword && (<div className="invalid-feedback">{errors.userPassword}</div>)}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userPassword2">Confirm Password</label>
                                    <input type="password" className={`form-control ${errors.userPassword2 ? 'is-invalid' : ''}`} id="userPassword2" placeholder="Confirm Password" value={this.state.userPassword2} onChange={e => this.onChange(e, 'userPassword2')} />
                                    {errors.userPassword2 && (<div className="invalid-feedback">{errors.userPassword2}</div>)}
                                </div>
                                <button type="submit" className="btn btn-primary">Install</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Install.propTypes = {
    install: PropTypes.func.isRequired,
    errors: PropTypes.object
}

const mapStateToProps = ({ errors }) => ({
    errors
});

const mapDispatchToProps = (dispatch) => ({
    install: (payload) => dispatch(install(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Install);