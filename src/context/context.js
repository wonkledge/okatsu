import {EITHER, isEither} from "../operator/operator";
import {rejected, resolved} from "../promise/promise";

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

const createEitherContext = (setContext, funcNameLeft, funcNameRight) => ({
    type: EITHER,
    left : setContext(true)(funcNameLeft),
    right: setContext(false)(funcNameRight)
})

const handleContextEither = (context, setContext, either) => {
    const left = needContext(either.left) ? either.left(context) : either.left
    const right = needContext(either.right) ? either.right(context) : either.right;

    return [createEitherContext(setContext, either.left.name, either.right.name), { type: EITHER, left, right }];
}

const getParamNames = (func) => {
    let fnStr = func.toString().replace(STRIP_COMMENTS, '');
    let result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if(result === null)
        result = [];
    return result;
}

const needContext = (func) => {
    const [nextArg] = getParamNames(func);

    return nextArg === 'context';
}

export const useContext = () => {
    let context = {
        stash: {},
        fromStash: (fct) => context.stash[fct.name] ? context.stash[fct.name] : undefined
    };

    const setContext = (isResolved) => (functionName) => (input) => {
        context.stash[functionName] = input;

        return isResolved ? resolved(input) : rejected(input);
    }

    return [context, setContext];
};

export const injectContext = (functions) => {
    const [context, setContext] = useContext();

    const funcsWithContext = functions.reduce( (funcs, func) => {

        if(isEither(func)) {
            return [...funcs, ...handleContextEither(context, setContext, func)];
        }

        if (needContext(func)) {
            return [...funcs, createEitherContext(setContext, func.name, 'defaultBehaviour'), func(context)];
        }

        return [...funcs, createEitherContext(setContext, func.name, 'defaultBehaviour'), func];
    }, [])

    return funcsWithContext.slice(1, funcsWithContext.length);
};