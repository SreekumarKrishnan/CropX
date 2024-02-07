import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext";
import axiosInstance from "../axiosConfig";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [validationError, setValidationError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [loading, setLoading] = useState(false);

  const { token, dispatch } = useContext(authContext);
  
  useEffect(() => {
    if (token !== "null") {
      navigate("/");
    }
  }, []);

  const validateForm = () => {
    
    const { email, password, } = formData;

    if ( !email || !password ) {
      setValidationError(
        "Please fill all the fields for successfull Login"
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
      const res = await axiosInstance.post("/auth/login", formData);
      
      const result = res.data;
      

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          role: result.data.role,
          token: result.data.token,
        },
      });

      setLoading(false);
      toast.success(result.data.message);
      navigate("/home");
    } catch (error) {
      
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 text-center">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back
        </h3>
        <form className="py-4 md:py-0" action="" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              required
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

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg"
            >
              Log in
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Are you a new user?
            <Link to="/signup" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
          {validationError && <p className="text-red-500">{validationError}</p>}
        </form>
      </div>
    </section>
  );
};

export default Login;
