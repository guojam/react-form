import React, { ChangeEvent } from 'react';
const Input = (props: any) => {
    const value = props.value || props.defaultValue || '';
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props?.onChange && props.onChange(e.target.value);
    };
    const { type = 'text' } = props;
    return (
        <input
            type={type}
            autoComplete="off"
            {...props}
            value={value}
            onChange={handleChange}
        />
    );
};

export default Input;
