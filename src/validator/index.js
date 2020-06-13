import { rejected, resolved } from "../promise";
import { HTTP_CODE_400, httpResponseWrapper } from "../httpCode/httpCode";

const discardUnusedParameters = (req, validators) => {
  const fields = validators.map((validator) => validator.field);
  const fieldsProvided = Object.keys(req);

  return fieldsProvided.reduce((reqFormatted, fieldProvided) => {
    if (fields.includes(fieldProvided)) {
      return { ...reqFormatted, [fieldProvided]: req[fieldProvided] };
    }

    return reqFormatted;
  }, {});
};

const checkRequiredParameters = (req, validators) => {
  const fieldsRequired = validators
    .filter((validator) => validator.required === true)
    .map((validator) => validator.field);

  const fieldsProvided = Object.keys(req);

  const missingParameters = fieldsRequired.reduce((errors, fieldRequired) => {
    if (!fieldsProvided.includes(fieldRequired)) {
      errors.push(`Missing required parameters ${fieldRequired}`);
    }

    return errors;
  }, []);

  if (missingParameters.length > 0) return missingParameters;

  return fieldsProvided.reduce((predicateFailed, fieldProvided) => {
    const [validatorField] = validators.filter(
      (validator) => validator.field === fieldProvided
    );

    if (!validatorField.predicate(req[fieldProvided])) {
      predicateFailed.push(validatorField.errorMessage);
    }

    return missingParameters;
  }, []);
};

const checkOptionalParameters = (req, validators) => {
  const fieldsProvided = Object.keys(req);

  return fieldsProvided.reduce((errors, fieldProvided) => {
    const [validatorField] = validators.filter(
      (validator) => validator.field === fieldProvided
    );

    if (validatorField && !validatorField.predicate(req[fieldProvided])) {
      errors.push(validatorField.errorMessage);
    }

    return errors;
  }, []);
};

export const checkParameters = (validators) => (params) => {
  let errors = [];

  const usedParams = discardUnusedParameters(params, validators);
  errors = checkRequiredParameters(usedParams, validators);

  if (errors.length > 0) {
    return rejected(httpResponseWrapper(HTTP_CODE_400, errors));
  }

  errors = checkOptionalParameters(usedParams, validators);

  if (errors.length > 0) {
    return rejected(httpResponseWrapper(HTTP_CODE_400, errors));
  }

  return resolved(usedParams);
};
