import { setModalComponent } from "@/reduxStates/modalComponentSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Verify() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.value);
  const passwordResetProcess = useSelector(
    (state) => state.passwordResetProcess.value
  );
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [pin3, setPin3] = useState("");
  const [pin4, setPin4] = useState("");
  const [otpGenerated, setOtpGenerated] = useState(generateOTP());
  const [timer, setTimer] = useState(59);
  const [errorMessage, setErrorMessage] = useState("");

  function arrangeAllPins() {
    return `${pin1}${pin2}${pin3}${pin4}`;
  }

  function generateOTP() {
    let string = "0123456789";
    let OTP = "";
    let len = string.length;
    for (let i = 0; i < 4; i++) {
      OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
  }

  async function verifyUser() {
    try {
      const response = await fetch("/api/verify_mail", {
        method: "PATCH",
        body: JSON.stringify({
          _id: currentUser.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.message !== "success") {
        return;
      }
      dispatch(setModalComponent({ component: "success_verification" }));
    } catch (error) {
      console.log(error);
    }
  }

  async function verifyOTP(e) {
    e.preventDefault();
    if (otpGenerated !== arrangeAllPins()) {
      setErrorMessage("Wrong OTP entered!");
      return;
    }
    if (passwordResetProcess.passwordResetBoolean) {
      dispatch(setModalComponent({ component: "create_new_password" }));
    } else {
      verifyUser(); // verifying user in database
    }
  }

  async function sendOtp(body) {
    try {
      const response = await fetch("/api/send_mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (data.message !== "success") {
        setErrorMessage(data.message);
        console.log(data.error);
        return;
      }
      return;
    } catch (error) {
      setErrorMessage("Oops! Something went wrong! Try again later.");
      console.log();
      return;
    }
  }

  useEffect(() => {
    let jsonBody = !passwordResetProcess.passwordResetBoolean
      ? {
          username: currentUser.name,
          otp: otpGenerated,
          userEmail: currentUser.email,
          passwordResetBoolean: passwordResetProcess.passwordResetBoolean,
        }
      : {
          passwordResetUserEmail: passwordResetProcess.passwordResetUserEmail,
          passwordResetBoolean: passwordResetProcess.passwordResetBoolean,
          otp: otpGenerated,
        };

    sendOtp(jsonBody);

    let timerInterval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [otpGenerated]);

  return (
    <div className="main_form_container">
      <h2 className="form_heading verify_heading">Verify Email</h2>
      <div className="header_container">
        <h4 className="form_sub_heading">
          Enter the OTP received on your Email
        </h4>
        {errorMessage !== "" ? (
          <span className="login_register_error_message">{errorMessage}</span>
        ) : null}
      </div>
      <form className="main_form" onSubmit={verifyOTP}>
        <div className="otp_field_container">
          <input
            type="text"
            name="otp"
            className="otp_field"
            maxLength="1"
            value={pin1}
            onChange={(e) => {
              setPin1(e.target.value);
            }}
            autoFocus
          />
          <input
            type="text"
            name="otp"
            className="otp_field"
            maxLength="1"
            value={pin2}
            onChange={(e) => {
              setPin2(e.target.value);
            }}
          />
          <input
            type="text"
            name="otp"
            className="otp_field"
            maxLength="1"
            value={pin3}
            onChange={(e) => {
              setPin3(e.target.value);
            }}
          />
          <input
            type="text"
            name="otp"
            className="otp_field"
            maxLength="1"
            value={pin4}
            onChange={(e) => {
              setPin4(e.target.value);
            }}
          />
        </div>
        <div className="footer_container">
          <span className="footer_line">
            {/* Didn&apos;t get the mail? <span>Resend</span> */}
            {!(timer < 0) ? (
              `Resend OTP in 00:${timer < 10 ? "0" + timer : timer}`
            ) : (
              <>
                Didn&apos;t get the mail?{" "}
                <span
                  onClick={() => {
                    setOtpGenerated(generateOTP());
                  }}
                >
                  Resend
                </span>
              </>
            )}
          </span>
          <div className="btn_container">
            <button
              className="cancel_btn"
              type="button"
              onClick={() => {
                setPin1("");
                setPin2("");
                setPin3("");
                setPin4("");
              }}
            >
              Clear
            </button>
            <button type="submit" className="form_submit_btn">
              Verify
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Verify;
