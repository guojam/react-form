import React, { Component, FormEvent } from 'react';
import { Form } from './form';
import Input from './input';

interface IState {
    [key: string]: string;
}

export default class FormDemo extends Component<any, IState> {
    private initialState;
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.initialState = { ...this.state };
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
                {' '}
                <Form onSubmit={this.handleSubmit}>
                    <div className="ui-form-item">
                        <label className="ui-label">用户名</label>
                        <div className="ui-form-item-box">
                            <Input
                                name="username"
                                value={username}
                                onChange={this.handleChange('username')}
                            />
                        </div>
                    </div>
                    <div className="ui-form-item">
                        <label className="ui-label">密码</label>
                        <div className="ui-form-item-box">
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange('password')}
                            />
                        </div>
                    </div>
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
                    {Object.keys(this.state).map((key) => (
                        <dd key={key}>
                            {key}:{this.state[key]}
                        </dd>
                    ))}
                </dl>
            </>
        );
    }
}
