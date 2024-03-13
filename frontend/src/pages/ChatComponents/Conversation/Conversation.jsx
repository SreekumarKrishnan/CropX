import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../../../axiosConfig"
import {format} from "timeago.js"

const Conversation = ({ data, currentUser, online }) => {
  const [userData, setUserData] = useState(null);
  

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userId = data.members.find((id) => id !== currentUser);
  
        const response = await axiosInstance.post("/chat/findUserForChat", JSON.stringify({ userId }))
  
        const userData = response.data?.data
        

        setUserData(userData);
       
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    getUserData();
  }, [data.members, currentUser]);
  


  return (
    <>
      <div className="flex items-center gap-4 hover:bg-gray-100 cursor-pointer rounded p-2 md:p-4">
        {online && (
          <div className="bg-green-500 rounded-full w-4 h-4 md:w-2 md:h-2"></div>
        )}
        <img
          src={
            userData?.photo ||
            userData?.photo
          }
          alt="Profile"
          className="followerImage w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
        />
        <div className="text-sm">
          <span className="font-semibold text-gray-800">
            {userData?.fname ||
              userData?.fname}
          </span>
          <br />
          <span className={online ? "text-green-500" : "text-gray-500"}>
            {online ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      <hr className="w-5/6 md:w-11/12 mx-auto border-t border-gray-300 my-4" />
    </>
  );
};

Conversation.propTypes = {
  data: PropTypes.object.isRequired, 
  currentUser: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired,
};


export default Conversation;