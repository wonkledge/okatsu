export const EITHER = 'either';
export const COMBINE = 'combine';
export const CONTEXTUALIZE = 'contextualize';

const isEither = (func) => func.type === 'either';
const isCombine = (func) => func.type === 'combine';

export const either = (left, right) => ({ type: EITHER, left, right });
export const combine = (...functions) => ({ type: COMBINE, combination: functions});
export const contextualize = func => ({ type: CONTEXTUALIZE, func});

export const resolved = (data) => new Promise((resolve, rejected) => resolve(data));
export const rejected = (data) => new Promise((resolve, rejected) => rejected(data));

const shouldResolve = (func) => !!(Array.isArray(func) || isEither(func) || isCombine(func));

export const resolveOperator = (functions) => {
    if (shouldResolve(functions)) {
        functions = !Array.isArray(functions) ? [functions] : functions;
        return functions.reduce( (acc, func) => {
            if(isCombine(func))
                return [...acc, ...resolveOperator(func.combination)];
            if(isEither(func))
                return [...acc, {type: EITHER, left: resolveOperator(func.left), right: resolveOperator(func.right)}];


            return [...acc, func];
        }, [])
    }

    return functions;
};
