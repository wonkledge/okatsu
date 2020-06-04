export const HTTP_CODE_200 = 200;
export const HTTP_CODE_201 = 201;
export const HTTP_CODE_400 = 400;
export const HTTP_CODE_401 = 401;
export const HTTP_CODE_403 = 403;
export const HTTP_CODE_404 = 404;
export const HTTP_CODE_500 = 500;
export const HTTP_CODE_501 = 501;

export const httpResponseWrapper = (code, payload) => {

    if (payload.code) {
        return payload;
    }

    return {code, payload};
};


