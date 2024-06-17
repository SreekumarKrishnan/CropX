import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpecialistCard from "./SpecialistCard";
import { authContext } from "../../context/AuthContext";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";
import Sidebar from "./SpecializationSidebar"

const Specialists = () => {
  const [specialists, setSpecialists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [availableSpecializations, setAvailableSpecializations] = useState([]);


  const { dispatch } = useContext(authContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const specialistsRes = await axiosInstance.get(
          "/specialist/allSpecialists"
        );
        const specializationsRes = await axiosInstance.get(
          "/admin/allSpecialization"
        );

        const specialistsResult = specialistsRes.data.data;
        const specializationsResult = specializationsRes.data.data;

        if (isMounted) {
          setSpecialists(specialistsResult);
          setFilteredSpecialists(specialistsResult);
          setAvailableSpecializations(specializationsResult);
        }
      } catch (error) {
        if (isMounted) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An unexpected error occurred.");
          }
        }
        navigate("/home");
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = () => {
    const filtered = specialists.filter(
      (specialist) =>
        
        (specialist.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          specialist.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          specialist.specialization.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
        
        (selectedSpecializations.length === 0 || selectedSpecializations.includes(specialist.specialization.name))
    );
    setFilteredSpecialists(filtered);
    setCurrentPage(1);
  };
  

  useEffect(() => {
    handleSearch();
  }, [searchQuery, specialists, selectedSpecializations]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSpecialists.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Specialist</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-center">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Specialist"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-wrap">

      <div className="hidden md:block md:w-1/4">
          <Sidebar
            availableSpecializations={availableSpecializations}
            selectedSpecializations={selectedSpecializations}
            setSelectedSpecializations={setSelectedSpecializations}
          />
        </div>

        <div className="container md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {currentItems.map((specialist) => (
              <SpecialistCard key={specialist._id} specialist={specialist} />
            ))}
          </div>

         
          <div className="mt-4 flex justify-center items-center">
            <button
              onClick={() => paginate(currentPage - 1)}
              className={`page-link ${
                currentPage === 1 ? "disabled" : ""
              } mr-5`}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <ul className="pagination flex space-x-2">
              {Array.from({
                length: Math.ceil(filteredSpecialists.length / itemsPerPage),
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
                Math.ceil(filteredSpecialists.length / itemsPerPage)
                  ? "disabled"
                  : ""
              } ml-5`}
              disabled={
                currentPage ===
                Math.ceil(filteredSpecialists.length / itemsPerPage)
              }
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Specialists;
