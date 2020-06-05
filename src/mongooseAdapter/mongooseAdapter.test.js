import {COMBINE, EITHER} from "../operator/operator";
import {query} from "./mongooseAdapter";

describe('query function', () => {
    const fetchDb = (req) => ({ data: 'Some data' })
    it('should return combine',() => {
        expect(query(fetchDb).type).toBe(COMBINE);
    });

    it('should return either as first combination', () => {
        expect(query(fetchDb).combination[0].type).toBe(EITHER);
        expect(query(fetchDb).combination[0].left).toBeInstanceOf(Function);
        expect(query(fetchDb).combination[0].right).toBeInstanceOf(Function);
    })

    it('should return callback as second combination', () => {
        expect(query(fetchDb).combination[1]).toBe(fetchDb);
    });
});