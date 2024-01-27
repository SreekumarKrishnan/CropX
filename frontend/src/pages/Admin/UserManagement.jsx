import React from "react";
import { BASE_URL } from "../../config";

import axiosInstance from '../../axiosConfig'


const UserManagement = ({ users, userRefetch }) => {

  const handleBlock = async(id)=>{
    try {
      await axiosInstance.put(`/admin/blockUser/${id}`)
      
    } catch (error) {
      console.error(error);
    }

    userRefetch()
  }

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
                      Name
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.length > 0 ? (
                    users.map((user, index) => (
                      <tr
                        className="bg-white border-b hover:bg-[#e8e8ff]"
                        key={user._id}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">{`${user.fname} ${user.lname}`}</td>

                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">
                          {user.is_Blocked ? (
                            <button
                              onClick={() => handleBlock(user._id)}
                              className="px-4 py-2 font-semibold text-white bg-green-500 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-white hover:border-transparent"
                            >
                              Unblock
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBlock(user._id)}
                              className="px-4 py-2 font-semibold text-white bg-red-500 border border-red-500 rounded hover:bg-red-800 hover:text-white hover:border-transparent"
                            >
                              Block
                            </button>
                          )}
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
  );
};

export default UserManagement;
