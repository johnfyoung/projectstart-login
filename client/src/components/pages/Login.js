import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from '../../actions/auth';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData)
    };

    render() {
        const { errors } = this.state;
        return (
            <div className='login'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>
                            <h1>Login</h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="email" className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange} />
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}

                                </div>
                                <div className="form-group">
                                    <input type="password" className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>
                                <input type="submit" className="btn btn-primary mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object
}

const mapStateToProps = ({ auth, errors }) => ({
    auth,
    errors
});

export default connect(mapStateToProps, { loginUser })(Login)