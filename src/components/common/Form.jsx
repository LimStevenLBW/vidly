import React, { Component } from 'react';
import Joi from 'joi-browser';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value } //ES6 Computed Properties, using what name is at runtime to be a key
        const schema = { [name]: this.schema[name] } //Create a sub-schema
        const { error } = Joi.validate(obj, schema)

        return error ? error.details[0].message : null;
    }

    validate = () => {
        const options = { abortEarly: false }
        const { error } = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null; //no problem

        const errors = {};
        for (let i of error.details) {
            errors[i.path[0]] = i.message;
        }

        return errors;

        /* Old validation strategy
        const { account } = this.state;
        const errors = {}
        if (account.username.trim() === '') 
            errors.username = "Error, username is required"
        if (account.password.trim() === '')
            errors.password = "Error, password is required"
        
        //return Object.keys(errors).length === 0 ? null : errors;
        */
    }


    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    }

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors }
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        this.setState({ errors: errors || {} })

        const data = { ...this.state.data }
        data[input.name] = input.value;
        this.setState({ data });
    }

    renderInput(name, label, type = 'text') { //setting parameter default value
        return (
            <FormInput
                name = {name}
                value = { this.state.data[name] }
                handler = { this.handleChange }
                label = {label}
                error = { this.state.errors[name] }
                type = {type}
            />
        );
    }

    renderSelect(name, label, options) {
        return(
            <FormSelect 
                name = {name}
                value = { this.state.data[name] }
                handler = { this.handleChange }
                label = {label}
                options = {options}
                error = { this.state.errors[name] }
            />
        );
    }

    renderButton(label) {
        return (
            <button
                disabled={this.validate()}
                className={"btn btn-primary"}
                aria-disabled="true"
            >
                {label}
            </button>
        );
    }

}

export default Form;