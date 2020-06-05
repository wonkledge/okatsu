/**
 *
 * {
 *     source: field's name of data to map
 *     target: field's name wanted
 *     transform: function to apply on field's value (optional)
 * }
 *
 **/

import {resolved} from "../promise/promise";

export const mapFields = mapping => data => {

    const dataMapped = data.map( entry => {
        let fields = Object.keys(entry);

        return fields.reduce( (entryMapped, field) => {
            let [mapper] = mapping.filter( mapper => mapper.source === field);

            if (mapper === undefined) {
                entryMapped[field] = entry[field];
                return entryMapped;
            }

            if (mapper.transform !== undefined)
                entryMapped[mapper.target] = mapper.transform(entry[field], entry);
            else
                entryMapped[mapper.target] = entry[field];

            return entryMapped;
        }, {});
    })

    return resolved(dataMapped);
};
