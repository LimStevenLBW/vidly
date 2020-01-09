import React, { Component } from 'react';
import FormInput from './common/FormInput';

class LoginForm extends Component {
    state = {
        account: {
            username: "",
            password: "",
        }
    }

    handleChange = ({ currentTarget: input }) => {
        const account = { ...this.state.account }
        account[input.id] = input.value;
        console.log(account)
        this.setState({ account });
    }

    handleSubmit = e => {
        e.preventDefault();

        console.log("Test Server Call")
    }

    render() {
        return (
            <React.Fragment>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name="username"
                        value={this.state.account.username}
                        handler={this.handleChange}
                        label="username"
                    />

                    <FormInput
                        name="password"
                        value={this.state.account.password}
                        handler={this.handleChange}
                        label="password"
                    />
                    
                    <button className="btn btn-primary">Submit</button>
                </form>
            </React.Fragment>

        );
    }
}

export default LoginForm;