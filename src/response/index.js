import { HTTP_CODE_200 } from "../httpCode/httpCode";
import { either } from "../operator";

const handleResponse = (res) => (data) => {
  res.status(HTTP_CODE_200);
  res.json({ data });
};

const handleErrorResponse = (res) => (errors) => {
  res.status(errors.code);
  res.json({ errors });
};

const sendResponse = (res) =>
  either(handleResponse(res), handleErrorResponse(res));

export default sendResponse;
