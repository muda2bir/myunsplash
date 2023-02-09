import { setModalComponent } from "@/reduxStates/modalComponentSlice";
import { toggleModalTo } from "@/reduxStates/modalSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Masonry.module.css";

function Masonry() {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginState.value);
  const currentUser = useSelector((state) => state.currentUser.value);
  const reRenderValue = useSelector((state) => state.reRender.value);
  const searchQuery = useSelector((state) => state.searchQuery.value);
  const [allImages, setAllImages] = useState([]);

  async function fetchAllImages() {
    const response = await fetch("/api/fetch_all_images");
    const data = await response.json();
    const allImagesInReverse = data.reverse();
    const imageArr = imagesFilterMachine(allImagesInReverse);
    setAllImages(imageArr);
  }

  function imagesFilterMachine(allImageArray) {
    let newFilter = allImageArray.filter((value) => {
      return value.label.toLowerCase().includes(searchQuery.toLowerCase());
    });
    return newFilter;
  }

  useEffect(() => {
    if (!loginState) {
      try {
        fetchAllImages();
        return;
      } catch (err) {
        console.log("Something went wrong!!");
        return;
      }
    }

    // When the user is logged In
    try {
      (async function fetchUserImages() {
        const response = await fetch("/api/fetch_user_images", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currentUser.id,
          }),
        });

        const data = await response.json();
        if (data.message !== "success") {
          return;
        }
        const allImagesInReverse = data.userImages["images"].reverse();
        const imageArr = imagesFilterMachine(allImagesInReverse);
        setAllImages(imageArr);
      })();
      return;
    } catch (err) {
      console.log("Something went wrong!");
      return;
    }
  }, [currentUser, reRenderValue, searchQuery]);

  let imageOverlayStyle = {};

  return (
    <>
      <main className={styles.masonry_container}>
        {allImages.length > 0 ? (
          allImages.map((image) => {
            return (
              <div
                className={styles.image_wrapper}
                key={image._id}
                onClick={() =>
                  (imageOverlayStyle = {
                    display: "flex",
                  })
                }
              >
                <Image
                  src={image.link}
                  alt={image.label}
                  height={300}
                  width={350}
                />
                <div className={styles.image_overlay} style={imageOverlayStyle}>
                  <button
                    onClick={() => {
                      if (!loginState) {
                        dispatch(setModalComponent({ component: "login" }));
                        dispatch(toggleModalTo(true));
                        return;
                      }
                      dispatch(
                        setModalComponent({
                          component: "delete_photo",
                          otherParams: { imageId: image._id },
                        })
                      );
                      dispatch(toggleModalTo(true));
                    }}
                  >
                    delete
                  </button>
                  <h4 className={styles.image_label}>{image.label}</h4>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.empty_masonry_container}>
            <h2>No Photos Added!</h2>
            <button
              className="form_submit_btn"
              onClick={() => {
                dispatch(setModalComponent({ component: "add_photo" }));
                dispatch(toggleModalTo(true));
              }}
            >
              Add a photo
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default Masonry;
