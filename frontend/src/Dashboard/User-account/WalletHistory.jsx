import React, { useState } from 'react'

const WalletHistory = ({walletData,refetch}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = walletData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center">
    {/* Navbar Component */}
    {/* Assuming there's a component named Navbar */}

    <div className="col-span-3 ">
      <section className="container" style={{ marginTop: "100px" }}>
        <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-slate-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sl.No
                </th>
                <th scope="col" className="px-6 py-3">
                  Transaction Type
                </th>

                <th scope="col" className="px-6 py-3">
                  Cancelled By
                </th>

                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Balance
                </th>
                <th scope="col" className="px-6 py-3">
                  Transaction Time
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems && currentItems.length ? (
                currentItems.map((data, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-[#e8e8ff]"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">
                      {data.transactionType}
                    </td>

                    <td className="px-6 py-4">{data.cancelledBy}</td>

                    <td className="px-6 py-4">{data.amount}</td>

                    <td className="px-6 py-4">
                      {data.currentWalletAmount}
                    </td>

                    <td className="px-6 py-4 text-blue-500">
                      {new Date(data.createdAt).toLocaleString()}
                    </td>
                    
                    
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b hover:bg-gray-100">
                  <td
                    colSpan={6} // Fix the colspan value to match the number of columns
                    className="px-6 py-4 font-medium text-center text-gray-900"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-center items-center">
              <button
                onClick={() => paginate(currentPage - 1)}
                className={`page-link ${
                  currentPage === 1 ? "disabled" : ""
                } mr-5`}
                disabled={currentPage === 1}
              >
                {"<<"}

              </button>
              <ul className="pagination flex space-x-2">
                {Array.from({
                  length: Math.ceil(walletData.length / itemsPerPage),
                }).map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      index + 1 === currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      onClick={() => paginate(index + 1)}
                      className="page-link"
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => paginate(currentPage + 1)}
                className={`page-link ${
                  currentPage ===
                  Math.ceil(walletData.length / itemsPerPage)
                    ? "disabled"
                    : ""
                } ml-5`}
                disabled={
                  currentPage ===
                  Math.ceil(walletData.length / itemsPerPage)
                }
              >
                {">>"}
              </button>
            </div>
            {/* Pagination end */}

        </div>
      </section>
    </div>
  </div>
  )
}

export default WalletHistory