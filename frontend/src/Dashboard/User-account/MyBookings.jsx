import React from 'react'
import { formateDate } from '../../utils/formateDate'

const MyBookings = ({bookingData, refetch}) => {
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
                      Appointment Date
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Appointment Time
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
                        <td className="px-6 py-4">{formateDate(data.appointmentDate.split('T')[0])}</td>
                       
                        <td className="px-6 py-4">{data.appointmentTime}</td>
                       
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
  )
}

export default MyBookings