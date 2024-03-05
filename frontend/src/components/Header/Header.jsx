import React, { useState, useEffect, useRef, useContext } from "react";
import logo from "../../assets/images/logo.png";
import altDp from "../../assets/images/altDp.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { MdNotificationsActive } from "react-icons/md";
import io from "socket.io-client";
import axiosInstance from "../../axiosConfig";

const socket = io("http://localhost:5000");

const icon = <HiMiniChatBubbleLeftRight />;
const notification = <MdNotificationsActive />;

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/specialists",
    display: "Find a Specialist",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token, dispatch } = useContext(authContext);

  const [notifications, setNotifications] = useState([]);

  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);

    if (isNotificationOpen === true) {
      handleSpecialistNotification();
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    location.reload();
  }; 

  useEffect(() => {
    
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `notification/getData/${user._id}`,
      );

      setNotifications(response.data.data);
    };

    fetchData();
  }, [notifications]);

  useEffect(() => {
    socket.on("notify-specialist", (result) => {
      //setBookingState(true);
      //setNotificationCount(notifications.length)
    });
    socket.on("notify-specialist-cancel")
    socket.on("notify-user-cancel")

    return () => {
      socket.off("notify-specialist");
      socket.off("notify-specialist-cancel")
      socket.off("notify-user-cancel")
    };
  }, []);

  const handleSpecialistNotification = async () => {
    try {
      const response = await axiosInstance.patch(
        `notification/updateSeen/${user._id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header flex items-center bg-white" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <img className="w-[100px]" src={logo} alt="" />
          </div>
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? "text-primarycolor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {token && user ? (
              <div className="relative flex justify-between ">
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md w-48">
                    <ul>
                      <li>{`${user.fname} ${user.lname}`}</li>
                      {role === "farmer" ? (
                        <li>
                          <Link
                            to="/user/profile"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          >
                            Profile
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link
                            to="/specialist/profile"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                          >
                            Profile
                          </Link>
                        </li>
                      )}

                      <li>
                        <Link
                          to="/specialists"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                          Specialists
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/login"
                          onClick={handleLogout}
                          className="block px-4 py-2 text-red-800 font-bold hover:bg-gray-200"
                        >
                          Log out
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}    

                <div onClick={toggleDropdown}>
                  <Link>
                    <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                      <img
                        src={user.photo || altDp}
                        className="w-full rounded-full"
                        alt={altDp}
                      />
                    </figure>
                  </Link>
                </div>

                <div style={{ marginLeft: "30px" }}>
                  <Link to="/chat" className="text-primaryColor">
                    <span
                      role="img"
                      aria-label="Chat"
                      style={{ fontSize: "1.5rem" }}
                    >
                      {icon}
                    </span>
                  </Link>
                </div>

                <div style={{ marginLeft: "30px", position: "relative" }}>
                  <Link
                    to=""
                    className="text-primaryColor"
                    onClick={toggleNotification}
                  >
                    <span
                      role="img"
                      aria-label="Notification"
                      style={{ fontSize: "1.5rem" }}
                    >
                      {notifications.length > 0 && role == "farmer" && (
                        <span
                          className="bg-red-500 text-white rounded-full px-2 ml-1"
                          style={{
                            position: "absolute",
                            top: "-5px",
                            right: "-5px",
                            fontSize: "0.7rem",
                          }}
                        >
                          {notifications.length}
                        </span>
                      )}

                      {notification}
                    </span>

                    {notifications.length > 0 && role == "specialist" && (
                      <span
                        className="bg-red-500 text-white rounded-full px-2 ml-1"
                        style={{
                          position: "absolute",
                          top: "-5px",
                          right: "-5px",
                          fontSize: "0.7rem",
                        }}
                      >
                        {notifications.length}
                      </span>
                    )}
                  </Link>
                  {isNotificationOpen && role === "specialist" && (
                    <>
                      {notifications.length > 0 ? (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md w-48">
                          {/* Add your notification content here */}
                          <ul>
                            {notifications.map((msg) => (
                              <li key={msg.id}>{msg.message}</li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md w-48">
                          <ul>
                            <li>No notifications</li>
                          </ul>
                        </div>
                      )}
                    </>
                  )}

                  {isNotificationOpen && role === "farmer" && (
                    <>
                      {notifications.length > 0 ? (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md w-48">
                          {/* Add your notification content here */}
                          <ul>
                            {notifications.map((msg) => (
                              <li key={msg.id}>{msg.message}</li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-md w-48">
                          <ul>
                            <li>No notifications</li>
                          </ul>
                        </div>
                      )}
                    </>
                  )}

                </div>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Log in
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
