import React from 'react';

export const FormStoreContext = React.createContext(undefined);

function Form(props: any) {
    const { store, children, onSubmit } = props;

    return (
        <FormStoreContext.Provider value={store}>
            <form onSubmit={onSubmit}>{children}</form>
        </FormStoreContext.Provider>
    );
}

export default Form;
