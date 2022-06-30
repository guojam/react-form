import _ from 'lodash';

export function deepGet(object: any, path: string) {
    return _.get(object, path);
}

export function deepSet<T extends object>(
    object: any,
    path: string,
    value: any
) {
    return _.set<T>(object, path, value);
}

export function deepClone<T>(object: T) {
    return _.cloneDeep(object);
}

export function deepRemove(object: any, path: string) {
    return _.unset(object, path);
}

export function deepCompare(object: any, other: any) {
    return _.isEqual(object, other);
}

export function getDeepDiff(object: any, other: any) {
    return _.reduce(
        object,
        function (result, value, key) {
            const isEqual = _.isEqual(value, other[key]);
            if (!isEqual) {
                result[key] = value;
            }
            return result;
        },
        {} as {
            [key: string]: any;
        }
    );
}
