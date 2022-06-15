import React, { Component, FormEvent } from 'react';
import { Form, FormField, FormStore } from './form';
import Input from './components/input';
import { Radio, RadioGroup } from './components/radio';

interface IState {
    [key: string]: string;
}

export default class FormDemo extends Component<any, IState> {
    private formStore;
    constructor(props: any) {
        super(props);
        this.formStore = new FormStore({
            username: [''],
            password: [''],
            gender: [''],
        });
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
    render() {
        return (
            <>
                <Form store={this.formStore} onSubmit={this.handleSubmit}>
                    <FormField
                        name="username"
                        label="用户名"
                        onChange={this.handleChange('username')}
                    >
                        <Input />
                    </FormField>
                    <FormField
                        name="password"
                        label="密码"
                        onChange={this.handleChange('password')}
                    >
                        <Input type="password" />
                    </FormField>
                    <FormField name="gender" label="性别">
                        <RadioGroup>
                            <Radio value="male">男</Radio>
                            <Radio value="female">女</Radio>
                            <Radio value="other" disabled>
                                其他
                            </Radio>
                        </RadioGroup>
                    </FormField>
                    <FormField label="">
                        <input type="submit" value="提交" />
                        <input
                            type="button"
                            value="重置"
                            onClick={this.handleReset}
                        />
                    </FormField>
                </Form>
            </>
        );
    }
}
