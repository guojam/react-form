import _ from 'lodash';

export function deepGet(object: any, path: string) {
    return _.get(object, path);
}

export function deepSet(object: any, path: string, value: any) {
    return _.set(object, path, value);
}

export function deepClone<T>(object: T) {
    return _.cloneDeep(object);
}

export function deepRemove(object: any, path: string) {
    return _.unset(object, path);
}
