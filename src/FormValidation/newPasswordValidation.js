export const newPasswordValidation = function (values) {
  const errors = {};
  //   Password Validation
  if (!values.password) {
    errors.password = "Password is Required";
  } else if (
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
      values.password
    )
  ) {
    errors.password =
      "Password must contain eight characters, at least one letter and one number! :(";
  }

  //   Confirm Password Validation
  if (!values.cpassword) {
    errors.cpassword = "Please Confirm your Password";
  } else if (values.cpassword != values.password) {
    errors.cpassword = "Password not matching :(";
  }

  return errors;
};
