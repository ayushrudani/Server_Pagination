import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const RightASide = () => {
  // error object
  const [errors, setErrors] = useState({
    categoryName: "",
  });

  // vaidaion for category
  const validateValues = (inputValues) => {
    if (!inputValues.categoryName) {
      setErrors({ categoryName: "Category Name is required" });
      return true;
    }
    if (inputValues.categoryName.length > 50) {
      setErrors({
        categoryName: "Category Name should be less than 50 characters",
      });
      return true;
    }
    return false;
  };
  // handle close
  const handleClose = () => {
    // translate-x-full add in class
    document.getElementById("rightAside").classList.remove("translate-x-0");
    document.getElementById("rightAside").classList.add("translate-x-full");
  };
  // handle save category
  const handleSaveCategory = () => {
    // if category id is 0 then add category else edit category
    const categoryID = parseInt(document.getElementById("categoryID").value);
    // create a object of category
    const category = {
      categoryID: categoryID,
      categoryName: document.getElementById("categoryName").value,
      description: document.getElementById("categoryDescription").value,
    };
    // validate category
    const errors = validateValues(category);
    if (errors) {
      return;
    }
    if (categoryID === 0) {
      // add category
      fetch("https://localhost:7299/Category/AddCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      })
        .then((response) => response.json())
        .then((data) => {
          toast.success("Record inserted", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          handleClose();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // edit category
      fetch("https://localhost:7299/Category/UpdateCategory", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === true) {
            toast.success("Record Updated", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            handleClose();
          } else {
            alert(data.message);
            return;
          }
          // close right aside
          handleClose();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      <div
        className="translate-x-full top-0 right-0 w-full bg-gray-600/50 text-black fixed h-full  ease-in-out duration-300 flex
        justify-end"
        id="rightAside"
        style={{ zIndex: 1000 }}
      >
        <div className="w-[20vw] bg-white p-5 pl-10">
          {/* Close Button */}

          <button
            onClick={handleClose}
            className="bg-red-500 text-white rounded-lg p-1 absolute top-2 right-2 focus:outline-none focus:ring-2 focus:ring-red-300 mb-4"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          {/* Add Category Form */}

          <form className="mt-12">
            {/* Pass CategoyID in Hidden field for edit */}

            <input type="hidden" name="categoryID" id="categoryID" />
            <div className="mb-4">
              <label htmlFor="categoryName" className="block text-sm mb-2">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                onFocus={() => setErrors({ categoryName: "" })}
                className={
                  "w-full border-2 border-gray-200 rounded-lg p-2" +
                  (errors.categoryName ? " border-red-500" : "")
                }
              />
              {errors.categoryName && ( // if errors.categoryName is true then show error message
                <p className="text-red-500 text-xs mt-1">
                  {errors.categoryName}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="categoryDescription"
                className="block text-sm mb-2"
              >
                Category Description
              </label>
              <textarea
                id="categoryDescription"
                name="categoryDescription"
                className="w-full border-2 border-gray-200 rounded-lg p-2"
                rows={10}
              ></textarea>
            </div>
            <div className="mb-4">
              <button
                type="button"
                className="w-full bg-blue-500 text-white rounded-lg p-2"
                onClick={handleSaveCategory}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default RightASide;
