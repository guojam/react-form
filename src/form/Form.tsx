import React from 'react';
import FormStore from './FormStore';
import FormStoreContext from './FormStoreContext';

interface FormProps {
    store: FormStore;
    className?: string;
    children?: React.ReactNode;
    onSubmit?: (e: React.FormEvent) => void;
}

function Form(props: FormProps) {
    const { store, children, onSubmit } = props;

    return (
        <FormStoreContext.Provider value={store}>
            <form onSubmit={onSubmit}>{children}</form>
        </FormStoreContext.Provider>
    );
}

export default Form;
