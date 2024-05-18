import React, { memo, useContext } from "react";
import ReactDOM from "react-dom";
import { contextHeader } from "./Header";
// icons
import { IoMdClose } from "react-icons/io";
import { useGlobalData } from "../../hooks/useGlobalData";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

function PortalSidebar({ children }) {
  const { showsSidebar, setShowSidebar } = useGlobalData();
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
  return (
    <Transition.Root show={showsSidebar} as={Fragment}>
      <Dialog className="relative z-10" onClose={setShowSidebar}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-700"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-[330px]">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setShowSidebar(false)}
                      >
                        <IoMdClose className="fill-g-primary" size="25px" />
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col bg-white py-6 shadow-xl">
                    <div
                      className={` ${
                        showsSidebar
                          ? "opacity-100 duration-[2s]"
                          : "opacity-0 duration-500"
                      }`}
                    >
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default memo(PortalSidebar);
