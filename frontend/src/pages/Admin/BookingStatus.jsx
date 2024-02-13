import React, { useState } from 'react'
import { formateDate } from '../../utils/formateDate'


const BookingStatus = ({ bookings, specialistRefetch }) => {
    const [paymentStatus , setPaymentStatus] = useState("Unpaid")
  return (
    <div className="flex flex-col items-center">
    {/* Navbar Component */}
    {/* Assuming there's a component named Navbar */}

    
      <div className="col-span-3 ">
        <section className="container">
          <div className="relative mx-5 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-slate-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sl.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Farmer Name
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Specialist Name
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Appointment Date
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Appointment Time
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Fee
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Fee Status
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Session Status
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Cancelled By
                  </th>
                  
                 
                  
                </tr>
              </thead>
              <tbody>
                {bookings && bookings.length > 0 ? (
                  bookings.map((data, index) => (
                    <tr
                      className="bg-white border-b hover:bg-[#e8e8ff]"
                      key={data._id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{`${data.user.fname} ${data.user.lname}`}</td>

                      <td className="px-6 py-4">{`${data.specialist.fname} ${data.specialist.lname}`}</td>

                      <td className="px-6 py-4">{formateDate(data.appointmentDate.split("T")[0])}</td>

                      <td className="px-6 py-4">{data.appointmentTime}</td>

                      <td className="px-6 py-4">{data.specialist.fee}</td>

                      <td
                        className={`px-6 py-4 ${
                          data.isPaid === true && "text-green-500"
                        }`}
                      >
                        {data.isPaid ? "Paid" : "Unpaid"}
                      </td>

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
                      
                      
                      
                      
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b hover:bg-gray-100">
                    <td
                      colSpan={5}
                      className="px-6 py-4 font-medium text-center text-gray-900"
                    >
                      No users Found
                    </td>
                  </tr>
                )}
              </tbody>

              
            </table>
          </div>
        </section>
      </div>
  </div>
  )
}

export default BookingStatus