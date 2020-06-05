import { EITHER, isEither, resolveOperator } from "../operator/operator";
// eslint-disable-next-line import/no-cycle
import { injectContext } from "../context/context";

export const resolved = (data) => new Promise((resolve) => resolve(data));
export const rejected = (data) =>
  new Promise((resolve, reject) => reject(data));

const defaultBehavior = (data) =>
  new Promise((resolve, reject) => reject(data));

const injectHandleError = (functions) => {
  return functions.map((fct) => {
    if (isEither(fct)) return fct;

    return { type: EITHER, left: fct, right: defaultBehavior };
  });
};

export const feature = (...functions) => (input) => {
  const x = resolveOperator(functions);
  const y = injectContext(x);
  const u = injectHandleError(y);
  return u.reduceRight((chain, val) => {
    const resolveCallback = val.left;
    const rejectCallback = val.right;
    return chain.then(resolveCallback).catch(rejectCallback);
  }, Promise.resolve(input));
};
