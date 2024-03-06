// AdminLayout.js
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";

import { AdminHeader } from "./AdminHeader";
import AdminASide from "./AdminASide";

const AdminLayout = () => {
  return (
    <div>
      {/* Admin-specific header */}
      <AdminHeader />
      {/* Admin Aside*/}
      <AdminASide />

      {/* Main content */}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
