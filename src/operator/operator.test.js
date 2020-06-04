import {
    COMBINE,
    combine,
    CONTEXTUALIZE,
    contextualize,
    EITHER,
    either,
    rejected,
    resolved,
    resolveOperator
} from "./operator";

const sum = (a,b) => a + b;
const times = (a, b) => a * b;
const minus = (a, b) => a-b;
const divide = (a,b ) => a/b;
const modulo = (a,b) => a%b;

const moduloAndMinus = combine(minus, modulo);
const divideAndTimes = combine(times, divide);
const moduloAndMinusAndDivide = combine(divide,moduloAndMinus);
const timesAndModuloAndMinusAndDivide = combine(moduloAndMinusAndDivide, times);

const sumOrTimes = either(sum, times);
const minusAndSumOrTimes = combine(sumOrTimes, minus);
const moduloOrMinus = either(modulo, minus);
const moduloOrMinusAndDivide = combine(moduloOrMinus, moduloAndMinusAndDivide);
const combineBothEither = combine(moduloOrMinus, sumOrTimes);
const divideAndTimesOrmoduloAndMinus = either(divideAndTimes, moduloAndMinus);

describe('either function', () => {
    const sumOnLeftTimesOnRight = either(sum, times);

    it('should return correct function on left side', () => {
        expect(sumOnLeftTimesOnRight.left(2,0)).toBe(2);
    });

    it('should return correct function on right side', () => {
        expect(sumOnLeftTimesOnRight.right(2,0)).toBe(0);
    });

    it('should return correct type', () => {
        expect(sumOnLeftTimesOnRight.type).toBe(EITHER);
    });
});

describe('combine function', () => {
    const sumAndTimes = combine(times, sum);
    it('should return correct type', () => {
        expect(sumAndTimes.type).toBe(COMBINE);
    });

    it('should return array of functions', () => {
        expect(sumAndTimes.combination).toStrictEqual([times, sum]);
    });
});

describe('contextualize function', () => {
    const sumWithContext = contextualize(sum);

    it('should return correct type', () => {
        expect(sumWithContext.type).toBe(CONTEXTUALIZE);
    });

    it('should return function to contextualize', () => {
        expect(sumWithContext.func).toStrictEqual(sum);
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

describe('resolveOperator function', () => {
    it('should resolve combine on first degree', () => {
        expect(resolveOperator([moduloAndMinus])).toStrictEqual([minus, modulo]);
    });

    it('should resolve combine on second degree', () => {
        expect(resolveOperator([moduloAndMinusAndDivide]))
            .toStrictEqual([divide, minus, modulo]);
    });

    it('should resolve combine on third degree', () => {
        expect(resolveOperator([timesAndModuloAndMinusAndDivide]))
            .toStrictEqual([divide, minus, modulo, times]);
    });

    it('should resolve combine first degree with either', () => {
        expect(resolveOperator([minusAndSumOrTimes]))
            .toStrictEqual([{ type:EITHER, left: sum, right: times }, minus]);
    });

    it('should resolve combine both either first degree', () => {
        expect(resolveOperator([combineBothEither]))
            .toStrictEqual([{type:EITHER, left: modulo, right: minus }, {type: EITHER, left: sum, right: times }]);
    });

    it('should resolve combine on second degree with either', () => {
        expect(resolveOperator([moduloOrMinusAndDivide]))
            .toStrictEqual([{ type: EITHER, left: modulo, right: minus }, divide, minus, modulo] );
    });

    it('should throw error when combine are inside either', () => {
        //TODO: Implements this
    });
});
