import React, {useState} from "react";
import { BASE_URL } from "../../config";
import axiosInstance from "../../axiosConfig";
import CertificateModal from "./CertificateModal";

const SpecialistManagement = ({ specialists, specialistRefetch }) => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
  };

  const handleBlock = async (id) => {
    try {
      await axiosInstance.put(`/admin/blockSpecialist/${id}`);
    } catch (error) {
      console.error(error);
    }

    specialistRefetch();
  };

  const handleApproval = async (id) => {
    try {
      await axiosInstance.put(`/admin/approveSpecialist/${id}`);
    } catch (error) {
      console.error(error);
    }

    specialistRefetch();
  };

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
                      Qualification
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Specialization
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Certificate
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Approving options
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialists && specialists.length > 0 ? (
                    specialists.map((specialist, index) => (
                      <tr
                        className="bg-white border-b hover:bg-[#e8e8ff]"
                        key={specialist._id}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">{`${specialist.fname} ${specialist.lname}`}</td>

                        <td className="px-6 py-4">{specialist.email}</td>
                        <td className="px-6 py-4">{specialist.qualification}</td>
                        <td className="px-6 py-4">{specialist.specialization.name}</td>
                        <td className="px-6 py-4">
                         
                          {specialist.certificate && (
                            <img
                              src={specialist.certificate}
                              alt="Certificate"
                              className="w-[60px] h-[60px] object-cover transition-transform transform hover:scale-110"
                              onClick={() =>
                                handleCertificateClick(specialist.certificate) 
                              }
                            />
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {specialist.is_Approved === false ? (
                            <button
                              onClick={() => handleApproval(specialist._id)}
                              className="px-4 py-2 font-semibold text-white bg-green-500 border border-red-500 rounded hover:bg-red-800 hover:text-white hover:border-transparent"
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              onClick={() => handleApproval(specialist._id)}
                              className="px-4 py-2 font-semibold text-white bg-red-500 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-white hover:border-transparent"
                            >
                              Suspend
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {specialist.is_Blocked ? (
                            <button
                              onClick={() => handleBlock(specialist._id)}
                              className="px-4 py-2 font-semibold text-white bg-green-500 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-white hover:border-transparent"
                            >
                              Unblock
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBlock(specialist._id)}
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

                {selectedCertificate && (
                  <CertificateModal
                    certificate={selectedCertificate}
                    onClose={handleCloseModal}
                  />
                )}
              </table>
            </div>
          </section>
        </div>
    </div>
  );
};

export default SpecialistManagement;
