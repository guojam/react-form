import React, {
    cloneElement,
    isValidElement,
    useCallback,
    useContext,
    useLayoutEffect,
    useState,
} from 'react';
import FormStoreContext from './FormStoreContext';
import { deepGet } from './util';

interface FormFieldProps {
    name?: string;
    children?: React.ReactNode;
    onChange?: (value: string) => void;
    shouldUpdate?: boolean | ((prevValues: any, curValues: any) => boolean);
}

function FormField(props: FormFieldProps) {
    const [updateCount, setUpdateCount] = useState(0);
    const { name, children, onChange: onFieldChange, shouldUpdate } = props;
    const store = useContext(FormStoreContext);

    // 组件内部状态，用于触发组件的重新渲染
    const [value, setValue] = useState(
        name && store ? store.getValue(name) : undefined
    );

    // 表单组件onChange事件，用于从事件中取得表单值
    const onChange = useCallback(
        (newValue: string) => {
            name && store && store.setValue(name, newValue);
            onFieldChange && onFieldChange(newValue);
        },
        [name, store, onFieldChange]
    );

    // 订阅表单数据变动
    useLayoutEffect(() => {
        if (!name || !store) return;
        const unsubscribe = store.subscribe(
            name,
            (fieldName, prevValues, curValues) => {
                // 当前name的数据发生了变动，获取数据并重新渲染
                if (fieldName === name || fieldName === '*') {
                    setValue(deepGet(curValues, name));
                }
                if (
                    (typeof shouldUpdate == 'boolean' && shouldUpdate) ||
                    (typeof shouldUpdate === 'function' &&
                        shouldUpdate(prevValues, curValues))
                ) {
                    console.log('强制刷新当前控件:', name);
                    setUpdateCount((updateCount) => updateCount + 1);
                }
            }
        );
        return () => {
            unsubscribe();
        };
    }, []);

    let child = children;

    const childCount = React.Children.count(child);
    if (childCount === 1) {
        // FormField如果有设置name，接管子组件的双向数据流
        if (name && store && isValidElement(child)) {
            const childProps = { name, value, onChange };
            child = cloneElement(child, childProps);
        }
    } else {
        throw new Error('FormField只能包裹1个控件');
    }

    return <>{child}</>;
}
export default FormField;
