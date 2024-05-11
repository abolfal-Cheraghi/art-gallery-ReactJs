import React, { useState } from "react";
import useDarkSide from "../hooks/useDarkSide";

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = () => {
    setTheme(colorTheme);
    setDarkSide(!darkSide);
  };

  return (
    <>
      <div>
        <button onClick={toggleDarkMode}>{darkSide ? "روشن" : "تاریک"}</button>
      </div>
    </>
  );
}
