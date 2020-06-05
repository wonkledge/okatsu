import {combine, either} from "../operator/operator";
import {HTTP_CODE_500, httpResponseWrapper} from "../httpCode/httpCode";
import {rejected, resolved} from "../promise/promise";

const handleData = (data) => Array.isArray(data) ? resolved(data.map(datum => datum._doc)) : resolved(data);

const handleError = (error) => rejected(httpResponseWrapper(HTTP_CODE_500, error));

export const query = callback => combine(either(handleData, handleError), callback);