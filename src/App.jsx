import { useRoutes } from "react-router-dom";
import Header, { contextHeader } from "./components/header/Header";
import { myRoutes } from "./routes";
import { useContext, useEffect, useLayoutEffect } from "react";

function App() {
  const routes = useRoutes(myRoutes);


  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [routes]);

  useEffect(() => {
    // console.log(showsSidebar);
  }, [routes]);
  return (
    <>
      <Header />
      {routes}
    </>
  );
}

export default App;
