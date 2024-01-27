import React, { useState } from "react";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";

const AddExperience = ({ user }) => {
  console.log(user, "++++++++++++++++");
  const [experience, setExperience] = useState({
    organization: "",
    position: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExperience((prevExperience) => ({
      ...prevExperience,
      [name]: value,
    }));
  };

  const handleAddExperience = async () => {
    try {
      const res = await axiosInstance.put(
        `/specialist/addExperience/${user._id}`,
        experience
      );

      const result = res.data;

      setExperience({
        organization: "",
        position: "",
        startDate: "",
        endDate: "",
      });

      toast.success(result.message);
      navigate("/specialist/profile");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async()=>{
    try {
      
    } catch (error) {
      
    }
  }

  return (
    <div className="mb-5">
      <label className="text-headingColor font-bold text-[16px] leading-7">
        Experience:
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Organization"
          name="organization"
          value={experience.organization}
          onChange={handleInputChange}
          className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
        />
        <input
          type="text"
          placeholder="Position"
          name="position"
          value={experience.position}
          onChange={handleInputChange}
          className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
        />
        <input
          type="date"
          placeholder="Start Date"
          name="startDate"
          value={experience.startDate}
          onChange={handleInputChange}
          className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
        />
        <input
          type="date"
          placeholder="End Date"
          name="endDate"
          value={experience.endDate}
          onChange={handleInputChange}
          className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
        />
        <button
          onClick={handleAddExperience}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add
        </button>
      </div>

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
                      Organization
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Start Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      End Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user && user.experiences.length ? (
                    user.experiences.map((experience, index) => (
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
                        <td className="px-6 py-4">{experience.organization}</td>
                        <td className="px-6 py-4">{experience.position}</td>
                        <td className="px-6 py-4">{experience.startDate}</td>
                        <td className="px-6 py-4">{experience.endDate}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(index)} 
                            className="px-4 py-2 font-semibold text-white bg-red-500 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-white hover:border-transparent"
                          >
                            Delete
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
                        No experiences found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddExperience;
