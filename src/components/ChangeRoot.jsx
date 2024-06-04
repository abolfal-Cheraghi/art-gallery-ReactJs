import React, { useEffect, useState } from "react";
import { useGlobalData } from "../hooks/useGlobalData";
import { Navigate } from "react-router-dom";

export default function ChangeRoot_checkout(props) {
  const { cart } = useGlobalData();
  const [showPage, setShowPage] = useState(true);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev > 0 && prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowPage(false);
    }
  }, [timeLeft]);

  if (cart.length === 0) {
    if (showPage) {
      return (
        <>
          {props.children}
          <div className="text-center text-lg font-bold text-accent mt-10">
            برگشت به فروشگاه تا
            <span className="text-g-secondary"> {`00:0${timeLeft}`}</span>
          </div>
        </>
      );
    } else {
      return <Navigate to="/shop" replace />;
    }
  } else {
    return <>{props.children}</>;
  }
}
