export default class FormStore {
    private values;
    // private defaultValues;
    private listeners;
    constructor(defaultValues = {}) {
        // 表单值
        this.values = defaultValues;

        // 表单初始值，用于重置表单
        // this.defaultValues = deepCopy(defaultValues);

        // 事件回调
        this.listeners = [];
    }

    subscribe(listener: any) {
        this.listeners.push(listener);

        // 返回取消订阅方法
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    // 通知表单变动，调用所有listener
    notify(name: string) {
        this.listeners.forEach((listener) => listener(name));
    }

    // 获取表单值
    get(name?: string) {
        // 如果传入name，返回对应的表单值，否则返回整个表单的值
        return name ? this.values[name] : this.values;
    }

    // 设置表单值
    set(name: any, value: any) {
        //如果指定了name
        if (typeof name === 'string') {
            // 设置name对应的值
            this.values[name] = value;

            // 通知表单变动
            this.notify(name);
        }

        // 批量设置表单值
        else if (name) {
            const values = name;
            Object.keys(values).forEach((key) => this.set(key, values[key]));
        }
    }

    // 重置表单值
    reset() {
        // 重置默认值
        // this.values = deepCopy(this.defaultValues);
        // 执行通知
        this.notify('*');
    }
}
