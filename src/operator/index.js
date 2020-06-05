export const EITHER = "either";
export const COMBINE = "combine";

const isType = (type) => (func) => func.type === type;

export const isEither = isType(EITHER);
export const isCombine = isType(COMBINE);

export const either = (left, right) => {
  if (!(left instanceof Function))
    throw new Error("left side of either must be a function");

  if (!(right instanceof Function))
    throw new Error("right side of either must be a function");

  return { type: EITHER, left, right };
};

export const combine = (...functions) => ({
  type: COMBINE,
  combination: functions,
});

const shouldResolve = (func) =>
  !!(Array.isArray(func) || isEither(func) || isCombine(func));

export const resolveOperator = (functions) => {
  if (shouldResolve(functions)) {
    const functionsArr = !Array.isArray(functions) ? [functions] : functions;

    return functionsArr.reduce((acc, func) => {
      if (isCombine(func))
        return [...acc, ...resolveOperator(func.combination)];
      if (isEither(func)) {
        return [
          ...acc,
          {
            type: EITHER,
            left: resolveOperator(func.left),
            right: resolveOperator(func.right),
          },
        ];
      }

      return [...acc, func];
    }, []);
  }

  return functions;
};
