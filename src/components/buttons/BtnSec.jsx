import React from "react";
import { Link } from "react-router-dom";

export default function BtnSec(props) {
  return (
    <div>
      <Link
        to={props.link}
        className={`btn-secondary w-fit px-6 flex items-center justify-center gap-2 ${props.className} `}
      >
        <span>{props.text}</span>
        {props.children}
      </Link>
    </div>
  );
}
