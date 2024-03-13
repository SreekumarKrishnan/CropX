import React, { useContext, useState } from "react";
import { formateDate } from "../../utils/formateDate";
import axiosInstance from "../../axiosConfig"
import { toast } from "react-toastify";
import io from "socket.io-client"
import { authContext } from "../../context/AuthContext";

const socket = io("https://cropx.sreekumarkrishnan.live")


const MyBookings = ({ bookingData, refetch }) => {

  const { user, role, token, dispatch } = useContext(authContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const cancelBooking = async(id, userId, specialistId) => {
    
    try {
      const res = await axiosInstance.patch(
        `booking/cancelBooking/${id}/${userId}`
      )

      const data ={
        specialistId : specialistId,
        message : `${user.fname} ${user.lname } cancelled appointment`
      }

      const notiResponse = await axiosInstance.post(
        "/notification/create",
        data
      )


      const result = res.data
      toast.success(result.message)
    } catch (error) {
      toast.error(error.response.data.message);
    }
    refetch()
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookingData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  socket.emit("user-cancel")

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
                    Appointment Date
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Specialist Name
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Appointment Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cancelled By
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
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
                        {formateDate(data.appointmentDate.split("T")[0])}
                      </td>

                      <td className="px-6 py-4">{`${data.specialist.fname} ${data.specialist.lname}`}</td>

                      <td className="px-6 py-4">{data.appointmentTime}</td>

                      <td
                        className={`px-6 py-4 ${
                          data.status === "Scheduled" && "text-blue-500"
                        } ${data.status === "Completed" && "text-green-500"} ${
                          data.status === "Cancelled" && "text-red-500"
                        }`}
                      >
                        {data.status}
                      </td>

                      <td className="px-6 py-4 text-blue-500">
                        {data.isCancelledBy}
                      </td>
                      
                      <td className="px-6 py-4">
                        <button
                          onClick={() => cancelBooking(data._id, data.user._id, data.specialist._id, index)}
                          className="px-4 py-2 font-semibold text-white bg-red-500 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-white hover:border-transparent"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b hover:bg-gray-100">
                    <td
                      colSpan={6} // Fix the colspan value to match the number of columns
                      className="px-6 py-4 font-medium text-center text-gray-900"
                    >
                      No Appontments found
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
                  length: Math.ceil(bookingData.length / itemsPerPage),
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
                  Math.ceil(bookingData.length / itemsPerPage)
                    ? "disabled"
                    : ""
                } ml-5`}
                disabled={
                  currentPage ===
                  Math.ceil(bookingData.length / itemsPerPage)
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
  );
};

export default MyBookings;
