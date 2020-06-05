import { mapFields } from "./datamapper";

describe('mapFields Function', () => {
    it('Should map fields', () => {
        const mapping = [
            {
                source: 'id',
                target: 'id_user'
            }
        ];
        const data = [{ id: 49 }];

        expect(mapFields(mapping)(data)).resolves.toStrictEqual([{ id_user: 49}]);
    });

    it('Should transform fields', () => {
        const mapping = [
            {
                source: 'id',
                target: 'id_user',
                transform: (value) => value > 40 ? 100 : value
            }
        ];
        const data = [{ id: 49 }];

        expect(mapFields(mapping)(data)).resolves.toStrictEqual([{ id_user: 100}]);
    });

    it('Should transform fields by condition on context data', () => {
        const mapping = [
            {
                source: 'id',
                target: 'id_user'
            },
            {
                source: 'status',
                target: 'status',
                transform: (value, data) => data.id === 49 ? 'god' : value
            }
        ];
        const data = [{ id: 49, status: 'employee' }];

        expect(mapFields(mapping)(data)).resolves.toStrictEqual([{ id_user: 49, status: 'god'}]);
    });

    it('Should works when data does not contains mapping fields', () => {
        const mapping = [
            {
                source: 'id',
                target: 'id_user'
            },
            {
                source: 'status',
                target: 'status',
            }
        ];
        const data = [{ name: 'anais' }];

        expect(mapFields(mapping)(data)).resolves.toStrictEqual([{ name: 'anais' }]);
    });
});