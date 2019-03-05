import React, { Component } from 'react'
import { connect } from 'react-redux';


class Install extends Component {
    state = {
        errors: {},
        appName: '',
        userFullName: '',
        userGravatar: '',
        userEmail: '',
        userPass: '',
        userPass2: ''
    };

    componentDidMount() {
        console.log('componentDidMount props', this.props);
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("submitting...")
    }

    onChange = (e, field) => {
        this.setState({
            [field]: e.target.value
        });
    }

    render() {

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
                                    <input type="appName" className="form-control" id="appName" aria-describedby="appNameHelp" placeholder="Enter an app name" value={this.state.appName} onChange={e => this.onChange(e, 'appName')} />
                                    <small id="appNameHelp" className="form-text text-muted">Used to brand your app</small>
                                </div>
                                <hr />
                                <h2>Super user details</h2>
                                <div className="form-group">
                                    <label htmlFor="userFullName">Full name</label>
                                    <input type="userFullName" className="form-control" id="userFullName" placeholder="Enter full name" value={this.state.userFullName} onChange={e => this.onChange(e, 'userFullName')} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userEmail">Email address</label>
                                    <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.userEmail} onChange={e => this.onChange(e, 'userEmail')} />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userGravatar">Gravatar</label>
                                    <input type="url" className="form-control" id="userGravatar" aria-describedby="gravatarHelp" placeholder="Enter url to your Gravatar" value={this.state.userGravatar} onChange={e => this.onChange(e, 'userGravatar')} />
                                    <small id="gravatarHelp" className="form-text text-muted">Visit <a href="https://gravatar.com" target="_blank" rel="noopener noreferrer">gravatar.com</a> for more information.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userPass">Password</label>
                                    <input type="password" className="form-control" id="userPass" placeholder="Password" value={this.state.userPass} onChange={e => this.onChange(e, 'userPass')} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="userPass2">Confirm Password</label>
                                    <input type="password" className="form-control" id="userPass2" placeholder="Confirm Password" value={this.state.userPass2} onChange={e => this.onChange(e, 'userPass2')} />
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


export default connect()(Install);