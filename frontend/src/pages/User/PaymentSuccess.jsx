import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../axiosConfig"

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const handleBooking = async () => {
    try {
      const bookingData = JSON.parse(
        localStorage.getItem("bookingData")
      );
      console.log(bookingData);
      const res = await axiosInstance.post(
        "/user/bookAppointment",
        JSON.stringify(bookingData) 
      );
      localStorage.removeItem("bookingData");
      const result = res.data
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
