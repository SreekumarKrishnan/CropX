import React from "react";
import altDp from "../../assets/images/altDp.png"
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const SpecialistCard = ({ specialist }) => {
  const { _id, fname, lname, photo, qualification, specialization } = specialist;
  

  return (
    <div className="p-3 lg:p-5">
      <div>
        <img src={photo || altDp} className="w-full rounded-lg" alt={altDp} />
      </div>
      <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">{`${fname} ${lname}`}</h2>
      <div className="mt-2 lg:mt-4 flex items-center justify-between">
        <span className="bg-primaryColor text-white py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
          {specialization.name}
        </span>
      </div>
      <div className="mt-[18px] lg:mt-5 flex items-center justify-between">
        <div>
          <h3 className="text-[16px] leading-7 lg:text-[18px] lg:leading-[30px] font-semibold text-headingColor">
            {qualification}
          </h3>
        </div>
        <Link
          to={`/specialist/${_id}`}
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none"
        >
          <BsArrowRight className="group-hover:text-white w-6 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default SpecialistCard;
