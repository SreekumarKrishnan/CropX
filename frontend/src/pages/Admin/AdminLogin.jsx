import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BASE_URL } from "../../config";
import { toast } from 'react-toastify'


const AdminLogin = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const navigate = useNavigate()
    
      const [showPassword, setShowPassword] = useState(false);
    
      const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
      const [loading, setLoading] = useState(false)
    
      
    
      const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const res = await fetch(`${BASE_URL}/auth/adminLogin `, {
            method: "post",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          const {message} = await res.json();
          
          if (!res.ok) {
            throw new Error(message);
          }
          
    
          setLoading(false);
          toast.success(message);
          navigate("/admin/dashboard");
        } catch (error) {
          toast.error(error.message);
          setLoading(false);
        }
      };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 text-center">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Admin
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
              required
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
            <button type="submit" className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg">
              Log in
            </button>
          </div>

          

        </form>
      </div>
    </section>
  )
}

export default AdminLogin