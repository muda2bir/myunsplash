import { useClickOutside } from "@/hooks/useClickOutside";
import { reRender } from "@/reduxStates/reRenderSlice";
import { searchQuery } from "@/reduxStates/searchSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.loginState.value);
  const currentUser = useSelector((state) => state.currentUser.value);
  const reRenderValue = useSelector((state) => state.reRender.value);
  const [labelList, setLabelList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  async function getLabels() {
    try {
      if (!loginState) {
        const response = await fetch("/api/get_labels", {
          method: "GET",
        });

        const data = await response.json();
        if (data.message !== "success") {
          console.log("Unsuccessfully data fetched for search bar.");
          return;
        }
        setLabelList(data.labelList);
        return;
      }

      const response = await fetch("/api/get_user_labels", {
        method: "POST",
        body: JSON.stringify({
          id: currentUser.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.message !== "success") {
        console.log("Unsuccessfully data fetched for search bar.");
        return;
      }
      setLabelList(data.labelList);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getLabels();
  }, [loginState, reRenderValue]);

  function handleFilter(event) {
    const searchKeyword = event.target.value;
    let newFilter;
    if (!loginState) {
      newFilter = labelList.filter((value) => {
        return value.label.toLowerCase().includes(searchKeyword.toLowerCase());
      });
    } else {
      newFilter = labelList.images.filter((value) => {
        return value.label.toLowerCase().includes(searchKeyword.toLowerCase());
      });
    }

    if (searchKeyword === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }

  const dataResultRef = useClickOutside(() => {
    setFilteredData([]);
  });

  return (
    <>
      <div className="search_bar_container">
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="Search by name"
          onChange={handleFilter}
        />
        {filteredData.length != 0 && (
          <div className="data_result" ref={dataResultRef}>
            {filteredData.slice(0, 15).map((label) => {
              return (
                <p
                  className="search_label"
                  key={label._id}
                  onClick={() => {
                    dispatch(searchQuery(label.label));
                    dispatch(reRender(reRenderValue + 1));
                  }}
                >
                  {label.label}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
