import React, { useCallback, useEffect, useState, useTransition } from "react";
import { useGlobalData } from "../../hooks/useGlobalData";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// component row Table

function RowTabel(props) {
  const [valueQuantity, setValueQuntity] = useState(props.quantity);
  const { removeTo_Cart, changeQuantity_Cart } = useGlobalData();
  const removeFromCart_Handler = () => {
    removeTo_Cart(props.id);
  };
  const changeQuantity = (newQuantity) => {
    setQuantity(newQuantity);
    // عملیات تغییر تعداد محصول
  };
  useEffect(() => {
    setValueQuntity(props.quantity);
  }, [props.quantity]);
  return (
    <tr class="bg-white border-b border-b-[#D5D8DC] dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">
        <button onClick={removeFromCart_Handler}>
          <IoCloseSharp size="17px" />
        </button>
      </td>
      <td>
        <img src={props.img} alt={props.name} className="h-[70px] w-[70px]" />
      </td>
      <td class="px-6 py-4 *:font-rokh">
        <Link to={`/product/${props.id}`}>{props.name}</Link>
      </td>
      <td class="px-6 py-4 *:font-yekanbakh-bold font-yekanbakh-bold *:text-s-13 text-s-13 text-gray">
        <span className="text-g-secondary">
          {props.finalPrice.toLocaleString("fa")}
        </span>
        تومان
      </td>
      <td class="px-6 py-4">
        <input
          type="number"
          className="border p-0"
          min="0"
          max="10"
          style={{ border: "1px solid #eeeeee !important", width: "40px" }}
          defaultValue={valueQuantity}
          onChange={(e) => changeQuantity(e.target.value)}
          onBlur={(e) => {
            if (e.target.value < 0 || e.target.value === "") {
              toast.warn("عدد صحیح وارد کنید !", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              e.target.focus();
            } else {
              changeQuantity_Cart(e.target.name, Number(e.target.value));
            }
          }}
          name={props.id}
        />
      </td>
      <td class="px-6 py-4 *:font-yekanbakh-bold font-yekanbakh-bold *:text-s-13 text-s-13 text-gray">
        <span className="text-g-secondary">
          {(props.finalPrice * props.quantity).toLocaleString("fa")}
        </span>
        تومان
      </td>
    </tr>
  );
}

export default function Cart() {
  const { cart, removeTo_Cart, totalCart } = useGlobalData();
  const [isPending, satrtTransition] = useTransition();

  // const changeHandler_quantity = (e) => {
  //   if (e.target.value < 0 || e.target.value === "") {
  //     toast.warn("عدد صحیح وارد کنید !", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     e.target.focus();
  //   } else {
  //     changeQuantity_Cart(e.target.name, Number(e.target.value));
  //   }
  // };

  return (
    <>
      <div className="container">
        <section className="cart">
          <div className="flex flex-wrap lg:flex-nowrap gap-10">
            {cart.length === 0 ? (
              <div className="mt-7 flex items-center justify-center flex-col gap-3 w-full">
                <span className="font-bold text-xl text-center ">
                  درحال حاضر سبد خرید خالیه🫡
                </span>
                <Link
                  to="/shop"
                  className="btn-secondary px-4 py-2 hover:bg-accent text-sm"
                >
                  برگشت به فروشگاه
                </Link>
              </div>
            ) : (
              //  right
              <>
                <div className="w-full lg:w-[60%]">
                  <div className="bg-white rounded-xl border-box py-4 px-6">
                    <div className="w-full  overflow-x-auto scroll">
                      <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-sm md:text-md text-[#444444] uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3" />
                            <th scope="col" className="px-6 py-3" />
                            <th scope="col" className="px-6 py-3">
                              محصول
                            </th>
                            <th scope="col" className="px-6 py-3">
                              قیمت
                            </th>
                            <th scope="col" className="px-6 py-3">
                              تعداد
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                              جمع جزء
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((pro) => (
                            <RowTabel {...pro} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* box */}
                  <div className="bg-white mt-4 p-4 border-box rounded-xl">
                    <label
                      for="search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                      <input
                        type="text"
                        id=""
                        className="block w-full p-4 ps-10 text-sm text-gray-900 ring-1 ring-[#d8d8d8] border-gray rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="کد تخفیف"
                        required
                      />
                      <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-g-secondary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        اعمال کد تخفیف
                      </button>
                    </div>
                  </div>
                </div>
                {/* left */}
                <div className="w-full lg:w-[40%]">
                  <div className="bg-white rounded-xl border-box py-4 px-6">
                    <h4 className="title-cart-18 font-semibold">
                      جمع کل سبد خرید
                    </h4>
                    <div className="flex flex-col gap-3 mt-4 ">
                      <div className="flex justify-between items-center *:font-yekanbakh-bold *:text-sm">
                        <span>جمع جزء</span>
                        <span className="text-g-secondary ">
                          {totalCart.toLocaleString("fa")} تومان
                        </span>
                      </div>
                      <hr className="text-[#D5D8DC]" />
                      <div className="flex justify-between items-center *:font-yekanbakh-bold *:text-sm">
                        <span>مجموع</span>
                        <span className="text-g-secondary">
                          {totalCart.toLocaleString("fa")} تومان
                        </span>
                      </div>
                      {/* button go to pay */}
                      <Link
                        className="btn-secondary py-2.5 justify-center mt-4 hover:bg-[#444444]"
                        to="/checkout"
                      >
                        ادامه جهت تسویه حساب
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
