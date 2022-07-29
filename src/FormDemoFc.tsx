import React, { FormEvent, useEffect, useState } from 'react';
import { Form, FormField, FormItem, useForm, FormValues } from './form';
import Input from './components/input';
import { Radio, RadioGroup } from './components/radio';

const FormDemoFc = () => {
    const [showNicknameInput, setShowNicknameInput] = useState(false);
    const [formStore] = useForm();
    useEffect(() => {
        formStore.group({
            username: [''],
            password: [''],
            gender: ['female'],
            enableNickname: ['false'],
        });
    }, [formStore]);

    const handleSubmit = (e: FormEvent) => {
        const formValues = formStore.getValue();
        console.log('formValues:', formValues);
        e.preventDefault();
    };
    const handleReset = () => {
        formStore.reset();
    };
    const handleChange = (fieldName: string) => {
        return (value: string) => {
            console.log(fieldName, 'changed:', value);
        };
    };

    const enableNicknameHandleChange = (value: string) => {
        console.log('enableNicknameHandleChange', value);
        const showNicknameInput = value === 'true';
        if (showNicknameInput) {
            formStore.setValue('nickname', '');
        } else {
            formStore.remove('nickname');
        }
        setShowNicknameInput(showNicknameInput);
    };

    const handleValuesChange = ({ enableNickname }: FormValues) => {
        if (enableNickname !== undefined) {
            setShowNicknameInput(enableNickname === 'true');
        }
    };

    return (
        <>
            <Form
                store={formStore}
                onSubmit={handleSubmit}
                onValuesChange={handleValuesChange}
            >
                <FormItem
                    name="username"
                    label="用户名"
                    onChange={handleChange('username')}
                >
                    <Input />
                </FormItem>
                <FormItem
                    name="password"
                    label="密码"
                    onChange={handleChange('password')}
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
                    <FormField
                        name="enableNickname"
                        // onChange={enableNicknameHandleChange}
                    >
                        <RadioGroup>
                            <Radio value="false">不显示</Radio>
                            <Radio value="true">显示</Radio>
                        </RadioGroup>
                    </FormField>
                    <p
                        style={{
                            fontSize: '12px',
                            color: '#666',
                        }}
                    >
                        代替用户名显示
                    </p>
                </FormItem>
                {showNicknameInput && (
                    <FormItem
                        label="昵称"
                        name="nickname"
                        // shouldUpdate={(prevValues, curValues) => {
                        //     console.log(prevValues);
                        //     console.log(curValues);
                        //     return true;
                        // }}
                    >
                        <Input />
                    </FormItem>
                )}
                <FormItem label="">
                    <input type="submit" value="提交" />
                    <input type="button" value="重置" onClick={handleReset} />
                </FormItem>
            </Form>
        </>
    );
};

export default FormDemoFc;
