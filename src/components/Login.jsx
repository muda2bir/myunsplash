import { loginValidation as validate } from "@/FormValidation/loginValidation";
import { loginState } from "@/reduxStates/loginSlice";
import { setModalComponent } from "@/reduxStates/modalComponentSlice";
import { toggleModalTo } from "@/reduxStates/modalSlice";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: loginTheUser,
  });

  async function loginTheUser(values) {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    const data = await response.json();
    if (data.message !== "success") {
      dispatch(loginState(false));
      setErrorMessage(data.message);
      return;
    }
    dispatch(loginState(true));
    dispatch(setModalComponent({ component: "add_photo" }));
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
      <h2 className="form_heading">Login</h2>
      <form onSubmit={formik.handleSubmit} className="main_form">
        <div className="input_container">
          {formik.touched.email && formik.errors.email ? (
            <span className="error_message">{formik.errors.email}</span>
          ) : null}
          <label className="form_labels" htmlFor="email">
            Email
          </label>
          <input
            className="form_inputs"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
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
            placeholder="Create Password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <div className="login_register_btn_container">
          {errorMessage !== "" ? (
            <span className="login_register_error_message">{errorMessage}</span>
          ) : null}
          <button type="submit" className="form_submit_btn">
            Login
          </button>
        </div>
        <div className="footer_line_container">
          <span className="footer_line">
            New to MyUnsplash?{" "}
            <span
              className="login_component"
              onClick={() => {
                dispatch(setModalComponent({ component: "register" }));
              }}
            >
              Create Account
            </span>
          </span>

          <span className="footer_line forget_password">
            <span
              onClick={() =>
                dispatch(setModalComponent({ component: "enter_email" }))
              }
            >
              Forgot Password?
            </span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
