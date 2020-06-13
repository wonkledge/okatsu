export const isUuid = uuid => {
    const result = uuid.toString().match(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/);
    return result !== null;
}

export const isEmail = (email) => {
    const result = email.toString().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return result !== null;
}

export const isFrenchPostalCode = (postalCode) => {
    const result = postalCode.toString().match(/^[0-9]{5}$/);
    return result !== null;
}


export const isPrice = (price) => {
    const result = price.toString().match(/^[0-9]+,[0-9]{2}$/);
    return result !== null;
}

export const isIncludedIn = (arr) => (value) => arr.includes(value);

export const isAlphaNumericExtended = (value) => {
    const result = value.toString().match(/^[a-zA-Z0-9 àèìòùáéíóúýâêîôûãñõäëïöüÿç -]+$/);
    return result !== null;
}
