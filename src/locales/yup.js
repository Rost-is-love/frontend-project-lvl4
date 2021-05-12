export default {
  string: {
    min: 'usernameLength',
    max: 'usernameLength',
  },
  mixed: {
    notOneOf: 'mustBeUnique',
    oneOf: 'matchingPasswords',
    required: 'required',
  },
};
