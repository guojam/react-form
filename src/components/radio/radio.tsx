import React, { ChangeEventHandler } from 'react';
import styles from './radio.module.scss';
import { RadioProps } from './radio.model';

const Radio: React.FC<RadioProps> = (props) => {
    const { value, onChange, label, id } = props;
    const { children, ...rest } = props;
    const radioId = id || `radio-${props.name}-${props.value}`;
    const handleChange: ChangeEventHandler<HTMLInputElement> = () => {
        onChange && onChange(value);
    };

    return (
        <>
            <input
                {...rest}
                className={styles.radioItem}
                type="radio"
                id={radioId}
                onChange={handleChange}
            />
            <label htmlFor={radioId}>{label || children}</label>
        </>
    );
};
Radio.displayName = 'Radio';

export default Radio;
