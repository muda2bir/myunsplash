import { toggleModalTo } from "@/reduxStates/modalSlice";
import { searchQuery } from "@/reduxStates/searchSlice";
import Image from "next/image";
import Link from "next/link";
import { Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../public/assets/my_unsplash_logo.svg";
import styles from "../styles/Navbar.module.css";
import AddPhoto from "./AddPhoto";
import Loader from "./Loader";
import Modal from "./Modal";
import SearchBar from "./SearchBar";
import Verify from "./Verify";
const CreateNewPassword = lazy(() => import("./CreateNewPassword"));
const SuccessVerification = lazy(() => import("./SuccessVerification"));
const DeletePhoto = lazy(() => import("./DeletePhoto"));
const Register = lazy(() => import("./Register"));
const Login = lazy(() => import("./Login"));
const EnterEmail = lazy(() => import("./EnterEmail"));

function Navbar() {
  const modalState = useSelector((state) => state.modal.value);
  const modalComponentState = useSelector(
    (state) => state.modalComponent.value
  );
  const dispatch = useDispatch();

  let MainModal;
  if (modalComponentState.component === "register") {
    MainModal = <Register />;
  } else if (modalComponentState.component === "login") {
    MainModal = <Login />;
  } else if (modalComponentState.component === "add_photo") {
    MainModal = <AddPhoto />;
  } else if (modalComponentState.component === "loading") {
    MainModal = <Loader />;
  } else if (modalComponentState.component === "verify") {
    MainModal = <Verify />;
  } else if (modalComponentState.component === "success_verification") {
    MainModal = <SuccessVerification />;
  } else if (modalComponentState.component === "delete_photo") {
    MainModal = <DeletePhoto />;
  } else if (modalComponentState.component === "create_new_password") {
    MainModal = <CreateNewPassword />;
  } else if (modalComponentState.component === "enter_email") {
    MainModal = <EnterEmail />;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo_search_bar_container}>
        <Link href="/">
          <Image
            src={logo}
            alt="My Unsplash"
            width={138}
            height={26}
            onClick={() => dispatch(searchQuery(""))}
            className={styles.logo}
          />
        </Link>
        <SearchBar />
      </div>

      <button
        className={styles.add_photo_btn}
        onClick={() => dispatch(toggleModalTo(true))}
      >
        Add a photo
      </button>
      <button
        className={styles.add_mobile_btn}
        onClick={() => dispatch(toggleModalTo(true))}
      >
        <span className="material-symbols-outlined">add</span>
      </button>
      {modalState && (
        <Modal>
          <Suspense fallback={<Loader />}>{MainModal}</Suspense>
        </Modal>
      )}
    </nav>
  );
}

export default Navbar;
