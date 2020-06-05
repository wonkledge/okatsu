import {rejected, resolved} from "../promise/promise";
import {either} from "../operator/operator";

const logGood = (input) => { console.log(input);return resolved(input)};
const logBad = (input) => { console.log(input);return rejected(input)};

const logStashGood = (context) => input => {
    console.log(context.stash);
    return resolved(input)
};

const logStashBad = (context) => input => {
    console.log(context.stash);
    return rejected(input)
};

export const logStash = either(logStashGood, logStashBad);
export const log = either(logGood, logBad);
