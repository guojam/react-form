import React, { isValidElement } from 'react';

import FormControl from './FormControl';
import styles from './form.module.scss';

interface FormFieldProps {
    label?: string;
    name?: string;
    children?: React.ReactNode;
    onChange?: (value: string) => void;
    shouldUpdate?: (prevValues: any, curValues: any) => boolean;
}

function FormItem(props: FormFieldProps) {
    const { label, name, children, ...rest } = props;

    let child = children;
    if (name && React.Children.count(child) === 1 && isValidElement(child)) {
        // FormField如果有设置name，且只有一个子组件，用FormControl包裹子组件
        child = (
            <FormControl name={name} {...rest}>
                {children}
            </FormControl>
        );
    }

    return (
        <div className={styles['ui-form-item']}>
            {label !== undefined && (
                <label className={styles['ui-label']}>{label}</label>
            )}
            <div className={styles['ui-form-item-box']}>{child}</div>
        </div>
    );
}
export default FormItem;
