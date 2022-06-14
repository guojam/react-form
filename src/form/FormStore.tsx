import { FormListener } from './form.model';
import { deepCopy, deepGet, deepSet } from './util';

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
    constructor(controlsConfig: FormControlsConfig) {
        // 表单初始值，用于重置表单
        this.initialValues = this.getFormValues(controlsConfig);
        this.values = deepCopy(this.initialValues);
    }

    /** 通知表单变动 */
    private notify(name: string) {
        this.listeners.forEach((listener) => listener(name));
    }

    private getFormValues(config: FormControlsConfig) {
        const formValue = {} as FormValues;
        Object.keys(config).forEach((key) => {
            const fieldConfig = config[key],
                fieldValue = fieldConfig[0];
            if (typeof fieldValue === 'string') {
                formValue[key] = fieldValue;
            } else {
                formValue[key] = this.getFormValues(
                    fieldValue as FormControlsConfig
                );
            }
        });
        return formValue;
    }

    subscribe(listener: FormListener) {
        this.listeners.push(listener);
        // 返回取消订阅方法
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    get(name?: string) {
        // 如果传入name，返回对应的表单值，否则返回整个表单的值
        return name ? deepGet(this.values, name) : { ...this.values };
    }

    set(name: any, value?: any): void {
        if (typeof name === 'string') {
            deepSet(this.values, name, value);
            this.notify(name);
        } else if (name) {
            const values = name;
            // 批量设置表单值
            Object.keys(values).forEach((key) => this.set(key, values[key]));
        }
    }

    // 重置表单值
    reset() {
        // 重置默认值
        this.values = deepCopy(this.initialValues);
        // 执行通知
        this.notify('*');
    }
}
