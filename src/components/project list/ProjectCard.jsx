import React, { useState } from "react";
import { IoMdResize, IoMdColorPalette } from "react-icons/io";
import { GiWoodFrame } from "react-icons/gi";
import { IoEye } from "react-icons/io5";
import { Link } from "react-router-dom";
export default function ProjectCard(props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="container-card-projects"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-[#E65757] p-2 rounded-2xl bg-[url('./bg-card-pr.png')]  bg-center bg-cover">
        <div className="flex flex-nowrap gap-2">
          <div
            className={`right w-[80%] flex items-center justify-center relative overflow-hidden before:content-[''] before:flex before:items-center before:justify-center before:text-white before:text-s-13  before:duration-300 before:absolute before:top-0 before:right-0 before:h-full before:w-full before:z-20 ${
              isHovered ? " before:bg-black/35" : ""
            } duration-300 rounded-xl z-10`}
          >
            <img
              src={props.imgPr}
              alt={props.titlePr}
              className="border-4 h-[190px] w-full object-center object-cover border-white rounded-xl"
            />
            {isHovered && (
              <div className="absolute top-0 right-0 h-full w-full duration-500 flex items-center justify-center text-white z-20 text-s-13">
                <Link
                  to={`/portfolio/${props.id}`}
                  className="flex items-center gap-2"
                >
                  <IoEye size="16px" />
                  مشاهده کار
                </Link>
              </div>
            )}
          </div>
          <div className="right w-[20%] flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-2 text-white text-s-13">
              <span className="flex gap-1 items-center ">
                <IoMdResize className="fill-white" size="18px" /> سایز :
              </span>
              <span className="flex gap-1 items-center ">
                {props.overview["size"]}
              </span>
            </div>

            <div className="flex flex-col gap-2 text-white text-s-13">
              <span className="flex gap-1 items-center ">
                <IoMdColorPalette className="fill-white" size="18px" /> نوع طرح
                :
              </span>
              <span className="flex gap-1 items-center ">
                {props.overview["DesignType"]}
              </span>
            </div>

            <div className="flex flex-col gap-2 text-white text-xs">
              <span className="flex gap-1 items-center text-xs ">
                <GiWoodFrame className="fill-white" size="16px" /> نوع قالب :
              </span>
              <span className="flex gap-1 items-center text-xs ">
                {props.overview["FormatType"]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
