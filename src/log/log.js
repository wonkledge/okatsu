import { rejected, resolved } from "../promise/promise";
import { either } from "../operator/operator";

const logGood = (input) => {
  // eslint-disable-next-line no-console
  console.log(input);
  return resolved(input);
};
const logBad = (input) => {
  // eslint-disable-next-line no-console
  console.log(input);
  return rejected(input);
};

const logStashGood = (context) => (input) => {
  // eslint-disable-next-line no-console
  console.log(context.stash);
  return resolved(input);
};

const logStashBad = (context) => (input) => {
  // eslint-disable-next-line no-console
  console.log(context.stash);
  return rejected(input);
};

export const logStash = either(logStashGood, logStashBad);
export const log = either(logGood, logBad);
