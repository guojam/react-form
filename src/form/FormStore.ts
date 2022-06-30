import {
    FormControlsConfig,
    FormListener,
    FormStoreCallbacks,
    FormValues,
} from './model';
import {
    deepClone,
    deepCompare,
    deepGet,
    deepRemove,
    deepSet,
    getDeepDiff,
} from './util';

export default class FormStore {
    /** 表单初始值，用于重置表单 */
    private initialValues: FormValues = {};
    /** 表单修改之前的值 */
    private prevValues: FormValues = {};
    /** 表单当前值 */
    private values: FormValues = {};
    private callbacks: FormStoreCallbacks = {};

    /** 事件监听器 */
    private listeners: FormListener[] = [];
    constructor(controlsConfig?: FormControlsConfig) {
        // 表单初始值，用于重置表单
        controlsConfig && this.group(controlsConfig);
    }

    group(config: FormControlsConfig) {
        const values = this.getInitialValues(config);
        this.initialValues = values;
        this.values = deepClone(values);
        // 通知所有组件变动信息
        this.notify('*');
    }

    /** 通知表单变动 */
    private notify(fieldName: string) {
        if (fieldName === '*') {
            console.log(
                'notify : set all fields',
                this.prevValues,
                '--->',
                this.values
            );
        } else {
            console.log(
                'notify : set field',
                fieldName,
                deepGet(this.prevValues, fieldName),
                '--->',
                deepGet(this.values, fieldName)
            );
        }

        const prevValues = deepClone(this.prevValues),
            curValues = deepClone(this.values);
        this.listeners.forEach((listener) =>
            listener(fieldName, prevValues, curValues)
        );

        const { onValuesChange } = this.callbacks;
        const changedValues = getDeepDiff(curValues, prevValues);
        onValuesChange && onValuesChange(changedValues, curValues);
    }

    private getInitialValues(config?: FormControlsConfig) {
        const formValue: FormValues = {};
        config &&
            Object.keys(config).forEach((key) => {
                const fieldConfig = config[key],
                    fieldValue = fieldConfig[0];
                if (typeof fieldValue === 'string') {
                    formValue[key] = fieldValue;
                } else {
                    formValue[key] = this.getInitialValues(
                        fieldValue as FormControlsConfig
                    );
                }
            });
        return formValue;
    }

    setCallbacks(callbacks: FormStoreCallbacks) {
        this.callbacks = callbacks;
    }

    subscribe(fieldName: string, listener: FormListener) {
        this.listeners.push(listener);
        // 返回取消订阅方法
        return () => {
            console.log('取消订阅', fieldName);
            // 移除事件监听器
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
            // 从表单域中移除该对象
            this.remove(fieldName);
        };
    }

    getValue(fieldName?: string) {
        // 如果传入name，返回对应的表单值，否则返回整个表单的值
        return fieldName
            ? deepGet(this.values, fieldName)
            : deepClone(this.values);
    }

    /** 设置、增加表单项 */
    setValue(fieldName: any, value?: any): void {
        if (typeof fieldName === 'string') {
            const prevValue = deepGet(this.values, fieldName);
            if (!deepCompare(prevValue, value)) {
                // 值有改变才设置
                this.setFieldValue(fieldName, value);
            }
        } else if (fieldName) {
            const values = fieldName;
            // 批量设置表单值
            Object.keys(values).forEach((key) =>
                this.setValue(key, values[key])
            );
        }
    }

    /** 移除表单项 */
    remove(fieldName: string) {
        console.log('remove field', fieldName);
        return deepRemove(this.values, fieldName);
    }

    reset() {
        this.setValue(this.initialValues);
    }

    private setFieldValue(fieldName: string, value: FormValues) {
        this.prevValues = deepClone(this.values);
        deepSet(this.values, fieldName, value);
        this.notify(fieldName);
    }
}
