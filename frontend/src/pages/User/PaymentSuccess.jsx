import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosConfig"
import io from "socket.io-client"
import { authContext } from "../../context/AuthContext";

const socket = io(import.meta.env.VITE_DOMIAN)

const PaymentSuccess = () => {

  const { user, role, token, dispatch } = useContext(authContext);

  

  const navigate = useNavigate()
  const handleBooking = async () => {
    try {
      const bookingData = JSON.parse(
        localStorage.getItem("bookingData")
      );

      
      
      const res = await axiosInstance.post(
        "/user/bookAppointment",
        JSON.stringify(bookingData) 
      );

      const data ={
        specialistId : bookingData.specialistId,
        message : `${user.fname} ${user.lname } booked`
      }

      const notiResponse = await axiosInstance.post(
        "/notification/create",
        data
      )
      
      
      const result = res.data

      socket.emit("new-booking", {result})

      localStorage.removeItem("bookingData");

      toast.success(result.message)
      navigate("/user/profile")
    } catch (error) {
        localStorage.removeItem("bookingData");
        toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="mt-12">
        <ul className="flex flex-col items-center">
          <li className="p-4 rounded bg-[#fff9ea] text-center">
            <span className="text-green-500 text-[30px] leading-6 font-semibold">
              Payment Successful
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor mt-5">
              Your payment was successful. Thank you for your purchase!
            </p>
            <button
              onClick={handleBooking}
              className="mt-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Click here to confirm your booking
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentSuccess;
