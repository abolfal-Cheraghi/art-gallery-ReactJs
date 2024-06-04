import React, { useCallback, useContext, useEffect, useState } from "react";
import SelectBox from "../select box/SelectBox";
import { useGlobalData } from "../../hooks/useGlobalData";
import { brand_products } from "../../data/Brands";
import { contextShop } from "../../pages/shop/Shop";
import { useNavigate } from "react-router-dom";
// flowbit

export default function FilterBox(props) {
  const { categoryProducts } = useGlobalData();
  const { queries_params, set_queries_params, disabled_btnFilter } =
    useContext(contextShop);
  const [showBtn_removeFilter, setShowBtn_remove_filter] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (queries_params["query"] !== null && queries_params["brand"] !== null) {
      setShowBtn_remove_filter(true);
    } else {
      setShowBtn_remove_filter(false);
    }
  }, [queries_params]);

  // event onclick btn remove all filter
  const btnRemoveAll_filter = useCallback(() => {
    set_queries_params({ query: null, brand: null });
    navigate("/shop");
  });

  return (
    <>
      <div className="container-filter-box">
        {/* wrapper */}
        <div className="grid grid-cols-1 gap-6">
          {/* search field */}
          <div className="search-field-box flex flex-col gap-3">
            <input
              type="search"
              className="py-2 px-4 rounded-lg text-gray border-box r"
              placeholder="جستجوی محصولات"
            />
            <button
              type="button"
              className="bg-g-secondary text-white text-sm py-2.5 text-center rounded-lg"
            >
              جستجو کنید
            </button>
          </div>

          {/* filter box */}
          <div className="flex flex-col gap-3">
            {/* range price */}
            <div className="bg-white p-2 rounded-lg border-box">
              <div className="flex flex-col gap-3">
                <span className="font-yekanbakh-bold">فیلتر قیمت</span>
                {/* component range */}

                <div className="flex justify-center gap-2 text-gray text-s-13">
                  <span>{Number(0).toLocaleString("fa")} تومان</span>-
                  <span>{Number(1800000).toLocaleString("fa")} تومان</span>
                </div>
              </div>
            </div>

            {/* select box category and brands */}

            {/* category */}
            <SelectBox
              width="100%"
              label="دسته بندی محصولات ..."
              onchange={props.onChange_category}
              bg="bg-white"
              selected={queries_params.params === null ? true : false}
            >
              {categoryProducts.map((category, index) => (
                <option
                  key={index + 1}
                  value={category.category_Value}
                  selected={
                    queries_params.params === category.category_Value
                      ? true
                      : false
                  }
                >
                  {category.category}
                </option>
              ))}
            </SelectBox>

            {/* brands */}
            <SelectBox
              width="100%"
              label="برند محصولات..."
              onchange={props.onChange_brand}
              bg="bg-white"
              labelSelcted={queries_params.query === null ? true : false}
            >
              {brand_products.map((brand, index) => (
                <option
                  key={index + 1}
                  value={brand.value}
                  selected={queries_params.query === brand.value ? true : false}
                >
                  {brand.name}
                </option>
              ))}
            </SelectBox>

            {/* btn filter to ... */}
            <button
              type="button"
              className={`bg-g-secondary relative text-white text-sm py-2.5 text-center rounded-lg duration-500  ${
                disabled_btnFilter
                  ? "opacity-60 before:content-[] before:absolute before:h-[20px] before:w-fit before:py-1.5 before:px-3 before:bg-red-500 before:z-10 before:left-0"
                  : " hover:text-g-secondary hover:bg-white hover:outline hover:outline-1"
              }`}
              onClick={props.Apply_filter}
            >
              اعمال فیلتر ها
            </button>
            {showBtn_removeFilter && (
              <button
                type="button"
                className="w-full text-sm py-2.5 text-center rounded-lg duration-500  text-g-secondary bg-white outline outline-1 hover:bg-g-secondary hover:text-white"
                onClick={btnRemoveAll_filter}
              >
                حذف فیلتر ها
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
