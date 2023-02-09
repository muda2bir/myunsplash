import { useClickOutside } from "@/hooks/useClickOutside";
import { setModalComponent } from "@/reduxStates/modalComponentSlice";
import { toggleModalTo } from "@/reduxStates/modalSlice";
import { useDispatch } from "react-redux";
import styles from "../styles/Modal.module.css";

function Modal({ children }) {
  const dispatch = useDispatch();

  // Closing the modal when clicking outside
  const modalRef = useClickOutside(() => {
    dispatch(toggleModalTo(false));
    dispatch(setModalComponent({ component: "add_photo" }));
  });

  return (
    <div className={styles.modal_background}>
      <div className={styles.modal_container} ref={modalRef}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
