import React, { useContext, useState } from "react";
import altDp from "../../assets/images/altDp.png";
import MyAppointments from "./MyAppointments";
import Profile from "./Profile";
import useGetProfile from "../../hooks/UseFetchAllSpecialistData"
import AddExperience from "./AddExperience";
import AddSlot from "./AddSlot"
import UseFetchBookingData from "../../hooks/UseFetchBookingData";
import { authContext } from "../../context/AuthContext";

const SpecialistDashboard = () => {
  const { user, role, token, dispatch } = useContext(authContext);
  const [tab, setTab] = useState("appointments");
  const { specialistData : userData, refetch: userRefetch } = useGetProfile("/specialist/profile")
  const { bookingData : bookingData, refetch : refetch } = UseFetchBookingData(`/booking/getDataPerId/${user._id}`)
  
  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] px-[30px] rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                <img
                  src={userData.photo || altDp}
                  alt={altDp}
                  className="w-full h-full rounded-full"
                />
              </figure>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                {`${userData.fname} ${userData.lname}`}
              </h3>
              <p className="text-textColor text-[15px] leading-6 font-medium">
                {userData.email}
              </p>
            </div>
          </div>

          <div className="md:col-span-2 md:px-[30px]">
            <div>
              <button
                onClick={() => setTab("appointments")}
                className={`${
                  tab === "appointments" && "bg-primaryColor text-white font-normal"
                } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                My Appointments
              </button>
              <button
                onClick={() => setTab("experience")}
                className={`${
                  tab === "experience" && "bg-primaryColor text-white font-normal"
                } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Add Experience
              </button>
              <button
                onClick={() => setTab("settings")}
                className={`${
                  tab === "settings" && "bg-primaryColor text-white font-normal"
                } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor mr-5`}
              >
                Profile Setting
              </button>
              <button
                onClick={() => setTab("slots")}
                className={`${
                  tab === "slots" && "bg-primaryColor text-white font-normal"
                } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Slots
              </button>
            </div>

            {tab === "appointments" && <MyAppointments bookingData={bookingData} refetch={refetch} />}
            {tab === "experience" && <AddExperience user={userData} userRefetch={userRefetch} />}
            {tab === "settings" && <Profile user={userData} />}
            {tab === "slots" && <AddSlot user={userData} userRefetch={userRefetch} />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpecialistDashboard