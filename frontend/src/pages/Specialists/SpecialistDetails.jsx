import React from "react";
import altDp from "../../assets/images/altDp.png";
import SpecialistAbout from "./SpecialistAbout";
import SidePanel from "./SidePanel";

const SpecialistDetails = () => {
  return (
    <div className="max-w-[1170px] px-5 mx-auto">
      <div className="grid md:grid-cols-3 gap-[50px]">
        <div className="md:col-span-2">
          <div className="flex items-center gap-5">
            <figure className="max-w-[200px] max-h-[200px]">
              <img className="w-full" src={altDp} alt={altDp} />
            </figure>

            <div>
              <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-4">
                Alexa Norman
              </h3>
              <span className="bg-primaryColor text-white py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded">
                Agricultural Engineer
              </span>
            </div>
          </div>

          <div className="mt-[50px] border-b border-solid border-primaryColor">
            <h5 className="py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold">
              About
            </h5>
          </div>

          <div className="mt-[50px]">
            <SpecialistAbout />
          </div>
        </div>

        <div>
          <SidePanel />
        </div>
      </div>
    </div>
  );
};

export default SpecialistDetails;
