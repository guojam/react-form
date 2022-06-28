import React, { forwardRef } from 'react';
import FormStore from './FormStore';
import FormStoreContext from './FormStoreContext';
import useForm from './useForm';

interface FormProps {
    store?: FormStore;
    className?: string;
    children?: React.ReactNode;
    onSubmit?: (e: React.FormEvent) => void;
}

/**
 * @param ref 第二个参数 ref 只在使用 React.forwardRef 定义组件时存在。常规函数和 class 组件不接收 ref 参数，且 props 中也不存在 ref。
 */
function _Form(props: FormProps, ref: React.Ref<FormStore>) {
    const { children, onSubmit, store } = props;
    // 函数式组件通过useForm获取formStore
    const [formStore] = useForm(store);

    // class组件通过ref转发获取formStore
    // https://zh-hans.reactjs.org/docs/forwarding-refs.html
    React.useImperativeHandle(ref, () => formStore);
    return (
        <FormStoreContext.Provider value={formStore}>
            <form onSubmit={onSubmit}>{children}</form>
        </FormStoreContext.Provider>
    );
}

const Form = forwardRef(_Form);

export default Form;
