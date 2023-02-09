export const registerValidation = function (values) {
  const errors = {};
  // Name Validation
  if (!values.name) {
    errors.name = "Name is Required";
  } else if (values.name.length > 30) {
    errors.name = "Full Name can't be longer than 30 characters :(";
  }

  // Email Validation
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email Address :(";
  }

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
