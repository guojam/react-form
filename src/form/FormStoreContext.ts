import { createContext } from 'react';
import FormStore from './FormStore';

const FormStoreContext = createContext<FormStore | undefined>(undefined);

export default FormStoreContext;
