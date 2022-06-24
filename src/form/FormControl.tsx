import React, {
    cloneElement,
    isValidElement,
    useCallback,
    useContext,
    useLayoutEffect,
    useState,
} from 'react';
import FormStoreContext from './FormStoreContext';

interface FormControlProps {
    name?: string;
    children?: React.ReactNode;
    onChange?: (value: string) => void;
    shouldUpdate?: boolean | ((prevValues: any, curValues: any) => boolean);
}

function FormControl(props: FormControlProps) {
    const [updateCount, setUpdateCount] = useState(0);

    const { name, children, onChange: onFieldChange, shouldUpdate } = props;
    const store = useContext(FormStoreContext);

    console.log('FormControl', name, 'rendering');

    // 组件内部状态，用于触发组件的重新渲染
    const [value, setValue] = useState(
        name && store ? store.get(name) : undefined
    );

    // 表单组件onChange事件，用于从事件中取得表单值
    const onChange = useCallback(
        (newValue: string) => {
            name && store && store.set(name, newValue);
            console.log('field', name, 'changed:', newValue);
            onFieldChange && onFieldChange(newValue);
        },
        [name, store, onFieldChange]
    );

    // 订阅表单数据变动
    useLayoutEffect(() => {
        if (!name || !store) return;
        console.log('formControl', name, '开始订阅formStore变动');
        const unsubscribe = store.subscribe(
            name,
            (fieldName, prevValues, curValues) => {
                // 当前name的数据发生了变动，获取数据并重新渲染
                if (fieldName === name || fieldName === '*') {
                    console.log(
                        'formControl',
                        name,
                        '的数据发生了变动，获取数据并重新渲染'
                    );
                    const newValue = store.get(name);
                    setValue(newValue);
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
            console.log(name, 'unmounted');
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
        throw new Error('FormControl只能包裹1个控件');
    }

    return <>{child}</>;
}
export default FormControl;
