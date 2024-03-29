import React, { useState } from "react";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";
import { IoMdCloseCircle } from "react-icons/io";

const SpecializationManagement = ({
  specializations,
  specializationRefetch,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const icon = <IoMdCloseCircle />;

  const [validationError, setValidationError] = useState("");

  const validateForm = () => {
    const { name, description } = formData;

    if (!name || !description) {
      setValidationError(
        "Please fill all the fields for successful registration"
      );

      return false;
    }

    setValidationError(""); // Reset validation error if all validations pass
    return true; // All validations passed
  };

  const handleAddSpecialization = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const res = await axiosInstance.post(
        "/admin/addSpecialization",
        formData
      );
      const result = res.data;
      toast.success(result.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    specializationRefetch();
    setIsModalOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = specializations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSpecializations = specializations.filter(
    (specialization) =>
      specialization.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specialization.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset pagination when searching
  };

  return (
    <div className="flex flex-col items-center">
      <div className="col-span-3 ">
        <section className="container">
          <div className="flex justify-end mb-3">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-2 py-1 mb-5 border rounded mr-2"
            />
            <button
              className="px-4 py-2 mb-5 mr-5 font-semibold text-white bg-green-500 border border-red-500 rounded hover:bg-red-800 hover:text-white hover:border-transparent"
              onClick={() => setIsModalOpen(true)}
            >
              Add
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 max-w-md w-full rounded shadow-md">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    {icon}
                  </button>
                </div>
                <h2 className="text-2xl font-semibold mb-4">
                  Add Specialization
                </h2>
                <form onSubmit={handleAddSpecialization}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-gray-700"
                    >
                      Description:
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Add Specialization
                  </button>
                  {validationError && (
                    <p className="text-red-500">{validationError}</p>
                  )}
                </form>
              </div>
            </div>
          )}
          {!isModalOpen && (
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
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSpecializations && filteredSpecializations.length > 0 ? (
                    filteredSpecializations.map((specialization, index) => (
                      <tr
                        className="bg-white border-b hover:bg-[#e8e8ff]"
                        key={specialization._id}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4 w-1/4">
                          {specialization.name}
                        </td>
                        <td className="px-6 py-4">
                          {specialization.description}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="bg-white border-b hover:bg-gray-100">
                      <td
                        colSpan={5}
                        className="px-6 py-4 font-medium text-center text-gray-900"
                      >
                        No Specializations Found
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
                    length: Math.ceil(filteredSpecializations.length / itemsPerPage),
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
                    Math.ceil(filteredSpecializations.length / itemsPerPage)
                      ? "disabled"
                      : ""
                  } ml-5`}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredSpecializations.length / itemsPerPage)
                  }
                >
                  {">>"}
                </button>
              </div>
              {/* Pagination end */}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SpecializationManagement;
