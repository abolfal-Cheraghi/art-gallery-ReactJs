import React, { useState } from "react";
import { useGlobalData } from "../../hooks/useGlobalData";
import { cities } from "../../data/Cities";
export default function Checkout() {
  const { cart, totalCart } = useGlobalData();
  const [show_, setShoW_] = useState(false);

  // submit
  const submitHandler = async (dataForm) => {
    // console.log(true);
    console.log(dataForm.get("LastName"));
  };
  return (
    <section className="checkout-page">
      <div className="container">
        {cart.length === 0 ? (
          <h2 className="title-box text-center mt-20">
            متاسفانه محصولی در سبد خرید نیست که بخوایید پرداخت کنید 😒
          </h2>
        ) : (
          // wrapper boxes
          <div className="flex flex-wrap lg:flex-nowrap gap-6">
            {/* right */}
            <div className="w-full lg:w-7/12 flex flex-col gap-6">
              {/* form checkout */}
              <div className="bg-white py-4 px-6 rounded-2xl border-box">
                {/* title box */}
                <h2 className="font-rokh md:text-lg text-accent">
                  جزئیات صورتحساب
                </h2>

                {/* form */}
                <form action={submitHandler} className="mt-5">
                  {/* wrapper form */}
                  <div className="flex flex-col gap-6">
                    {/* first inputs */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* input first name */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="FirstName"
                          className="font-rokh text-accent text-md"
                        >
                          نام <i className="text-g-primary">*</i>
                        </label>
                        <input
                          type="text"
                          name="FirstName"
                          id="FirstName"
                          defaultValue={""}
                          placeholder="نام"
                          className="rounded-2xl bg-[#eee] placeholder:text-xs focus:outline-0 focus:bottom-0 focus:shadow-none"
                        />
                      </div>
                      {/* input last name */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="LastName"
                          className="font-rokh text-accent"
                        >
                          نام خانوادگی <i className="text-g-primary">*</i>
                        </label>
                        <input
                          type="text"
                          name="LastName"
                          id="LastName"
                          defaultValue={""}
                          placeholder="نام خانوادگی"
                          className="rounded-2xl bg-[#eee] placeholder:text-xs focus:outline-0 focus:bottom-0 focus:shadow-none"
                        />
                      </div>
                    </div>
                    {/* input name your company */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="CompanyName"
                        className="font-rokh text-accent"
                      >
                        نام شرکت (اختیاری)
                      </label>
                      <input
                        type="text"
                        name="CompanyName"
                        id="CompanyName"
                        defaultValue={""}
                        placeholder="نام شرکت"
                        className="rounded-2xl bg-[#eee] placeholder:text-xs focus:outline-0 focus:bottom-0 focus:shadow-none"
                      />
                    </div>

                    {/* your cuntry default */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="YourCountry"
                        className="font-rokh text-accent"
                      >
                        کشور / منطقه <i className="text-g-primary">*</i>
                      </label>
                      <span className="text-sm text-gray" id="YourCountry">
                        ایران
                      </span>
                    </div>

                    {/*  */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="" className="font-rokh text-accent">
                        استان <i className="text-g-primary">*</i>
                      </label>
                      <input
                        type="text"
                        name="LastName"
                        id="LastName"
                        defaultValue={""}
                        className="rounded-2xl bg-[#eee] placeholder:text-xs focus:outline-0 focus:bottom-0 focus:shadow-none"
                      />
                    </div>

                    {/* your city */}
                    <div className="flex flex-col gap-1">
                      <label htmlFor="City" className="font-rokh text-accent">
                        شهر <i className="text-g-primary">*</i>
                      </label>
                      <input
                        type="text"
                        name="City"
                        id="City"
                        defaultValue={""}
                        className="rounded-2xl bg-[#eee] placeholder:text-xs focus:outline-0 focus:bottom-0 focus:shadow-none"
                      />
                    </div>

                    {/* address */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="Address"
                        className="font-rokh text-accent"
                      >
                        آدرس خیابان <i className="text-g-primary">*</i>
                      </label>
                      <input
                        type="text"
                        name="Address"
                        id="Address"
                        defaultValue={""}
                        placeholder="نام خیابان و پلاک خانه"
                        className="rounded-2xl bg-[#eee] placeholder:text-xs focus:outline-0 focus:bottom-0 focus:shadow-none"
                      />
                      <input
                        type="text"
                        name="YourApartment"
                        id="YourApartment"
                        defaultValue={""}
                        placeholder=" اپارتمان , واحدم مجتمع و..."
                        className="rounded-2xl bg-[#eee] mt-2 placeholder:text-xs focus:outline-0 focus:bottom-0 focus:shadow-none"
                      />
                    </div>

                    {/* postal code */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="PostalCode"
                        className="font-rokh text-accent"
                      >
                        کدپستی (بدون فاصله) <i className="text-g-primary">*</i>
                      </label>
                      <input
                        type="text"
                        name="PostalCode"
                        id="PostalCode"
                        defaultValue={""}
                        placeholder=""
                        className="rounded-2xl bg-[#eee] placeholder:text-xs focus:outline-0 focus:bottom-0 focus:shadow-none"
                      />
                    </div>

                    {/* phone number */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="PhoneNumber"
                        className="font-rokh text-accent"
                      >
                        تلفن <i className="text-g-primary">*</i>
                      </label>
                      <input
                        type="text"
                        name="PhoneNumber"
                        id="PhoneNumber"
                        defaultValue={""}
                        placeholder="شماره تلفن در دسترس وارد نمایید"
                        dir="ltr"
                        className="rounded-2xl bg-[#eee] placeholder:text-xs focus:outline-0 focus:bottom-0 focus:shadow-none"
                      />
                    </div>
                  </div>
                  <button type="submit">eee</button>
                </form>
              </div>
              {/* box descreption */}
              <div className="bg-white py-4 px-6 rounded-2xl border-box">
                <textarea
                  rows={7}
                  className="w-full rounded-2xl bg-[#eee] placeholder:text-sm"
                  placeholder="چه درخواستی دارید ؟"
                />
              </div>
            </div>
            {/* box description */}
            {/* left */}
            <div className="w-full lg:w-5/12 flex flex-col gap-6">
              {/* box  show cart and total price*/}
              <div className="bg-white py-4 px-6 rounded-2xl border-box">
                {/* title box */}
                <h2 className="font-rokh md:text-lg text-accent">سفارش شما</h2>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="*:font-yekanbakh *:text-s-13 *:text-[#333333]">
                      <th scope="col" className="px-6 py-3">
                        محصول
                      </th>
                      <th scope="col" className="px-6 py-3">
                        جمع جزء
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr className=" border-b border-b-[#eeeeee] *:font-yekanbakh *:text-s-13 *:text-[#333333]">
                        <td className="px-6 py-4">{item.name}</td>
                        <td className="px-6 py-4">
                          {Number(item.finalPrice).toLocaleString("fa")} تومان
                        </td>
                      </tr>
                    ))}
                    <tr className=" border-b border-b-[#eeeeee] *:font-yekanbakh-bold *:text-s-13 *:text-accent">
                      <td className="px-6 py-4">جمع جزء</td>
                      <td className="px-6 py-4">
                        {Number(totalCart).toLocaleString("fa")} تومان
                      </td>
                    </tr>
                    <tr className=" *:font-yekanbakh-bold *:text-s-13 *:text-accent">
                      <td className="px-6 py-4">مجموع</td>
                      <td className="px-6 py-4">
                        {Number(totalCart).toLocaleString("fa")} تومان
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* box kopon*/}
              <div
                className={`bg-white py-4 px-6 rounded-2xl border-box overflow-hidden `}
              >
                <span className="font-rokh"> کد تخفیف دارید؟ </span>
                <button
                  type="button"
                  className="text-g-secondary"
                  onClick={() => {
                    setShoW_(!show_);
                  }}
                >
                  برای نوشتن کد اینجا کلیک کنید
                </button>
                <div
                  className={`mt-5 duration-500 ${
                    show_ ? "scale-y-100" : "scale-y-0"
                  }`}
                >
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
                      className="block w-full px-4 py-6 ps-10 text-sm text-gray-900 ring-1 ring-[#d8d8d8] border-gray rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              {/* box end of checkout */}
              <div className="bg-white py-4 px-6 rounded-2xl border-box">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray leading-5">
                    با عرض پوزش به نظر میرسد هیچ روش پرداختی موجود نیست .اگر
                    نیاز به کمک دارید یا میخواهید ترتیبات دیگری را انجام دهید با
                    ما تماس بگیرید.
                  </p>

                  <p className="text-xs text-gray font-yekanbakh-bold leading-5 mt-10">
                    اطلاعات شخصی شما برای پرازش سفارش شما ، پشتیبانی از تجربه
                    شما در سراسر این وبسایت وبرای اهدافی که در{" "}
                    <span className="text-g-secondary font-[inherit]">
                      سیاست حفظ حریم خصوصی
                    </span>
                    ذکر شده است استفاده میشود.
                  </p>

                  {/* button go to payment */}
                  {/* <button
                    type="submit"
                    onClick={submitHandler}
                    className="btn-secondary justify-center py-2.5 hover:bg-accent"
                  >
                    ثبت سفارش
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
