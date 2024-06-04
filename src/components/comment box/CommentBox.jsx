import React from "react";
import { dateDifference } from "../../functions/dateDifference";

export default function CommentBox(props) {
  const d = new Date(props.date);
  return (
    <>
      <div class="p-3 ml-3 my-3">
        <div class="flex gap-3 items-center">
          <img
            src="/userIcon.png"
            class="object-cover w-8 h-8 rounded-full 
                            border-2 border-emerald-400 shadow-emerald-400
                            "
          />

          <div className="flex flex-col">
            <h3 class="font-bold text-sm text-accent">{props.name}</h3>
            <span className="text-xs">{dateDifference(d)} پیش </span>
          </div>
        </div>

        <p class="text-gray/100 mt-2 text-s-13 bg-[#eeeeee] p-3 rounded-xl rounded-tr-none">
          {props.comment}
        </p>
        {props.reaply["Answer"] !== null && (
          <div className="box-reaply relative">
            <div className="h-[50px] w-[10%] border-b-2 border-r-2 border-g-secondary rounded-br-xl mr-5" />
            <div class="text-gray/100 mt-2 text-s-13 bg-[#eeeeee] p-3 rounded-xl absolute top-5 right-14">
              <span className="bg-accent text-white px-2 rounded-lg text-xs">
                فروشگاه
              </span>
              <p className="mt-1.5">{props.reaply["Answer"]}</p>
            </div>
          </div>
        )}
      </div>
      {/* <hr className="mt-4 text-gray"/> */}
    </>
  );
}
