import React, { useEffect, useState } from "react";
import { formateDate } from "../../utils/formateDate";

const MyAppointments = ({ bookingData, refetch }) => {
  const [statusValue, setStatusValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const cancelBooking = (id) => {
    setStatusValue("Cancel");
    try {
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };
  const completeBooking = (id) => {
    setStatusValue("Complete");
    try {
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Navbar Component */}
      {/* Assuming there's a component named Navbar */}

      <div className="col-span-3">
        <section className="container" style={{ marginTop: "100px" }}>
          <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-slate-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sl.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Appointment Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Appointment Time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Session Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookingData && bookingData.length ? (
                  bookingData.map((data, index) => (
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
                      <td className="px-6 py-4">{`${data.user.fname} ${data.user.lname}`}</td>
                      <td className="px-6 py-4">
                        {formateDate(data.appointmentDate.split("T")[0])}
                      </td>
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
                      <td className="px-6 py-4">
                        <div className="flex relative">
                          <button
                            className={`${
                              showDropdown ? "text-blue-500" : "text-gray-500"
                            } mr-4`}
                            onClick={toggleDropdown}
                          >
                            select
                          </button>
                          {showDropdown && (
                            <div className="absolute bg-white border rounded shadow-lg mt-2">
                              <button
                                className={`${
                                  statusValue === "Cancel"
                                    ? "text-red-500"
                                    : "text-gray-500"
                                } block px-4 py-2`}
                                onClick={() => {
                                  cancelBooking(data.user._id);
                                  toggleDropdown();
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                className={`${
                                  statusValue === "Complete"
                                    ? "text-green-500"
                                    : "text-gray-500"
                                } block px-4 py-2`}
                                onClick={() => {
                                  completeBooking(data.user._id);
                                  toggleDropdown();
                                }}
                              >
                                Complete
                              </button>
                            </div>
                          )}
                        </div>
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyAppointments;
