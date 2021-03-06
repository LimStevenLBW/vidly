import React from 'react';
import Form from './common/Form';
import Joi from 'joi-browser'

class LoginForm extends Form {
    state = {
        data: {
            username: "",
            password: "",
        },
        errors: {}
    }

    schema = {
        username: Joi
            .string()
            .required()
            .label('Username'),
        password: Joi
            .string()
            .required()
            .label('Password'),
    }

    doSubmit = () => {
        console.log("Test Server Call")
    }

    render() {
        return (
            <React.Fragment>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "username")}
                    {this.renderInput("password", "password", "password")}
                    {this.renderButton("Login")}
                </form>
            </React.Fragment>

        );
    }
}

export default LoginForm;