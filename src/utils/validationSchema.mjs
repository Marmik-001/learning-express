export const userValidationBodySchema = {
  username: {
    notEmpty: {
      errorMessage: "username cannot be empty",
    },
    isString: {
      errorMessage: "username cannot be not a string",
    },
    isLength: {
      options: {
        min: 3,
        max: 10,
      },
      errorMessage: "username must be of 3-10 chars",
    },
  },
  name: {
    notEmpty: {
      errorMessage: "name cannot be empty",
    },
    isString: {
      errorMessage: "name cannot be not a string",
    },
    isLength: {
      options: {
        min: 3,
        max: 10,
      },
      errorMessage: "name must be of 3-10 chars",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "username cannot be empty",
    },
    isString: {
      errorMessage: "username cannot be not a string",
    },
    isLength: {
      options: {
        min: 3,
        max: 10,
      },
      errorMessage: "username must be of 3-10 chars",
    },
  },
};
