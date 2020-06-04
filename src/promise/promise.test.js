import {feature, rejected, resolved} from "./promise";

describe( 'compose function', () => {
    it(' should take resolved path', () => {
        const sum2 = a => resolved(a + 2);
        const times4 = a => resolved(a * 4);

        expect(feature(sum2, times4)(2)).resolves.toBe(10);
    })

    it('should take rejected path', () => {
        const sum3Rejected = () => rejected('Something wrong happened');
        const times4 = a => resolved(a * 4);

        expect(feature(times4, sum3Rejected)(4)).rejects.toBe('Something wrong happened');
    });
});

describe('resolve function', () => {
    it('should resolves data pass in', () => {
        expect(resolved('data')).resolves.toBe('data');
    });
});

describe('rejected function', () => {
    it('should rejects data pass in', () => {
        expect(rejected('data')).rejects.toBe('data');
    });
});