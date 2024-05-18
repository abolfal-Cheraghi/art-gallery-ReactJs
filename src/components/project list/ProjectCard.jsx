import React from "react";
import { IoMdResize, IoMdColorPalette } from "react-icons/io";

export default function ProjectCard(props) {
  return (
    <div className="container-card-projects">
      <div className="bg-[#E25353] p-2 rounded-2xl bg-[url('./bg-card-pr.png')] bg-center bg-cover">
        <div className="flex flex-nowrap gap-2">
          <div className="right w-9/12 relative  before:content-[''] before:w-full before:h-full duration-300 hover:bg-black/50 rounded-xl">
            <img
              src={props.imgPr}
              alt={props.titlePr}
              className="border-4 border-white rounded-xl"
            />
          </div>
          <div className="right w-3/12 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-1 text-white text-s-13">
              <span className="flex gap-1 items-center ">
                <IoMdResize className="fill-white" size="16px" /> سایز :
              </span>
              <span className="flex gap-1 items-center ">
                {props.overview["size"]}
              </span>
            </div>

            <div className="flex flex-col gap-1 text-white text-s-13">
              <span className="flex gap-1 items-center ">
                <IoMdColorPalette className="fill-white" size="16px" /> نوع طرح
                :
              </span>
              <span className="flex gap-1 items-center ">
                {props.overview["DesignType"]}
              </span>
            </div>

            <div className="flex flex-col gap-1 text-white text-xs">
              <span className="flex gap-1 items-center text-xs ">
                <IoMdResize className="fill-white" size="14px" /> نوع قالب :
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
