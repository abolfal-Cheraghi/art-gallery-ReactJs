import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { contextHeader } from "./Header";
// icons
import { IoMdClose } from "react-icons/io";
export default function PortalSidebar({ children }) {
  const { showsSidebar, setShowSidebar } = useContext(contextHeader);
  // window.addEventListener("click", (e) => {
  //   let classElement = e.target.className.split(" ").find((i) => {
  //     if (i === "menu-sidebar") {
  //       return "menu-sidebar";
  //     } else if (i === "btn-sidebar") {
  //       return "btn-sidebar";
  //     } else {
  //       return null;
  //     }
  //   });

  //   if (showsSidebar && classElement !== "menu-sidebar") {
  //     setShowSidebar(true);
  //   } else {
  //     setShowSidebar(false);
  //   }
  // });
  return ReactDOM.createPortal(
    <div
      className={`parent-portal-sidebar  duration-700 absolute top-0 left-0 right-0 z-50${
        showsSidebar && "w-full h-svh bg-black/55"
      }`}
    >
      <div
        className={`menu-sidebar absolute right-0 top-0 w-0 h-[100%]  bg-white dark:bg-accent ${
          showsSidebar ? "show-sidebar" : "close-sidebar"
        }`}
      >
        {/* button close */}
        {showsSidebar && (
          <button
            className=" absolute  top-2 -left-8"
            onClick={() => {
              setShowSidebar(false);
            }}
          >
            <IoMdClose className="fill-g-primary" size="25px" />
          </button>
        )}

        <div
          className={` ${
            showsSidebar
              ? "opacity-100 duration-[2s]"
              : "opacity-0 duration-300"
          }`}
        >
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("sidebar")
  );
}
