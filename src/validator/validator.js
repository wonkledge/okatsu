import {rejected, resolved} from "../promise/promise";
import {HTTP_CODE_400, httpResponseWrapper} from "../httpCode/httpCode";

export const checkParameters = validators => req => {
    let errors = [];

    req = discardUnusedParameters(req, validators);
    errors = checkRequiredParameters(req, validators);

    if (errors.length > 0) {
        return rejected(httpResponseWrapper(HTTP_CODE_400, errors));
    }

    errors = checkOptionalParameters(req, validators);

    if (errors.length > 0) {
        return rejected(httpResponseWrapper(HTTP_CODE_400, errors));
    }

    return resolved(req);
};

const discardUnusedParameters = (req, validators) => {
    const fields = validators.map( validator => validator.field)
    const fieldsProvided = Object.keys(req);

    return fieldsProvided.reduce( (reqFormatted, fieldProvided) => {
        if (fields.includes(fieldProvided)) {
            reqFormatted[fieldProvided] = req[fieldProvided];
        }

        return reqFormatted;
    }, {})
}

const checkRequiredParameters = (req, validators) => {
    const fieldsRequired = validators
        .filter(validator => validator.required === true)
        .map( validator => validator.field);
    const fieldsProvided = Object.keys(req);
    let errors = [];

    errors = fieldsRequired.reduce((errors, fieldRequired) => {
        if (!fieldsProvided.includes(fieldRequired)) {
            errors.push(`Missing required parameters ${fieldRequired}`)
        }

        return errors;
    }, []);

    if (errors.length > 0)
        return errors;

    return fieldsProvided.reduce((errors, fieldProvided) => {
        const [validatorField] = validators.filter( validator => validator.field === fieldProvided);

        if (!validatorField.predicate(req[fieldProvided])) {
            errors.push(validatorField.errorMessage);
        }

        return errors;
    }, []);
};

const checkOptionalParameters = (req, validators) => {
    const fieldsProvided = Object.keys(req);

    return fieldsProvided.reduce((errors, fieldProvided) => {
        const [validatorField] = validators.filter( validator => validator.field === fieldProvided);

        if (validatorField && !validatorField.predicate(req[fieldProvided])) {
            errors.push(validatorField.errorMessage);
        }

        return errors;
    }, []);
};

