import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/images/specialist1.png";
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import axiosInstance from "../axiosConfig"
import useGetAllSpecializations from "../hooks/UseFetchAllSpecializationData"
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const SpecialistSignup = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    photo: "",
    role: "specialist",
  });

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [certificateImagePreviewURL, setCertificateImagePreviewURL] = useState(null);
  const [certificateSelectedFile, setCertificateSelectedFile] = useState("");

  const [validationError, setValidationError] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const { specializationData: specializationData,refetch:specializationRefetch } = useGetAllSpecializations('/admin/allSpecialization')

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  

  const handleCertificateFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    console.log(data);
    setCertificateImagePreviewURL(data.url);
    setCertificateSelectedFile(data.url);
    setFormData({ ...formData, certificate: data.url });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    console.log(data);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

 

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    
    const { fname, lname, email, password, mobile, role  } = formData;

   

    if (!fname || !lname || !email || !password || !role) {
      setValidationError(
        "Please fill all the fields for successfull registration"
      );

      return false;
    }

    // Validate name
    if (!/^[a-zA-Z\s]{1,25}$/.test(fname)) {
      setValidationError(
        "Name must not contain any number and have a maximum of 25 characters"
      );

      return false;
    }
    if (!/^[a-zA-Z\s]{1,25}$/.test(lname)) {
      setValidationError(
        "Name must not contain any number and have a maximum of 25 characters"
      );

      return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Invalid email address");

      return false;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setValidationError("Phone number must be exactly 10 digits");
      return false;
    }

    // Validate password
    if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/.test(
        password
      )
    ) {
      setValidationError(
        "Password must contain one uppercase letter, one lowercase letter, one number, and one special character, with a minimum length of 8"
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

    setLoading(true);
    try {
      
      console.log(formData);

      const res = await axiosInstance.post("/auth/sendOtp", formData)

      const result = res.data
      

      localStorage.setItem("registrationForm", JSON.stringify(formData))
      localStorage.setItem('otp', result.otp)
      setLoading(false)
      toast.success(result.message)
      navigate('/otp')


    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 text-center">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Create a <span className="text-primaryColor">Spacialist Account</span>
        </h3>

        <form action="" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="text"
              placeholder="First Name"
              name="fname"
              value={formData.fname}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              
            />
          </div>

          <div className="mb-5">
            <input
              type="text"
              placeholder="Last Name"
              name="lname"
              value={formData.lname}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              
            />
          </div>

          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              
            />
          </div>

          <div className="mb-5">
            <input
              type="number"
              placeholder="Enter Your Phone Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              
            />
          </div>

          <div className="mb-5 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full py-3 pr-12 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor"
              
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                type="button"
                onClick={toggleShowPassword}
                className="text-[16px] leading-7 text-headingColor cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-5 flex items-center gap-3">
            {selectedFile && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                <img src={previewURL} alt="" className="w-full rounded-full" />
              </figure>
            )}
            <div className="relative w-[130px] h-[50px]">
              <input
                type="file"
                name="photo"
                id="customFile"
                onChange={handleFileInputChange}
                accept=".jpg, .png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer "
              />
              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer "
              >
                Upload Photo
              </label>
            </div>
          </div>

          <div className="mt-7 mb-5">
            <button
              disabled={loading && true}
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg"
            >
              {loading ? <HashLoader size={35} color="#ffffff" /> : "Sign up"}
            </button>
          </div>

          <GoogleOAuthProvider clientId="665919114471-3kgrus9ohk8pqq07a5d0hovma3bt5244.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse) {
                  const decoded = jwtDecode(credentialResponse.credential);
                  const data = {
                    fname: decoded.given_name,
                    lname: decoded.family_name,
                    email: decoded.email,
                    password: decoded.sub,
                    role: formData.role,
                  };

                  const reg = async () => {
                    try {
                      const res = await axiosInstance.post(
                        "/auth/register",
                        data
                      );
                      const { message } = res.data;

                      toast.success(message);
                      navigate("/login");
                    } catch (error) {
                      toast.error(error.response.data.message);
                    }
                  };

                  reg();
                }
              }}
              onError={() => {
                console.log("Registration Failed");
              }}
            />
          </GoogleOAuthProvider>

          {validationError && <p className="text-red-500">{validationError}</p>}
        </form>
      </div>
    </section>
  );
};

export default SpecialistSignup;
