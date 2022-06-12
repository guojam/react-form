import React, { Component, FormEvent } from 'react';
import { Form, FormField, FormStore } from './form';
import Input from './input';

interface IState {
    [key: string]: string;
}

export default class FormDemo extends Component<any, IState> {
    private initialState;
    private formStore;
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.initialState = { ...this.state };
        this.formStore = new FormStore({
            username: [''],
            password: [''],
        });
    }
    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };
    handleReset = () => {
        this.setState({ ...this.initialState });
    };
    handleChange = (fieldName: string) => {
        return (value: string) => {
            console.log(fieldName);
            this.setState({ [fieldName]: value });
        };
    };
    render() {
        const { username, password } = this.state;
        return (
            <>
                <Form store={this.formStore} onSubmit={this.handleSubmit}>
                    <FormField name="username" label="用户名">
                        <Input onChange={this.handleChange('username')} />
                    </FormField>
                    <FormField name="password" label="密码">
                        <Input
                            type="password"
                            onChange={this.handleChange('password')}
                        />
                    </FormField>
                    <div className="ui-form-item">
                        <input type="submit" value="提交" />
                        <input
                            type="button"
                            value="重置"
                            onClick={this.handleReset}
                        />
                    </div>
                </Form>
                <dl>
                    <dt>表单值</dt>
                    {Object.keys(this.formStore.get()).map((key) => (
                        <dd key={key}>
                            {key}:{this.state[key]}
                        </dd>
                    ))}
                </dl>
            </>
        );
    }
}
