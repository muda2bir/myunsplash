import { EnterEmailValidation as validate } from "@/FormValidation/EnterEmailValidation";
import { passwordResetProcess } from "@/reduxStates/PasswordResetSlice";
import { setModalComponent } from "@/reduxStates/modalComponentSlice";
import { toggleModalTo } from "@/reduxStates/modalSlice";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function EnterEmail() {
  const [errorMessage, setErrorMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: validateEmail,
  });

  async function validateEmail(values) {
    const response = await fetch("/api/validate_email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
      }),
    });

    const data = await response.json();
    if (data.message !== "success") {
      setErrorMessage("Something went wrong! Please try again later.");
      return;
    }
    if (!data.userExists) {
      setErrorMessage("User does not Exists! Please Create an Account!");
      return;
    }
    dispatch(
      passwordResetProcess({
        passwordResetBoolean: true,
        passwordResetUserEmail: values.email,
      })
    );
    dispatch(setModalComponent({ component: "verify" }));
  }

  const dispatch = useDispatch();
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
      <h2 className="form_heading">Enter your Email</h2>
      <form onSubmit={formik.handleSubmit} className="main_form" method="POST">
        <div className="input_container">
          {formik.touched.email && formik.errors.email ? (
            <span className="error_message" style={{ left: "9.5em" }}>
              {formik.errors.email}
            </span>
          ) : null}
          <label className="form_labels" htmlFor="email">
            Enter Email
          </label>
          <input
            className="form_inputs"
            type="email"
            id="email"
            name="email"
            placeholder="example@mail.com"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div className="login_register_btn_container">
          {errorMessage !== "" ? (
            <span className="login_register_error_message">{errorMessage}</span>
          ) : null}
          <button type="submit" className="form_submit_btn">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
