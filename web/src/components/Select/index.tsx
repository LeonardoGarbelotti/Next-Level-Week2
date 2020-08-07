import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    label: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

// ...rest adiciona  todas as opções que o bloco pode ter
const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest} >
                <option value="" disabled hidden>Selecione</option>
                {options.map(option => {
                    return <option key={option.value} value={option.value}> {option.label} </option> //key seria como um Id desse campo
                })}
            </select>
        </div>
    );
}

export default Select;