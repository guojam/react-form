import { useRef } from 'react';
import FormStore from './FormStore';
function useForm(formStore?: FormStore) {
    const formRef = useRef<FormStore>();

    if (!formRef.current) {
        if (formStore) {
            formRef.current = formStore;
        } else {
            const store = new FormStore();
            formRef.current = store;
        }
    }

    return [formRef.current];
}

export default useForm;
