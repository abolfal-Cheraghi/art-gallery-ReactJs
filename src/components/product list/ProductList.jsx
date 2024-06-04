import React, { memo, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import "./ProductList.css";
import discountPrice from "../../functions/discountPrice";
import { useGlobalData } from "../../hooks/useGlobalData";
function ProductList(props) {
  const { perecentageValue, finalValue } = discountPrice(
    props.price,
    props.discount
  );
  const { addToCart } = useGlobalData();

  const handler_addToCart = useCallback(() => {
    addToCart(props.all);
  });

  return (
    <>
      <div className="container-product-cart ">
        <div className=" bg-white min-h-[340px] p-3 rounded-xl flex flex-col  gap-10">
          <div className="header-cart h-[200px] relative -left-5 top-4 ">
            {/* off box */}
            {props.discount !== null && (
              <div className="bg-accent px-2 py-1 rounded-b-xl absolute -top-2 left-5 text-white text-xs z-[2]">
                {props.discount}%
              </div>
            )}
            <img
              src={props.img}
              alt={props.altPic}
              className="h-full w-full object-contain shadow-cart border-2 border-accent rounded-xl scale-[1.1] bg-white"
            />
          </div>
          {/* inforamtion product */}
          <div className="content-box h-[80px] flex flex-col justify-between gap-3">
            <Link
              to={`/product/${props.id}`}
              className="title-cart-list-pr title-cart-15 line-clamp-1 w-[95%] relative"
            >
              {props.name}
            </Link>
            {/* box price and btn add to cart */}
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                {/* discount price */}

                {props.discount !== null && (
                  <span className="w-fit text-xs font text-gray relative before:content-[''] before:h-[0.5px] before:w-full before:bg-g-primary before:absolute before:top-[6px] before:rotate-[-7deg]">
                    {Number(props.price).toLocaleString("fa-ir")}
                  </span>
                )}

                <div className="flex items-center gap-1">
                  <span className="text-g-primary font-yekanbakh-bold">
                    {props.discount === null
                      ? Number(props.price).toLocaleString("fa-ir")
                      : finalValue.toLocaleString("fa-ir")}
                  </span>
                  <span className="text-gray text-xs">تومان</span>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="btn-primary py-1 px-3 text-xs rounded-lg font-yekanbakh"
                  onClick={handler_addToCart}
                >
                  خرید <HiShoppingBag className="fill-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(ProductList);
