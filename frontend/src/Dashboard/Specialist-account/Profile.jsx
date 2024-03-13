import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import axiosInstance from "../../axiosConfig";
import useGetAllSpecializations from "../../hooks/UseFetchAllSpecializationData";

const Profile = ({ user }) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
    photo: null,
    role: "farmer",
    specialization: "",
    qualification: "",
    certificate:"",
    fee:null
    
  });

  useEffect(() => {
    setFormData({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      mobile: user.mobile,
      photo: user.photo,
      specialization: user.specialization,
      qualification: user.qualification,
      certificate:user.certificate,
      fee : user.fee
      
    });
  }, [user]);

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [certificateImagePreviewURL, setCertificateImagePreviewURL] = useState(null);
  const [certificateSelectedFile, setCertificateSelectedFile] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const {
    specializationData: specializationData,
    refetch: specializationRefetch,
  } = useGetAllSpecializations("/admin/allSpecialization");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const handleCertificateFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    console.log(data);
    setCertificateImagePreviewURL(data.url);
    setCertificateSelectedFile(data.url);
    setFormData({ ...formData, certificate: data.url });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  

  



  const submitHandler = async (e) => {
    e.preventDefault();
   
    
    setLoading(true);
    try {
      const res = await axiosInstance.put(
        `/specialist/updateSpecialist/${user._id}`,
        formData
      );

      const result = res.data;

      setLoading(false);
      toast.success(result.message);
      navigate("/specialist/profile");
    } catch (error) {
      
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  return (
    <div>
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

        <div className="mb-5">
          <input
            type="number"
            placeholder="Enter fee"
            name="fee"
            value={formData.fee}
            onChange={handleInputChange}
            className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
          />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <label className="text-headingColor font-bold text-[16px] leading-7">
            Specialization:
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none rounded-lg"
            >
              <option value="select">Select</option>
              {specializationData.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleInputChange}
            className="w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
          />
        </div>

        <div className="mb-5 flex items-center gap-3">
            {formData.certificate && (
              <figure className="w-[60px] h-[60px] border-2 border-solid border-primaryColor flex items-center justify-center">
                <img src={formData.certificate} alt="" className="w-full object-cover" />
              </figure>
            )}
            <div className="relative w-[130px] h-[50px]">
              <input
                type="file"
                name="photo"
                id="customFile1"
                onChange={handleCertificateFileInputChange}
                accept=".jpg, .png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer "
              />
              <label
                htmlFor="customFile1"
                className="absolute top-0 left-0 w-[150px] h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer "
              >
                Upload Certificate
              </label>
            </div>
          </div>


        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt=""
                className="w-full rounded-full"
              />
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

        <div className="mt-7">
          <button
            disabled={loading && true}
            type="submit"
            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg"
          >
            {loading ? <HashLoader size={35} color="#ffffff" /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
