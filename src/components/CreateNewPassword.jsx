import { newPasswordValidation as validate } from "@/FormValidation/newPasswordValidation";
import { passwordResetProcess } from "@/reduxStates/PasswordResetSlice";
import { setModalComponent } from "@/reduxStates/modalComponentSlice";
import { toggleModalTo } from "@/reduxStates/modalSlice";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const passwordResetProcessValue = useSelector(
    (state) => state.passwordResetProcess.value
  );

  const [errorMessage, setErrorMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      password: "",
      cpassword: "",
    },
    validate,
    onSubmit: updatePassword,
  });

  async function updatePassword(values) {
    try {
      const response = await fetch("/api/update_password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: values.password,
          userEmail: passwordResetProcessValue.passwordResetUserEmail,
        }),
      });

      const data = await response.json();
      if (data.message !== "success") {
        setErrorMessage("Something went wrong! Try again later.");
        return;
      }

      dispatch(setModalComponent({ component: "success_verification" }));
      dispatch(
        passwordResetProcess({
          passwordResetUserEmail: "",
          passwordResetBoolean: false,
        })
      );
    } catch (err) {
      setErrorMessage("Something went wrong! Try again later.");
    }
  }

  return (
    <div className="main_form_container">
      <span
        onClick={() => {
          dispatch(toggleModalTo(false));
          dispatch(setModalComponent({ component: "add_photo" }));
        }}
        className="material-symbols-outlined close_icon"
      >
        close
      </span>
      <h2 className="form_heading">Create New Password</h2>
      <form onSubmit={formik.handleSubmit} className="main_form" method="POST">
        <div className="input_container">
          {formik.touched.password && formik.errors.password ? (
            <span className="error_message" style={{ left: "9.5em" }}>
              {formik.errors.password}
            </span>
          ) : null}
          <label className="form_labels" htmlFor="password">
            New Password
          </label>
          <input
            className="form_inputs"
            type="password"
            id="password"
            name="password"
            placeholder="************"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div className="input_container">
          {formik.touched.cpassword && formik.errors.cpassword ? (
            <span
              className="error_message cpassword_error_message"
              style={{ left: "14em" }}
            >
              {formik.errors.cpassword}
            </span>
          ) : null}
          <label className="form_labels" htmlFor="cpassword">
            Confirm New Password
          </label>
          <input
            className="form_inputs"
            type="password"
            id="cpassword"
            name="cpassword"
            placeholder="************"
            onChange={formik.handleChange}
            value={formik.values.cpassword}
          />
        </div>
        <div className="login_register_btn_container">
          {errorMessage !== "" ? (
            <span className="login_register_error_message">{errorMessage}</span>
          ) : null}
          <button type="submit" className="form_submit_btn">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}
