export const deleteValidation = function (values) {
  const errors = {};

  if (!values.password) {
    errors.password = "Password is Required!";
  }
  return errors;
};
