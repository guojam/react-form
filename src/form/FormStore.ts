import { FormListener } from './form.model';
import { deepClone, deepGet, deepSet, deepRemove } from './util';

// tuple 元组
type FieldConfig = [string | FormControlsConfig];
interface FormControlsConfig {
    [key: string]: FieldConfig;
}
interface FormValues {
    [key: string]: string | FormValues;
}

export default class FormStore {
    /** 表单初始值，用于重置表单 */
    private initialValues: any;
    private values: any;

    /** 事件回调 */
    private listeners: FormListener[] = [];
    constructor(controlsConfig?: FormControlsConfig) {
        // 表单初始值，用于重置表单
        this.initialValues = this.getInitialValues(controlsConfig);
        this.values = deepClone(this.initialValues);
    }

    /** 通知表单变动 */
    private notify(name: string, prevValues: any, curValues: any) {
        this.listeners.forEach((listener) =>
            listener(name, prevValues, curValues)
        );
    }

    private getInitialValues(config?: FormControlsConfig) {
        const formValue = {} as FormValues;

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

    private getFieldValue(formValues: any, name: string) {
        return deepGet(formValues, name);
    }

    subscribe(name: string, listener: FormListener) {
        this.listeners.push(listener);
        // 返回取消订阅方法
        return () => {
            console.log('取消订阅', name);
            // 移除事件监听器
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
            // 从表单域中移除该对象
            this.remove(name);
        };
    }

    group(config: FormControlsConfig) {
        const values = this.getInitialValues(config);
        this.initialValues = values;
        this.set(deepClone(values));
    }

    get(name?: string) {
        // 如果传入name，返回对应的表单值，否则返回整个表单的值
        return name
            ? this.getFieldValue(this.values, name)
            : { ...this.values };
    }

    /** 设置、增加表单项 */
    set(name: any, value?: any): void {
        const prevValues = deepClone(this.values);
        if (typeof name === 'string') {
            deepSet(this.values, name, value);
            this.notify(name, prevValues, this.values);
        } else if (name) {
            const values = name;
            // 批量设置表单值
            Object.keys(values).forEach((key) => this.set(key, values[key]));
        }
    }

    /** 移除表单项 */
    remove(name: string) {
        console.log('remove field', name);
        return deepRemove(this.values, name);
    }

    // 重置表单值
    reset() {
        const prevValues = deepClone(this.values);
        // 重置默认值
        this.values = deepClone(this.initialValues);
        // 执行通知
        this.notify('*', prevValues, this.values);
    }
}
