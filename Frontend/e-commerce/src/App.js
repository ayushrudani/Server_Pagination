import { useEffect, useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Category from "./Components/Admin/Category";

import AdminLayout from "./Layouts/AdminLayout";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// set Routes And Layouts
function App() {
  return (
    <div>
      {/* create a porper layout for header and footer and set routes accroding to the user role if user is admin then show admin routes and if user is user then show user routes and all have seprate header and footer */}

      <Routes>
        {/* Public routes */}

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="category" element={<Category />} />
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        </Route>

        {/* Add more routes for each role as needed */}
      </Routes>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
