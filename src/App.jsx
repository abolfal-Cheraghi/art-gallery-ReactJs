import { useLocation, useRoutes } from "react-router-dom";
import Header from "./components/header/Header";
import { myRoutes } from "./routes";
import { useEffect, useLayoutEffect } from "react";
import { useGlobalData } from "./hooks/useGlobalData";

function App() {
  const routes = useRoutes(myRoutes);
  const { showsSidebar, setShowSidebar, showsSidebarCart, setShowSidebarCart } =
    useGlobalData();
  const location = useLocation();

  useEffect(() => {
    setShowSidebar(false);
    setShowSidebarCart(false);
    window.scrollTo(0, 0);
    // return () => {
    //   const path = location.pathname;
    //   if (location.pathname === path) {
    //     return;
    //   } else {

    //   }
    // };
  }, [location.pathname]);

  return (
    <>
      <Header />
      {routes}
    </>
  );
}

export default App;
