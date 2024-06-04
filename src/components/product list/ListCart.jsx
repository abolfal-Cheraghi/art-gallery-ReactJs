import React, { useCallback, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGlobalData } from "../../hooks/useGlobalData";

export default function ListCart(props) {
  const { removeTo_Cart } = useGlobalData();

  const container_cartList = useRef();
  const removeTo_cart_Handler = () => {
    removeTo_Cart(props.id);
  };
  return (
    <div
      className="container-list-cart duration-500 ease-in "
      ref={container_cartList}
    >
      <div className="flex justify-between items-center">
        <div className="w-9/12 flex gap-3 items-center">
          <img src={props.img} alt="" className="w-24" />
          <div className="flex flex-col gap-3">
            <Link to={`/product/${props.id}`} className="title-cart-15 text-sm">
              {props.name}
            </Link>
            {/* price and quantity */}
            <div className="flex gap-1 text-gray text-xs">
              <span className="text-g-secondary">{props.quantity}</span>{" "}
              <span className="text-g-secondary">&times;</span>
              <span>{props.finalPrice} تومان</span>
            </div>
          </div>
        </div>
        <div className="3/12">
          <button
            type="button"
            className="border rounded-full p-[1.5px] "
            onClick={removeTo_cart_Handler}
          >
            <IoMdClose size="14px" />
          </button>
        </div>
      </div>
    </div>
  );
}
