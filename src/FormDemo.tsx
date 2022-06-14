import React, { Component, FormEvent } from 'react';
import { Form, FormField, FormStore } from './form';
import Input from './input';

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
