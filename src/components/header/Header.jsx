import React, { createContext, useState } from "react";
import PortalSidebar from "./PortalSidebar";
// import Switcher from "../Switcher";
import logo from "../../../public/logo.svg";
import { useGlobalData } from "../../hooks/useGlobalData";
import { NavLink } from "react-router-dom";
// icons
import { FaUser } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import SearchBox from "../search box/SearchBox";

export const contextHeader = createContext(null);

export default function Header() {
  const [showsSidebar, setShowSidebar] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { menuNavbar } = useGlobalData();

  window.addEventListener("scroll", (e) => {
    if (window.scrollY > 20) {
      setScrolled(true);
    }
  });

  return (
    <>
      <nav className={`container my-4 md:my-6 `}>
        {/* <div className="header-top"></div> */}
        <div className="eader-main bg-white dark:bg-black h-[75px] rounded-2xl md:rounded-t-2xl md:rounded-b-none shadow-lg px-6 flex items-cente">
          <div className="wrapper w-full flex justify-between items-center">
            {/* menu mobile */}
            <div className="md:hidden menu-mobile">
              <contextHeader.Provider value={{ showsSidebar, setShowSidebar }}>
                <PortalSidebar toggle={showsSidebar}>
                  <div className="menu-phone p-5 md:hidden flex flex-col gap-7 ">
                    {/* logo sidebar*/}
                    <div className="logo">
                      <img src={logo} alt="logo" />
                    </div>
                    {/* search box mobile*/}
                    <SearchBox />
                    {/* list menu mobile */}
                    <div>
                      <ul className="flex flex-col gap-5 ">
                        {menuNavbar.map((item) => (
                          <li className="text-s-13 text-accent ">
                            <NavLink
                              to={item.path}
                              className="font-yekanbakh-bold"
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </PortalSidebar>
              </contextHeader.Provider>
              <button
                className="btn-sidebar flex items-center"
                onClick={() => {
                  setShowSidebar(!showsSidebar);
                }}
              >
                <CgMenuRight size="25px" className="text-g-secondary" />
              </button>
            </div>
            {/* logo */}
            <div className="logo">
              <img
                src={logo}
                alt="logo"
                className="-scale-[-0.77] md:scale-1"
              />
            </div>

            {/* box search */}
            <div className="hidden md:block">
              <SearchBox />
            </div>
            {/* box left header */}
            <div className="flex items-center gap-2 xl-gap-0">
              {/* info contact */}
              <div className="hidden xl:flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 justify-center">
                  <span className=" text-sm font-yekanbakh-bold">
                    info@yoursite.com
                  </span>
                  <MdEmail className="fill-g-secondary" />
                </div>
                <div className="flex items-center  gap-1">
                  <span className=" text-sm font-yekanbakh-bold">
                    1234567 - 035
                  </span>
                  <GiRotaryPhone size="18px" className="fill-g-secondary" />
                </div>
                <div className="flex"></div>
              </div>
              <button className="bg-accent text-white rounded-xl xl:rounded-r-xl xl:rounded-l-none flex gap-2 xl:gap-0 items-center text-xs fomt-yekanbakh p-2 md:p-3 xl:px-6 xl:-ml-5 relative">
                <div className="absolute bg-g-primary px-1 rounded-full -top-2 left-0 xl:left-3">
                  2
                </div>
                <BsCartCheck size="16px" />
              </button>
              <button className="bg-g-secondary text-white rounded-xl flex gap-2 items-center font-YekanBakh-bold  text-xs  p-2 md:p-3 xl:px-6 relative">
                <span className="hidden xl:flex">ورود / ثبت</span>
                <FaUser className="fill-white xl:fill-accent " size="15px" />
              </button>
            </div>
          </div>
        </div>
        <div className="header-bottom hidden md:flex md:items-center md:justify-center bg-[#DBDFEA] h-[60px] rounded-b-2xl px-6">
          <div className="flex items-center justify-center">
            <ul className="flex gap-[50px]">
              {menuNavbar.map((item) => (
                <li className="md:text-s-13 lg:text-sm text-accent ">
                  <NavLink to={item.path} className="font-yekanbakh-bold">
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}