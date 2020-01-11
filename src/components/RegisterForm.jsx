import React from 'react';
import Form from './common/Form';
import Joi from 'joi-browser'

class RegisterForm extends Form {
    state = {
        data: {
            username: "",
            password: "",
            name: "",
        },
        errors: {}
    }

    schema = {
        username: Joi
            .string()
            .email()
            .required()
            .label('Username'),
        password: Joi
            .string()
            .min(5)
            .required()
            .label('Password'),
        name: Joi
            .string()
            .required(),
    }

    doSubmit = () => {
        console.log("Test Server Call")
    }

    render() {
        return (
            <React.Fragment>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "username")}
                    {this.renderInput("password", "password", "password")}
                    {this.renderInput("name", "name")}
                    {this.renderButton("Register")}
                </form>
            </React.Fragment>

        );
    }
}

export default RegisterForm;