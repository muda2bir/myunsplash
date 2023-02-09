export const loginValidation = function (values) {
  const errors = {};

  // Email Validation
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email Address";
  }

  //   Password Validation
  if (!values.password) {
    errors.password = "Password is Required";
  }
  return errors;
};
