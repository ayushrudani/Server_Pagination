import React, { useEffect, useState } from "react";
import Pagination from "../../Pagination";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import RightASide from "./RightASide";
import { Bounce, toast } from "react-toastify";
import TableSkeleton from "../../Skeletons/TableSkeleton";
import axios from "axios";

// fetch data from api and display in table format and use pagination and search and add category button to add new category and actions to edit and delete category and put loader while fetching data and show error message if any error occurs with tostify use tailwind css for styling

function Category() {
  // set variable and state
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryID, setCategoryID] = useState(0);
  const [filter, setFilter] = useState({
    page: 1,
    pageSize: 10,
    totalPages: 0,
    search: "",
  });
  // for pagination object
  const [pagination, setPagination] = useState({
    totalRecords: 0,
    pageSize: 10,
    totalPages: 0,
    currentPage: 1,
  });

  // fecth data from api and send a pagenumber searchbar value in body use axios
  const fetchCategorys = () => {
    setError(null);
    fetch("https://localhost:7299/Category/GetAllCategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filter),
    })
      .then((response) => response.json())
      .then((data) => {
        setPagination(data.response);
        if (data.status === false) {
          setError(data);
          setLoading(false);
          return;
        }
        setCategorys(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
  // fetch data from api
  useEffect(() => {
    fetchCategorys();
  }, [filter]);

  // pagination function
  const paginate = (pageNumber) => {
    setFilter({ ...filter, page: pageNumber });
  };
  // pagination function for page size
  const handlePageSize = (pageSize) => {
    setFilter({ ...filter, pageSize: pageSize });
  };

  // handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  // handle search button
  const handleSearchBtn = () => {
    setFilter({ ...filter, search: search });
  };

  // handle delete
  const handleDelete = (id) => {
    // delete category by id in api
    fetch(`https://localhost:7299/Category/DeleteCategory?id=${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          toast.success("Record Deleted", {
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
        } else {
          alert(data.message);
          return;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // handle add category
  const handleAddCategory = () => {
    document.getElementById("rightAside").classList.remove("translate-x-full");
    document.getElementById("rightAside").classList.add("translate-x-0");
    document.getElementById("categoryName").value = "";
    document.getElementById("categoryDescription").value = "";
    document.getElementById("categoryID").value = 0;
  };

  // handle edit category
  const handleEditCategory = (id) => {
    document.getElementById("rightAside").classList.remove("translate-x-full");
    document.getElementById("rightAside").classList.add("translate-x-0");
    const category = categorys.find((category) => category.categoryID === id);
    // set category name and description
    // setCategoryID(category.categoryID);
    document.getElementById("categoryID").value = category.categoryID;
    document.getElementById("categoryName").value = category.categoryName;
    document.getElementById("categoryDescription").value = category.description;
  };

  return (
    <div>
      {/* Page Title */}
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-6">
        Category
      </h1>
      {/* Search and Add Category */}
      <div className="flex justify-between mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Category"
            className="border-2 border-gray-200 rounded-lg p-2 w-96"
            onChange={handleSearch}
          />
          {/** Search Icon heroicons*/}
          <button onClick={handleSearchBtn}>
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 absolute top-3 right-3" />
          </button>
        </div>

        {/*buttons*/}
        <div className="flex items-center">
          {/* Download Button */}
          <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Download
            <ArrowDownTrayIcon className="w-5 h-5 ms-2" />
          </button>
          {/* Add Category Button */}
          <button
            onClick={handleAddCategory}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Category
            <PlusIcon className="w-5 h-5 ms-2" />
          </button>
        </div>
      </div>
      {loading ? (
        // Loader
        <TableSkeleton />
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        // Table
        <div class="flex flex-col">
          <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
              <div class="border rounded-lg overflow-hidden dark:border-gray-700">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-xs font-bold  uppercase"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-xs font-bold  uppercase "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-xs font-bold  uppercase w-[50%]"
                      >
                        Description
                      </th>

                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-xs font-bold  uppercase"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y  divide-gray-700">
                    {categorys.map((category) => (
                      <tr key={category.categoryID}>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm ">{category.categoryID}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm ">{category.categoryName}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm ">
                            {category.description === ""
                              ? "Na/A"
                              : category.description.length > 70
                              ? category.description.substring(0, 70) + "..."
                              : category.description}
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div
                            class="flex items

                          -center space-x-2"
                          >
                            <button
                              onClick={() =>
                                handleEditCategory(category.categoryID)
                              }
                              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(category.categoryID)}
                              class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Pagination using next and prev and also pass current page number */}
      <Pagination
        pazgeSize={pagination.pageSize}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        pageSize={pagination.pageSize}
        paginate={paginate}
        handlePageSize={handlePageSize}
      />
      {/* Show a right Asides for add or edit record with close button*/}
      <RightASide />
    </div>
  );
}

export default Category;
