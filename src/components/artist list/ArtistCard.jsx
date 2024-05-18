import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa6";

export default function ArtistCard(props) {
  const countStars = props.stars;

  return (
    <div className="container-list-artists w-full">
      <div className="bg-white rounded-3xl shadow-cart p-3 relative before:content-[''] before:h-full before:w-[35%] before:absolute before:left-0 before:top-0 before:bg-shape-flower-right before:bg-cover before:bg-center before:opacity-30">
        <div className="flex flex-nowrap gap-4">
          <div className="flex w-4/12 flex-col gap-2 items-center">
            <img
              src={props.img}
              alt={props.fullName}
              className="h-[120px] object-cover object-center rounded-2xl"
            />
            {/* icon stars*/}
            <div className="flex gap-1">
              <FaStar size="14px" className="fill-[#E3BD35]" />
              <FaStar size="14px" className="fill-[#E3BD35]" />
              <FaStar size="14px" className="fill-[#E3BD35]" />
              <FaStar size="14px" className="fill-[#E3BD35]" />
              <FaStar size="14px" className="fill-[#CCD6DF]" />
              {/* {countStars.map((i) => (
                <FaStar size="14px" className="fill-[#E3BD35]" />
              ))} */}
            </div>
          </div>
          <div className="flex w-8/12 flex-col gap-1">
            <h4 className="title-cart-18 font-rokh-bold">{props.fullName}</h4>
            <p
              className="paragraph text-s-11 md:text-xs"
              style={{ lineHeight: "20px" }}
            >
              {props.about}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
