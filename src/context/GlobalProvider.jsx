import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const globalContext = createContext(null);

export default function GlobalProvider({ children }) {
  const [menuNavbar, setMenuNavber] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  // useEfect  un mount web
  useEffect(() => {
    axios.get("http://localhost:5000/menu").then((res) => {
      setMenuNavber(res.data[0].itemsMenu);
    });
    // get category products
    axios.get("http://localhost:5000/category_products").then((res) => {
      setCategoryProducts(res.data);
    });
  }, []);

  return (
    <globalContext.Provider value={{ menuNavbar, categoryProducts }}>
      {children}
    </globalContext.Provider>
  );
}
