import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SpecialistCard from "./SpecialistCard";
import { authContext } from "../../context/AuthContext";
import axiosInstance from "../../axiosConfig";
import { toast } from "react-toastify";

const Specialists = () => {
  const [specialists, setSpecialists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSpecialists, setFilteredSpecialists] = useState([]);
  const { dispatch } = useContext(authContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true;
  
    const fetchData = async () => {
      try {
        
        const res = await axiosInstance.get("/specialist/allSpecialists");
        const result = res.data;
        
        if (isMounted) {
          setSpecialists(result.data);
        }
      } catch (error) {
        if (isMounted) {
          if (error.response && error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("An unexpected error occurred.");
          }
        }
        navigate('/home')
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
        specialist.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        specialist.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        specialist.specialization.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSpecialists(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, specialists]);

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

      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredSpecialists.length > 0
              ? filteredSpecialists.map((specialist) => (
                  <SpecialistCard
                    key={specialist._id}
                    specialist={specialist}
                  />
                ))
              : specialists.map((specialist) => (
                  <SpecialistCard
                    key={specialist._id}
                    specialist={specialist}
                  />
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Specialists;
