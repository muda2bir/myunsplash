export const addPhotoValidation = function (values) {
  const errors = {};

  // label Validation
  if (!values.label) {
    errors.label = "Label is Required";
  }
  //   photo_url Validation
  if (!values.photo_url) {
    errors.photo_url = "Photo URL is Required";
  } else if (!values.photo_url.includes("images.unsplash.com")) {
    errors.photo_url = "Only Unsplash Image are accepted!";
  }
  return errors;
};
