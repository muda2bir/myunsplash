import { deleteValidation } from "@/FormValidation/deleteValidation";
import { setModalComponent } from "@/reduxStates/modalComponentSlice";
import { toggleModalTo } from "@/reduxStates/modalSlice";
import { reRender } from "@/reduxStates/reRenderSlice";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DeletePhoto = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.value);
  const reRenderValue = useSelector((state) => state.reRender.value);
  const imageId = useSelector(
    (state) => state.modalComponent.value.otherParams.imageId
  );
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: deleteValidation,
    onSubmit: deletePhoto,
  });

  async function deletePhoto(values) {
    try {
      const response = await fetch("/api/delete_photo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageId: imageId,
          userId: currentUser.id,
          password: values.password,
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
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="main_form_container">
      <h2 className="form_heading">Are you sure?</h2>
      <form className="main_form" onSubmit={formik.handleSubmit}>
        <div className="input_container">
          {formik.touched.password && formik.errors.password ? (
            <span className="error_message">{formik.errors.password}</span>
          ) : null}
          <label className="form_labels" htmlFor="password">
            Password
          </label>
          <input
            className="form_inputs"
            type="password"
            id="password"
            name="password"
            placeholder="**********************"
            value={formik.values.password}
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
              onClick={() => {
                dispatch(toggleModalTo(false));
                dispatch(setModalComponent({ component: "add_photo" }));
              }}
            >
              Cancel
            </button>
            <button type="submit" className="form_submit_btn delete_btn">
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeletePhoto;
