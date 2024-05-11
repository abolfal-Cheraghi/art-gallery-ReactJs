import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import { useGlobalData } from "../../hooks/useGlobalData";
export default function SearchBox() {
  const [selectSearch, setSelectSearch] = useState("دسته بندی ها");
  const [toggle_selectBox, setToggle_selectBox] = useState(false);
  //get data categories from context
  const { categoryProducts } = useGlobalData();
  return (
    <form action="" className="lg:min-w-[500px]">
      <div className="container-search-box w-full">
        <div className="min-h-[40px] bg-[#E4E8F3] flex items-center justify-between rounded-xl p-[6px] w-full">
          {/* input  search*/}
          <div className="w-7/12 sm:w-10/12 md:w-8/12 md:w- flex items-center gap-1 ">
            <IoIosSearch className="fill-gray" size="19px" />
            <input
              type="search"
              id=""
              role="search"
              className="shadow-none outline-none bg-inherit text-xs"
              placeholder="جستجو کنید ..."
            />
          </div>

          {/* select box */}
          <div className="w-5/12 sm:w-2/12 md:w-4/12  flex flex-col relative">
            <button
              type="button"
              onClick={() => {
                setToggle_selectBox(!toggle_selectBox);
              }}
              className="btn-secondary flex justify-between min-w-32  px-4 py-2 text-s-10 md:text-xs"
            >
              <span>{selectSearch}</span>
              <TiArrowSortedDown size="18px" />
            </button>
            <div className="container-select-box">
              <div
                className={`duration-700 ${
                  toggle_selectBox
                    ? " flex items-center justify-start"
                    : "  hidden"
                } bg-white shadow-lg rounded-xl p-1 w-[100%] absolute mt-4`}
              >
                <ul className="flex flex-col gap-2 w-full text-s-13 text-gray font-yekanbakh-bold">
                  {categoryProducts.map((item) => (
                    <li
                      key={item.id}
                      value={item.category_Value}
                      className={`cursor-pointer p-2 rounded-lg hover:bg-g-secondary hover:text-white ${
                        selectSearch === item.category &&
                        "bg-g-secondary text-white"
                      }`}
                      onClick={(e) => {
                        setSelectSearch(item.category);
                        setToggle_selectBox(false)
                      }}
                    >
                      {item.category}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
