import React, { useState } from "react";
import useDarkSide from "../hooks/useDarkSide";
import { toast } from "react-toastify";

// import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = () => {
    setTheme(colorTheme);
    setDarkSide(!darkSide);
    7;
    toast("🦄 Wow so easy!", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <div>
        {/* <DarkModeSwitch
          checked={darkSide}
          onChange={toggleDarkMode}
          size={56}
        /> */}
        <button onClick={toggleDarkMode}>{darkSide ? "روشن" : "تاریک"}</button>
      </div>
    </>
  );
}
