import { addPhotoValidation } from "@/FormValidation/addPhotoValidation";
import { setModalComponent } from "@/reduxStates/modalComponentSlice";
import { toggleModalTo } from "@/reduxStates/modalSlice";
import { reRender } from "@/reduxStates/reRenderSlice";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddPhoto = () => {
  const loggedInUser = useSelector((state) => state.currentUser.value);
  const loginState = useSelector((state) => state.loginState.value);
  const reRenderValue = useSelector((state) => state.reRender.value);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      label: "",
      photo_url: "",
    },
    validate: addPhotoValidation,
    onSubmit: addTheImage,
  });

  async function addTheImage(values) {
    if (loginState === false) {
      dispatch(setModalComponent({ component: "login" }));
      return;
    }

    const response = await fetch("/api/add_photo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedInUser.id,
        label: values.label,
        link: values.photo_url,
      }),
    });

    const data = await response.json();
    if (data.message !== "success") {
      setErrorMessage(data.message);
      return;
    }
    dispatch(setModalComponent({ component: "loading" }));
    dispatch(reRender(reRenderValue + 1));
    setTimeout(() => {
      dispatch(toggleModalTo(false));
      dispatch(setModalComponent({ component: "add_photo" }));
    }, 1000);
  }

  return (
    <div className="main_form_container">
      <h2 className="form_heading">Add a new photo</h2>
      <form className="main_form" onSubmit={formik.handleSubmit}>
        <div className="input_container">
          {formik.touched.label && formik.errors.label ? (
            <span className="error_message">{formik.errors.label}</span>
          ) : null}
          <label className="form_labels" htmlFor="label">
            Label
          </label>
          <input
            className="form_inputs"
            type="text"
            id="label"
            name="label"
            placeholder="Suspendisse elit massa"
            value={formik.values.label}
            onChange={formik.handleChange}
          />
        </div>
        <div className="input_container">
          {formik.touched.photo_url && formik.errors.photo_url ? (
            <span className="error_message">{formik.errors.photo_url}</span>
          ) : null}
          <label className="form_labels" htmlFor="photo_url">
            Photo URL
          </label>
          <input
            className="form_inputs"
            type="text"
            id="photo_url"
            name="photo_url"
            placeholder="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid....."
            value={formik.values.photo_url}
            onChange={formik.handleChange}
          />
        </div>
        <div className="login_register_btn_container">
          {errorMessage !== "" ? (
            <span className="login_register_error_message">{errorMessage}</span>
          ) : null}
          <div className="btn_container">
            <button
              className="cancel_btn"
              onClick={() => dispatch(toggleModalTo(false))}
            >
              Cancel
            </button>
            <button type="submit" className="form_submit_btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPhoto;
