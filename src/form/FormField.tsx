import React from 'react';
import { FormStoreContext } from './Form';

function FormField(props: any) {
    const { label, name, children } = props;
    // 拿到Form传下来的FormStore实例
    const store = React.useContext(FormStoreContext);

    // 组件内部状态，用于触发组件的重新渲染
    const [value, setValue] = React.useState(
        name && store ? store.get(name) : undefined
    );

    // 表单组件onChange事件，用于从事件中取得表单值
    const onChange = React.useCallback(
        (...args) => name && store && store.set(name, valueGetter(...args)),
        [name, store]
    );

    // 订阅表单数据变动
    React.useEffect(() => {
        if (!name || !store) return;

        return store.subscribe((n) => {
            // 当前name的数据发生了变动，获取数据并重新渲染
            if (n === name || n === '*') {
                setValue(store.get(name));
            }
        });
    }, [name, store]);

    let child = children;

    // 如果children是一个合法的组件，传入value和onChange
    if (name && store && React.isValidElement(child)) {
        const childProps = { value, onChange };
        child = React.cloneElement(child, childProps);
    }

    return (
        <div className="ui-form-item">
            {label !== undefined && <label className="ui-label">{label}</label>}
            <div className="ui-form-item-box">{child}</div>
        </div>
    );
}
export default FormField;
