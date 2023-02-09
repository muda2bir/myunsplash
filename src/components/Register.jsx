import { registerValidation as validate } from "@/FormValidation/registerValidation";
import { loginState } from "@/reduxStates/loginSlice";
import { setModalComponent } from "@/reduxStates/modalComponentSlice";
import { toggleModalTo } from "@/reduxStates/modalSlice";
import { currentUser } from "@/reduxStates/userSlice";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const currentUserValue = useSelector((state) => state.currentUser.value);
  const login = useSelector((state) => state.loginState.value);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate,
    onSubmit: doTheRegistration,
  });

  async function doTheRegistration(values) {
    const response = await fetch("/api/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
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
    dispatch(
      currentUser({
        ...currentUserValue,
        name: data.theUser.name,
        email: data.theUser.email,
      })
    );
    dispatch(loginState(true));
    dispatch(setModalComponent({ component: "verify" }));
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
      <h2 className="form_heading">Create Account</h2>
      <form onSubmit={formik.handleSubmit} className="main_form">
        <div className="input_container">
          {formik.touched.name && formik.errors.name ? (
            <span className="error_message">{formik.errors.name}</span>
          ) : null}
          <label className="form_labels" htmlFor="name">
            Full Name
          </label>
          <input
            className="form_inputs"
            type="text"
            id="name"
            name="name"
            placeholder="Rakesh Kumar"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
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
        <div className="input_container">
          {formik.touched.cpassword && formik.errors.cpassword ? (
            <span className="error_message cpassword_error_message">
              {formik.errors.cpassword}
            </span>
          ) : null}
          <label className="form_labels" htmlFor="cpassword">
            Confirm Password
          </label>
          <input
            className="form_inputs"
            type="password"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            value={formik.values.cpassword}
          />
        </div>
        <div className="login_register_btn_container">
          {errorMessage !== "" ? (
            <span className="login_register_error_message">{errorMessage}</span>
          ) : null}
          <button type="submit" className="form_submit_btn">
            Register
          </button>
        </div>
        <span className="footer_line">
          Already have an account?{" "}
          <span
            className="login_component"
            onClick={() => {
              dispatch(setModalComponent({ component: "login" }));
            }}
          >
            Login
          </span>
        </span>
      </form>
    </div>
  );
};

export default Register;
