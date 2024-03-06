import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { IconButton, Typography } from "@material-tailwind/react";
import React from "react";

function Pagination({
  pageSize,
  paginate,
  handlePageSize,
  currentPage,
  totalPages,
}) {
  return (
    // select page size dropdown
    <>
      <div className="flex mt-10 justify-between">
        <div className="flex items-center gap-4">
          <Typography color="gray" className="font-normal">
            Show
          </Typography>
          <select
            className="border border-gray-300 rounded-md p-1"
            value={pageSize}
            onChange={(e) => handlePageSize(e.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <Typography color="gray" className="font-normal">
            Category
          </Typography>
        </div>

        <div className="flex items-center gap-8">
          {/* Previous Button with border */}
          <button
            className="border border-gray-300 rounded-md p-1"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </button>

          {/* Current Page Numbers */}
          <Typography color="gray" className="font-normal">
            Page <strong className="text-gray-900">{currentPage}</strong> of{" "}
            <strong className="text-gray-900">{totalPages}</strong>
          </Typography>

          {/* Next Button */}

          <button
            className="border border-gray-300 rounded-md p-1"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Pagination;
