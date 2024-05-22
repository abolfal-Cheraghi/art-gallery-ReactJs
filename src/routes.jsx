import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import OrderrRequest from "./pages/OrderrRequest";

import Articles from "./pages/articles/Articles";
import CategoryBlog from "./pages/articles/CategoryBlog";
import SignIn_And_Login from "./pages/auth/Sign&Login";
import Portfolios from "./pages/portfolio/Portfolios";
import SinglePagePortfolio from "./pages/portfolio/SinglePagePortfolio";
import Cart from "./pages/shop/Cart";
import Checkout from "./pages/shop/Checkout";
import Shop from "./pages/shop/Shop";
import SingleProduct from "./pages/shop/SingleProduct";

export const myRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/shop/*",
    element: <Shop />,
  },
  {
    path: "/product/:productID",
    element: <SingleProduct />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/blog",
    element: <Articles />,
  },
  {
    path: "/blog/category/:categoryID",
    element: <CategoryBlog />,
  },
  {
    path: "/order-request",
    element: <OrderrRequest />,
  },
  {
    path: "/portfolios",
    element: <Portfolios />,
  },
  {
    path: "/portfolio/:idPr",
    element: <SinglePagePortfolio />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/auth",
    element: <SignIn_And_Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
