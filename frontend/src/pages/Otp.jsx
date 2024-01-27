import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../axiosConfig";

const Otp = () => {
  const [formData, setFormData] = useState({
    otp: "",
  });

  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    
    const { otp } = formData;

    if ( !otp ) {
      setValidationError(
        "Please Enter otp"
      );

      return false;
    }

    setValidationError(""); // Reset validation error if all validations pass
    return true; // All validations passed
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
      }

    try {
      const OTP = localStorage.getItem("otp");
      const otp = formData.otp;
      if (otp !== OTP) {
        toast.error("Invalid otp");
        return;
      }
      const registrationData = JSON.parse(
        localStorage.getItem("registrationForm")
      );

      const res = await axiosInstance.post(
        "/auth/register",
        JSON.stringify(registrationData)
      );

      

      localStorage.removeItem("registrationForm");
      localStorage.removeItem("otp");

      const { message } = res.data;

      
      toast.success(message);
      navigate("/login");
    } catch (error) {
      localStorage.removeItem("registrationForm");
      localStorage.removeItem("otp");
      toast.error(error.response.data.message);
      
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 text-center">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Verify your <span className="text-primaryColor">otp</span> here!
        </h3>
        <form className="py-4 md:py-0" action="" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Enter your otp"
              name="otp"
              value={formData.otp}
              onChange={handleInputChange}
              className="w-full text-center py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg"
            >
              Verify otp
            </button>
          </div>
          {validationError && <p className="text-red-500">{validationError}</p>}
        </form>
      </div>
    </section>
  );
};

export default Otp;
