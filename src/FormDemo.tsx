import React, { Component, FormEvent } from 'react';
import { Form, FormControl, FormItem, FormStore } from './form';
import Input from './components/input';
import { Radio, RadioGroup } from './components/radio';

interface IState {
    [key: string]: any;
}

export default class FormDemo extends Component<any, IState> {
    private formStore;
    constructor(props: any) {
        super(props);
        // this.formStore = new FormStore({
        //     username: [''],
        //     password: [''],
        //     gender: ['female'],
        //     enableNickname: ['false'],
        // });
        this.formStore = new FormStore();
        this.state = {
            showNicknameInput: false,
        };
    }

    componentDidMount() {
        console.log('formDemo componentDidMount, 设置表单初始值');
        // this.formStore.set({
        //     username: '',
        //     password: '',
        //     gender: 'female',
        //     enableNickname: 'false',
        // });
        this.formStore.group({
            username: [''],
            password: [''],
            gender: ['female'],
            enableNickname: ['false'],
        });
    }
    componentWillUnmount() {
        console.log('formDemo componentWillUnmount');
        console.log(this.formStore.get());
    }
    handleSubmit = (e: FormEvent) => {
        const formValues = this.formStore.get();
        console.log('formValues:', formValues);
        e.preventDefault();
    };
    handleReset = () => {
        this.formStore.reset();
    };
    handleChange = (fieldName: string) => {
        return (value: string) => {
            console.log(fieldName, 'changed:', value);
        };
    };

    enableNicknameHandleChange = (value: string) => {
        console.log('enableNicknameHandleChange', value);
        const showNicknameInput = value === 'true';
        if (showNicknameInput) {
            this.formStore.set('nickname', '');
        } else {
            this.formStore.remove('nickname');
        }
        this.setState({ showNicknameInput });
    };
    render() {
        console.log('form demo rending...');
        return (
            <>
                <Form store={this.formStore} onSubmit={this.handleSubmit}>
                    <FormItem
                        name="username"
                        label="用户名"
                        onChange={this.handleChange('username')}
                    >
                        <Input />
                    </FormItem>
                    <FormItem
                        name="password"
                        label="密码"
                        onChange={this.handleChange('password')}
                    >
                        <Input type="password" />
                    </FormItem>
                    <FormItem name="gender" label="性别">
                        <RadioGroup>
                            <Radio value="male">男</Radio>
                            <Radio value="female">女</Radio>
                            <Radio value="other" disabled>
                                其他
                            </Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="显示昵称">
                        <FormControl
                            name="enableNickname"
                            onChange={this.enableNicknameHandleChange}
                        >
                            <RadioGroup>
                                <Radio value="false">不显示</Radio>
                                <Radio value="true">显示</Radio>
                            </RadioGroup>
                        </FormControl>
                        <p
                            style={{
                                fontSize: '12px',
                                color: '#666',
                            }}
                        >
                            代替用户名显示
                        </p>
                    </FormItem>
                    {this.state.showNicknameInput && (
                        <FormItem
                            label="昵称"
                            name="nickname"
                            shouldUpdate={(prevValues, curValues) => {
                                console.log(1);
                                console.log(prevValues);
                                console.log(curValues);
                                return true;
                            }}
                        >
                            <Input />
                        </FormItem>
                    )}
                    <FormItem label="">
                        <input type="submit" value="提交" />
                        <input
                            type="button"
                            value="重置"
                            onClick={this.handleReset}
                        />
                    </FormItem>
                </Form>
            </>
        );
    }
}
