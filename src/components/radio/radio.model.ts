import { ReactNode } from 'react';

export interface RadioGroupItemProps {
    value: string;
    label?: string;
    disabled?: boolean;
    checked?: boolean;
    onChange?: (value: string) => void;
}
export interface RadioProps extends RadioGroupItemProps {
    name?: string;
    id?: string;
    children?: ReactNode;
}

export interface RadioGroupProps {
    name?: string;
    children?: any;
    value?: string;
    options?: RadioGroupItemProps[];
    onChange?: (args: any) => void;
}
