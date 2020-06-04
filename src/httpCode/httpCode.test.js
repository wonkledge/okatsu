import {httpResponseWrapper, HTTP_CODE_200, HTTP_CODE_401, HTTP_CODE_500} from './httpCode';
describe('httpResponseWrapper function', () => {
    it('Should return object with code and payload', () => {

        expect(httpResponseWrapper(HTTP_CODE_200, { id: 34, name: 'anais'}))
            .toStrictEqual({ code: 200, payload: {id:34, name:'anais'}})
    });

    it('Should return old response when call with a response', () => {
        expect(httpResponseWrapper(HTTP_CODE_500, httpResponseWrapper(HTTP_CODE_401, 'Unauthorized')))
            .toStrictEqual({code:401, payload: 'Unauthorized'})
    });
});
