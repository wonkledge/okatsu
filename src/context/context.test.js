import {useContext} from "./context";

describe('useContext function', () => {
    const [context, setContext] = useContext();

    it('should return object context', () => {
        expect(context.stash).toStrictEqual({});
        expect(context.fromStash).toBeInstanceOf(Function);
    });

    it('should return setter ', () => {
        expect(setContext).toBeInstanceOf(Function);
    })

    it('should update context object when setContext is called', () => {
        const fetchName = () => setContext(true)('fetchName')( 'gigi');
        const giveName = (context) => () => { return context.fromStash(fetchName)};

        fetchName()

        expect(giveName(context)()).toBe('gigi');
    });

    it('should return undefined when try to access to wrong stash property', () => {
        const fetchName = () => setContext(true)('fetchName')( 'gigi');
        const giveName = (context) => () => { return context.fromStash('wrongMethod')};

        fetchName()

        expect(giveName(context)()).toBe(undefined);
    });
})
