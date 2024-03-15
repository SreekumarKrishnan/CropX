import React from "react";
import { formateDate } from "../../utils/formateDate.js";

const SpecialistAbout = ({ specialist }) => {
  return (
    <div>
      

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>
        <h5 className="text-[16px] leading-6 font-medium text-textColor">
          {specialist.qualification}
        </h5>
      </div>

      {specialist && specialist.experiences && specialist.experiences.length > 0 && (
        <div className="mt-12">
          <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
            Experience
          </h3>
          <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
            {specialist.experiences.map((item, index) => (
              <li key={index} className="p-4 rounded bg-[#fff9ea]">
                <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                  {formateDate(item.startDate)} - {formateDate(item.endDate)}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  {item.position}
                </p>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  {item.organization}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SpecialistAbout;
