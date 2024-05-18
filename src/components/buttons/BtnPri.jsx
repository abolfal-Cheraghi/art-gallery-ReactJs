import React from "react";
import { Link } from "react-router-dom";

export default function BtnPri(props) {
  return (
    <div>
      <Link
        to={props.link}
        className={`btn-primary w-fit px-6 flex items-center justify-center gap-2 ${props.className} `}
      >
        <span>{props.text}</span>
        {props.children}
      </Link>
    </div>
  );
}
