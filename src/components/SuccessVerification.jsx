import { setModalComponent } from "@/reduxStates/modalComponentSlice";
import { toggleModalTo } from "@/reduxStates/modalSlice";
import { useDispatch } from "react-redux";

const SuccessVerification = () => {
  const dispatch = useDispatch();

  return (
    <div className="main_form_container success_box_container">
      <span
        onClick={() => dispatch(toggleModalTo(false))}
        className="material-symbols-outlined close_icon"
      >
        close
      </span>
      <div className="success_box_main_child">
        <span className="material-symbols-outlined check_icon">
          check_circle
        </span>
        <h2 className="form_heading success_heading">Success!</h2>
      </div>

      <div className="login_register_btn_container success_btn_container">
        <button
          className="form_submit_btn close_btn_success"
          onClick={() => {
            dispatch(toggleModalTo(false));
            dispatch(setModalComponent({ component: "add_photo" }));
          }}
        >
          Close
        </button>
        <button
          className="form_submit_btn"
          onClick={() =>
            dispatch(setModalComponent({ component: "add_photo" }))
          }
        >
          Add a Photo
        </button>
      </div>
    </div>
  );
};

export default SuccessVerification;
