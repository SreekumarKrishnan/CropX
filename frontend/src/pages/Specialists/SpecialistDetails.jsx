import React, { useState, useEffect } from "react";
import altDp from "../../assets/images/altDp.png";
import SpecialistAbout from "./SpecialistAbout";
import SidePanel from "./SidePanel";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosConfig";

const SpecialistDetails = () => {
  const [specialist, setSpecialist] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/specialist/profileById/${id}`);
        const result = res.data;

        if (isMounted) {
          setSpecialist(result.data);
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

  const user = JSON.parse(localStorage.getItem("user"))
  const userId = user._id


  const handleMessage = async () => {
    const data = {
      senderId:userId,
      receiverId:id
    }
    try {
     const response = await axiosInstance.post("/chat", data)
     const result = response.data
     navigate("/chat")
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };
  

  return (
    <div className="max-w-[1170px] px-5 mx-auto">
      <div className="grid md:grid-cols-3 gap-[50px]">
        <div className="md:col-span-2">
          <div className="flex items-center gap-5">
            <figure className="max-w-[200px] max-h-[200px]">
              <img className="w-full" src={specialist.photo || altDp} alt={altDp} />
            </figure>

            <div>
              <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-4">
                {`${specialist.fname} ${specialist.lname}`}
              </h3>
              {specialist && (
                <span className="bg-primaryColor text-white py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                  {specialist.specialization && specialist.specialization.name}
                </span>
              )}
              <button 
                  onClick={handleMessage}
                  className="flex bg-blue-500 text-white py-2 px-4 rounded mt-6"
                >
                  Message
                </button>
            </div>
            
          </div>
          

          <div className="mt-[50px] border-b border-solid border-primaryColor">
            <h5 className="py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold">
              About
            </h5>
          </div>

          <div className="mt-[50px]">
            <SpecialistAbout specialist={specialist} />
          </div>
        </div>

        <div>
          <SidePanel specialist={specialist} id={id} userId={userId}/>
        </div>
      </div>
    </div>
  );
};

export default SpecialistDetails;
