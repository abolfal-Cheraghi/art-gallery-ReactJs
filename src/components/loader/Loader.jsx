import React from "react";
import "./Loader.css";
export default function Loader() {
  return (
    <>
      <svg width="240" height="240" className="pl" viewBox="0 0 240 240">
        <circle
          cx="120"
          cy="120"
          r="105"
          fill="none"
          stroke="#000"
          strokeDasharray="0 660"
          strokeDashoffset="-330"
          strokeLinecap="round"
          strokeWidth="20"
          className="pl__ring pl__ring--a"
        ></circle>
        <circle
          cx="120"
          cy="120"
          r="35"
          fill="none"
          stroke="#000"
          strokeDasharray="0 220"
          strokeDashoffset="-110"
          strokeLinecap="round"
          strokeWidth="20"
          className="pl__ring pl__ring--b"
        ></circle>
        <circle
          cx="85"
          cy="120"
          r="70"
          fill="none"
          stroke="#000"
          strokeDasharray="0 440"
          strokeLinecap="round"
          strokeWidth="20"
          className="pl__ring pl__ring--c"
        ></circle>
        <circle
          cx="155"
          cy="120"
          r="70"
          fill="none"
          stroke="#000"
          strokeDasharray="0 440"
          strokeLinecap="round"
          strokeWidth="20"
          className="pl__ring pl__ring--d"
        ></circle>
      </svg>
    </>
  );
}
