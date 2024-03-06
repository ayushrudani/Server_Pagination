import React from "react";

const RowFunction = () => {
  let rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push(
      <tr>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm ">
            <div class="h-4 bg-gray-300 animate-pulse rounded-lg w-full"></div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm ">
            <div class="h-4 bg-gray-300 animate-pulse rounded-lg w-full"></div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm ">
            <div class="h-4 bg-gray-300 animate-pulse rounded-lg w-full"></div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm ">
            <div class="h-4 bg-gray-300 animate-pulse rounded-lg w-full"></div>
          </div>
        </td>
      </tr>
    );
  }
  return rows;
};

// table skeleton with 4 columna and 5 rows
const TableSkeleton = () => {
  return (
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
                    <div class="h-6 bg-gray-300 animate-pulse rounded-lg w-full"></div>
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-bold  uppercase "
                  >
                    <div class="h-6 bg-gray-300 animate-pulse rounded-lg w-full"></div>
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-bold  uppercase w-[50%]"
                  >
                    <div class="h-6 bg-gray-300 animate-pulse rounded-lg w-full"></div>
                  </th>

                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-bold  uppercase"
                  >
                    <div class="h-6 bg-gray-300 animate-pulse rounded-lg w-full"></div>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y  divide-gray-700">{RowFunction()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;
