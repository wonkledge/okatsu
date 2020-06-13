import {checkParameters} from "./index";

describe("checkParameters Function", () => {
  it("Should succeed when all required parameters are provided", () => {
    const validators = [
      {
        field: "id",
        predicate: (value) => value.toString().match(/[0-9]+/),
        errorMessage: "id must satisfy [0-9]+",
        required: true,
      },
      {
        field: "address",
        predicate: (value) => value.toString().match(/[a-z]+/),
        errorMessage: "address must satisfy [a-z]+",
        required: true,
      },
      {
        field: "age",
        predicate: (value) => value.toString().match(/[0-9]+/),
        errorMessage: "age must satisfy [0-9]+",
        required: false,
      },
    ];
    const req = { id: 9, address: "mapplestreet" };

    expect(checkParameters(validators)(req)).resolves.toStrictEqual({
      id: 9,
      address: "mapplestreet",
    });
  });

  it("Should failed when all required parameters are not provided", () => {
    const validators = [
      {
        field: "id",
        predicate: (value) => value.toString().match(/[0-9]+/),
        errorMessage: "id must satisfy [0-9]+",
        required: true,
      },
      {
        field: "address",
        predicate: (value) => value.toString().match(/[a-z]+/),
        errorMessage: "address must satisfy [a-z]+",
        required: true,
      },
      {
        field: "age",
        predicate: (value) => value.toString().match(/[0-9]+/),
        errorMessage: "age must satisfy [0-9]+",
        required: false,
      },
    ];
    const req = { id: 9 };

    expect(checkParameters(validators)(req)).rejects.toStrictEqual({
      code: 400,
      payload: ["Missing required parameters address"],
    });
  });

  it("Should succeed when all required parameters have valid values", () => {
    const validators = [
      {
        field: "id",
        predicate: (value) => value.toString().match(/[0-9]+/),
        errorMessage: "id must satisfy [0-9]+",
        required: true,
      },
      {
        field: "address",
        predicate: (value) => value.toString().match(/[a-z]+/),
        errorMessage: "address must satisfy [a-z]+",
        required: true,
      },
    ];

    const req = { id: 4, address: "23 rue des etoiles" };

    expect(checkParameters(validators)(req)).resolves.toStrictEqual({
      id: 4,
      address: "23 rue des etoiles",
    });
  });

  it("Should failed when all required parameters have not valid values", () => {
    const validators = [
      {
        field: "id",
        predicate: (value) => value.toString().match(/[0-9]+/),
        errorMessage: "id must satisfy [0-9]+",
        required: true,
      },
      {
        field: "address",
        predicate: (value) => value.toString().match(/[a-z]+/),
        errorMessage: "address must satisfy [a-z]+",
        required: true,
      },
    ];

    const req = { id: "john", address: "23 rue des etoiles" };

    expect(checkParameters(validators)(req)).rejects.toStrictEqual({
      code: 400,
      payload: ["id must satisfy [0-9]+"],
    });
  });

  it("Should succeed when all optional parameters have valid values", () => {
    const validators = [
      {
        field: "id",
        predicate: (value) => value.toString().match(/[0-9]+/),
        errorMessage: "id must satisfy [0-9]+",
        required: false,
      },
      {
        field: "address",
        predicate: (value) => value.toString().match(/[a-z]+/),
        errorMessage: "address must satisfy [a-z]+",
        required: false,
      },
    ];

    const req = { id: 4 };

    expect(checkParameters(validators)(req)).resolves.toStrictEqual({ id: 4 });
  });

  it("Should failed when all optional parameters have not valid values", () => {
    const validators = [
      {
        field: "id",
        predicate: (value) => value.toString().match(/[0-9]+/),
        errorMessage: "id must satisfy [0-9]+",
        required: false,
      },
      {
        field: "address",
        predicate: (value) => value.toString().match(/[a-z]+/),
        errorMessage: "address must satisfy [a-z]+",
        required: false,
      },
    ];

    const req = { id: 4, address: 3 };

    expect(checkParameters(validators)(req)).rejects.toStrictEqual({
      code: 400,
      payload: ["address must satisfy [a-z]+"],
    });
  });

  it("Should discard all unwanted parameters", () => {
    const validators = [
      {
        field: "id",
        predicate: (value) => value.toString().match(/[0-9]+/),
        errorMessage: "id must satisfy [0-9]+",
        required: false,
      },
      {
        field: "address",
        predicate: (value) => value.toString().match(/[a-z]+/),
        errorMessage: "address must satisfy [a-z]+",
        required: false,
      },
    ];

    const req = { id: 4, address: "mapplestreet", age: 33 };

    expect(checkParameters(validators)(req)).resolves.toStrictEqual({
      id: 4,
      address: "mapplestreet",
    });
  });
});
