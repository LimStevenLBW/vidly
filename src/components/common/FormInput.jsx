import React from 'react';

const FormInput = ({ name, label, handler, value }) => {
    return (
        <div className="form-group">
            <label htmlFor= {name}>
                {label}
            </label>
            <input
                id={name}
                value={value}
                onChange={handler}
                type="text"
                className="form-control"
            />
        </div>
    );
}

export default FormInput;