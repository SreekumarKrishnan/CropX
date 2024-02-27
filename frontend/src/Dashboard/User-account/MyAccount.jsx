import React, { useContext, useState } from "react";
import altDp from "../../assets/images/altDp.png";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useGetProfile from "../../hooks/UseFetchAllUsersData"
import useGetBookingData from "../../hooks/UseFetchBookingData"
import { authContext } from "../../context/AuthContext";

const MyAccount = () => {
  const {user} = useContext(authContext)
  const id = user._id
  const [tab, setTab] = useState("bookings");
  const { userData : userData, loading, error } = useGetProfile("/user/profile")
  const { bookingData : bookingData, refetch : refetch } = useGetBookingData(`/admin/getBookingDataById/${id}`)
 
      
  
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
                onClick={() => setTab("bookings")}
                className={`${
                  tab === "bookings" && "bg-primaryColor text-white font-normal"
                } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setTab("settings")}
                className={`${
                  tab === "settings" && "bg-primaryColor text-white font-normal"
                } py-2 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
              >
                Profile Setting
              </button>
            </div>

            {tab === "bookings" && <MyBookings bookingData={bookingData} refetch={refetch} />}
            {tab === "settings" && <Profile user={userData} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
