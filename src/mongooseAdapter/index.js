/* eslint-disable no-underscore-dangle */
import { combine, either } from "../operator";
import { HTTP_CODE_500, httpResponseWrapper } from "../httpCode/httpCode";
import { rejected, resolved } from "../promise";

const handleData = (data) => {
  return Array.isArray(data)
    ? resolved(data.map((datum) => datum._doc))
    : resolved(data);
};

const handleError = (error) =>
  rejected(httpResponseWrapper(HTTP_CODE_500, error));

export const query = (callback) => combine(either(handleData, handleError), callback);

