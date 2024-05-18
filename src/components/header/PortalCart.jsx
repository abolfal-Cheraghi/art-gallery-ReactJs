import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useGlobalData } from "../../hooks/useGlobalData";
import { IoMdClose } from "react-icons/io";
import BtnPri from "../buttons/BtnPri";
import BtnSec from "../buttons/BtnSec";
import ListCart from "../product list/ListCart";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
// import { XMarkIcon } from "@heroicons/react/24/outline";
export default function PortalCart({ children }) {
  const { showsSidebarCart, setShowSidebarCart, lengthCart, cart, totalCart } =
    useGlobalData();
  const navigate = useNavigate();
  // const [total, setTotal] = useState(null);

  // useEffect(() => {
  //   const array_prices = cart.map((i) => i.finalPrice);
  //   if (lengthCart !== 0) {
  //     setTotal(() => {
  //       returnarray_prices.reduce((prev, curent) => prev + curent);
  //     });
  //   }
  // }, [cart]);
  return (
    <Transition.Root show={showsSidebarCart} as={Fragment}>
      <Dialog className="relative z-10" onClose={setShowSidebarCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 ">
          <div className="absolute inset-0 overflow-hidden transition-all bg-black/30">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full bg ">
              <Transition.Child
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative left-0 w-screen  max-w-[360px] lg:max-w-[370px]">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-10 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setShowSidebarCart(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                        <IoMdClose className="fill-g-primary" size="25px" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-col justify-between h-full bg-white shadow-xl px-4 py-6">
                    {/* top side bar */}
                    {lengthCart === 0 && (
                      <div className="">
                        <p className="my-3 text-xs text-gray">
                          شما چیزی در سبد خرید ندارید !
                        </p>
                      </div>
                    )}
                    {/* wrapper products */}
                    <div className="scroll mt-6 grid grid-cols-1 gap-2 max-h-[450px] overflow-y-auto pl-5">
                      {cart.map((pr) => (
                        <>
                          <ListCart key={pr.id} {...pr} />
                          <hr className=" text-[#d1d1d1]" />
                        </>
                      ))}
                    </div>

                    {lengthCart !== 0 && (
                      <div className="flex flex-col gap-4">
                        {/* total */}
                        <div className="flex justify-center items-center gap-1 text-g-primary text-lg *:font-yekanbakh-bold">
                          <p>
                            جمع جزء :{" "}
                            <b>{Number(totalCart).toLocaleString("fa-ir")}</b>
                          </p>
                          <span className="text-xs">تومان</span>
                        </div>
                        {/* bottom sidebar buttons */}
                        <div className="w-full flex gap-2 ">
                          <button
                            onClick={() => {
                              setShowSidebarCart(false);
                              navigate("/cart");
                            }}
                            className="btn-secondary w-6/12 py-3 px-4 text-sm flex items-center justify-center"
                          >
                            مشاهده سبد خرید
                          </button>
                          <button
                            onClick={() => {
                              setShowSidebarCart(false);
                              navigate("/checkout");
                            }}
                            className="btn-primary w-6/12 py-3 px-4 text-sm flex items-center justify-center"
                          >
                            تسویه حساب
                          </button>
                        </div>
                      </div>
                    )}
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
