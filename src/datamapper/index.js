import { resolved } from "../promise";

const mapFields = (mapping) => (data) => {
  const dataMapped = data.map((entry) => {
    const fields = Object.keys(entry);

    return fields.reduce((entryMapped, field) => {
      const [mapper] = mapping.filter((item) => item.source === field);

      if (mapper === undefined) {
        return { ...entryMapped, [field]: entry[field] };
      }

      if (mapper.transform !== undefined)
        return {
          ...entryMapped,
          [mapper.target]: mapper.transform(entry[field], entry),
        };

      return { ...entryMapped, [mapper.target]: entry[field] };
    }, {});
  });

  return resolved(dataMapped);
};

export default mapFields;
