import React, { Component } from 'react';

class LoginForm extends Component {
    state = {}

    handleSubmit = e => {
        e.preventDefault();

        console.log("Test Server Call")
    }

    render() {
        return (
            <React.Fragment>
                <h1>Login</h1>
                <form onSubmit = {this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">
                            Username
                        </label>
                        <input type="username" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>
                        <input type="password" className="form-control" />
                    </div>

                    <button className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>

        );
    }
}

export default LoginForm;