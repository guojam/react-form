# React Form

## 初始化

import { Form, FormControl, FormItem, FormStore } from './form';

```tsx
export default class FormDemo extends Component<any, IState> {
    private formStore;
    constructor(props: any) {
        super(props);
        this.formStore = new FormStore({
            username: [''],
            password: [''],
        });
    }
    handleSubmit = (e: FormEvent) => {
        const formValues = this.formStore.get();
        e.preventDefault();
    };
    handleReset = () => {
        this.formStore.reset();
    };
    usernameHandleChange = (value: string) => {};
    render() {
        return (
            <Form store={this.formStore} onSubmit={this.handleSubmit}>
                <FormItem
                    name="username"
                    label="用户名"
                    onChange={this.usernameHandleChange}
                >
                    <Input />
                </FormItem>
                <FormItem name="password" label="密码">
                    <Input type="password" />
                </FormItem>
            </Form>
        );
    }
}
```

### FormItem

表单项组件，用于布局
当 FormItem 设置了`name`属性且只有一个子组件时，会在内部使用 FormControl 包裹子组件

### FormControl

表单控件容器，用于 formStore 接管表单域子组件双向数据流
