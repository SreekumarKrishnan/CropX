import React, { useState } from "react";
import { formateDate } from "../../utils/formateDate"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig"
 

const SidePanel = ({ specialist,id,userId }) => {
  
  const [selectedSlot, setSelectedSlot] = useState(null);

  const navigate = useNavigate()

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  

  const handleBookAppointment = async() => {
    const data = {
      specialistId : id,
      userId : userId,
      slotDate : selectedSlot.slotDate,
      slotTime : selectedSlot.slotTime,
      ticketPrice : "1000"
    }
    try {
      const res = await axiosInstance.post(
        `/user/makePayment`,
        data
      );
      localStorage.setItem("bookingData", JSON.stringify(data));
      const result = res.data;
      setSelectedSlot(null)
      if(result.url){
        window.location.href=result.url
      }
      
     
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price : 1000 INR</p>
      </div>
      {specialist && specialist.slot && specialist.slot.length > 0 && (
        <div className="mt-[30px]">
          <p className="text__para mt-0 font-semibold text-headingColor">
            Available Time Slots:
          </p>
          <ul className="mt-3">
            {
            specialist.slot.map((slot, index) => (
              slot.map((item,index1)=>(
              <li
                key={index}
                className={`flex items-center justify-between mb-2 ${
                  selectedSlot === item ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSlotSelection(item)}
              >
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {formateDate(item.slotDate.split("T")[0])}
                </p>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {item.slotTime}
                </p>
              </li>
              ))
            ))
            }
          </ul>
        </div>
      )}

      <button
        className="btn px-2 w-full rounded-md"
        onClick={handleBookAppointment}
        disabled={!selectedSlot}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;
