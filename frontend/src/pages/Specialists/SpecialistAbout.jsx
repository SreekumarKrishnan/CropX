import React from "react";
import { formateDate } from "../../utils/formateDate.js";

const SpecialistAbout = () => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30x] text-headingcColor font-semibold flex items-center gap-2">
          About of
          <span className="text-primaryColor font-bold text-[24px] leading-9">
            Alexa Norman
          </span>
        </h3>
        <p className="text__para">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy.
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Education
        </h3>
        <h5 className="text-[16px] leading-6 font-medium text-textColor">
          Bsc Agriculture
        </h5>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
          Experience
        </h3>

        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          <li className="p-4 rounded bg-[#fff9ea]">
            <span
              style={{ marginBottom: "10px", display: "block" }}
              className="text-yellowColor text-[15px] leading-6 font-semibold"
            >
              {formateDate("05-05-2018")} - {formateDate("07-10-2020")}
            </span>
            <p className="text-[16px] leading-6 font-medium text-textColor mb-3">
              Cheif Research Specialist
            </p>
            <p className="text-[14px] leading-5 font-medium text-textColor">
              Agrochemicals and Fertilisers, Hyderabad, Telangana
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SpecialistAbout;
