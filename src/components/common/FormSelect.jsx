import React from 'react';

const FormSelect = (name, label, handler, value, options, error) => {
    return ( 
        <div className = "form-group">
            <label htmlFor = {name}>
                {label}
            </label>

            <select 
                name = {name}
                id = {name}
                value = {value}
                label = {label}
                handler = {handler}
                className = "form-control"
            >
            
            <option value = "" />
            {options.map(option => (
                <option key = {option._id} value = {option._id}>
                    {option.name}
                </option>
            ))}

            </select>
            {error && <div className = "alert alert-danger">{error}</div>}
        </div>
    );
}
 
export default FormSelect;