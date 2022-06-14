import React, {
    ChangeEvent,
    cloneElement,
    isValidElement,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import FormStoreContext from './FormStoreContext';
import styles from './form.module.scss';

interface FormFieldProps {
    label?: string;
    name?: string;
    children?: React.ReactNode;
    onChange?: (value: string) => void;
}

function FormField(props: FormFieldProps) {
    const { label, name, children, onChange: onFieldChange } = props;
    const store = useContext(FormStoreContext);

    // 组件内部状态，用于触发组件的重新渲染
    const [value, setValue] = useState(
        name && store ? store.get(name) : undefined
    );

    // 表单组件onChange事件，用于从事件中取得表单值
    const onChange = useCallback(
        (newValue: string) => {
            name && store && store.set(name, newValue);
            onFieldChange && onFieldChange(newValue);
        },
        [name, store, onFieldChange]
    );

    // 订阅表单数据变动
    useEffect(() => {
        if (!name || !store) return;
        return store.subscribe((n) => {
            // 当前name的数据发生了变动，获取数据并重新渲染
            if (n === name || n === '*') {
                setValue(store.get(name));
            }
        });
    }, [name, store]);

    let child = children;

    // FormField如果有设置name，接管子组件的双向数据流
    if (name && store && isValidElement(child)) {
        const childProps = { value, onChange };
        child = cloneElement(child, childProps);
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
export default FormField;
