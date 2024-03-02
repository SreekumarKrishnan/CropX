import React, { useState, useEffect, useRef, useContext } from "react";
import logo from "../../assets/images/logo.png";
import altDp from "../../assets/images/altDp.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { HiMiniChatBubbleLeftRight } from 'react-icons/hi2'

const icon = <HiMiniChatBubbleLeftRight />

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

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    location.reload();
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

                <div style={{ marginLeft: '30px'}}>
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
