
import {isAlphaNumericExtended, isEmail, isFrenchPostalCode, isIncludedIn, isPrice, isUuid} from "./built-in";

describe("isUuid Function", () => {
    it("Should succeed when value is uuid", () => {
        expect(isUuid('euifw32p-ekk3-qacx-eqor-fhjkalksjdiw')).toBe(true);
    });

    it("Should failed when value is not uuid", () => {
        expect(isUuid('not uuid')).toBe(false);
    });
})

describe("isEmail Function", () => {
    it("Should succeed when value is email", () => {
        expect(isEmail('leroy.alexandre@turtleside.io')).toBe(true);
    });

    it("Should failed when value is not email", () => {
        expect(isEmail('leroy.alexandre@turtleside')).toBe(false);
    });
})

describe("isFrenchPostalCode Function", () => {
    it("Should succeed when value is french postal code", () => {
        expect(isFrenchPostalCode('25000')).toBe(true);
    });

    it("Should failed when value is not french postal code", () => {
        expect(isFrenchPostalCode('3455')).toBe(false);
    });
})

describe("isPrice Function", () => {
    it("Should succeed when value is price", () => {
        expect(isPrice('19,09')).toBe(true);
    });

    it("Should failed when value is not price", () => {
        expect(isPrice('100')).toBe(false);
    });
})

describe("isIncludedIn Function", () => {
    const status = ['OK', 'NOK'];

    it("Should succeed when value is included array given", () => {
        expect(isIncludedIn(status)('OK')).toBe(true);
    });

    it("Should failed when value is not included in array given", () => {
        expect(isIncludedIn(status)('JOHNNY')).toBe(false);
    });
})

describe("isAlphaNumericExtended Function", () => {
    const status = ['OK', 'NOK'];

    it("Should succeed when value is included array given", () => {
        expect(isAlphaNumericExtended('Besançon')).toBe(true);
    });

    it("Should failed when value is not included in array given", () => {
        expect(isAlphaNumericExtended('WHAT?THEH3LL!_#')).toBe(false);
    });
})