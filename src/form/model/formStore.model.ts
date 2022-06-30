export interface FormValues {
    [key: string]: string | FormValues;
}
export type FormListener = (
    fieldName: string,
    prevValues: FormValues,
    curValues: FormValues
) => void;

export type onValuesChangeCallback = (
    changedValues: any,
    allValues: any
) => void;
export interface FormStoreCallbacks {
    onValuesChange?: onValuesChangeCallback;
}

export type FieldConfig = [string | FormControlsConfig]; // tuple 元组
/** 表单控件初始化配置 */
export interface FormControlsConfig {
    [key: string]: FieldConfig;
}
