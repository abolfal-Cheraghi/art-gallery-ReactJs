import axios from "axios";
import React, {
  createContext,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import discountPrice from "../functions/discountPrice";
import { ToastContainer, toast } from "react-toastify";
export const globalContext = createContext(null);

function GlobalProvider({ children }) {
  // state menu navbar
  const [menuNavbar, setMenuNavber] = useState([]);
  // state data categories of products
  const [categoryProducts, setCategoryProducts] = useState([]);
  // state toggle side bar navbar & cart
  const [showsSidebar, setShowSidebar] = useState(false);
  const [showsSidebarCart, setShowSidebarCart] = useState(false);
  // state data products & discounts
  const [products, setProducts] = useState([]);
  const [productsDiscount, setProductsDiscounts] = useState([]);
  // state data our artist
  const [ourArtists, setOurArtists] = useState([]);
  // state data our project
  const [ourProjects, setOurProjects] = useState([]);
  // state list our projects image
  const [ourProjects_Img, setOurProjects_Img] = useState([]);
  // pending all state global
  const [isPending, setIsPending] = useState(true);
  // list favorate products
  const [ListFavorate_Product, setListFavorate_Product] = useState([]);

  // list cart
  const [cart, setCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

  // when is changed list carts
  useEffect(() => {
    if (cart.length !== 0) {
      const arrayPrice = cart.map((i) => i.finalPrice * i.quantity);
      const total = arrayPrice.reduce((prev, current) => prev + current, 0);
      setTotalCart(total);
    }
  }, [cart]);
  /* functions 
  add to cart 
  & remove to cart 
  & remove All */
  const addToCart = (newObject) => {
    const existingItem = cart.find((item) => item.id === newObject.id);

    if (!existingItem) {
      const { perecentageValue, finalValue } = discountPrice(
        newObject.price,
        newObject.discount
      );
      setCart((prevItems) => [
        ...prevItems,
        { ...newObject, quantity: 1, finalPrice: finalValue },
      ]);
    } else {
      const updatedCart = cart.map((item) =>
        item.id === newObject.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    }

    toast.success("محصول به سبد خرید اضافه شد.", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  function removeTo_Cart(id) {
    setCart((prevState) => {
      const updatedCart = prevState.map((item) => {
        if (item.id === id) {
          if (item.quantity === 1) {
            return null; // Remove this item from the cart
          } else {
            return { ...item, quantity: item.quantity - 1 }; // Decrease the quantity of this item
          }
        }
        return item;
      });

      return updatedCart.filter((item) => item !== null); // Remove null items from the cart
    });
  }
  // function removeAll_cart() {}
  function isTo_cart(id) {
    if (!cart.some((i) => i.id === id)) {
      return false;
    } else {
      return true;
    }
  }

  /*functions
  add to list favorate , 
  remove to List ,
  is to list
  */

  // Add to list favorate function
  const AddToList_favorate = (product) => {
    setListFavorate_Product((prevList) => {
      if (!prevList.some((i) => i.id === product.id)) {
        return [...prevList, product];
      } else {
        return prevList;
      }
    });
    toast.success("محصول به لیست علاقه مندی ها اضافه شد.", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // Remove to list favorate function
  const RemoveToList_favorate = (id_product) => {
    setListFavorate_Product((prevList) => {
      return prevList.filter((item) => item.id !== id_product);
    });
    toast.success("محصول از لیست علاقه مندی ها حذف شد.", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // is Save to list ? function
  const isSaveTo_favorate = (id_product) => {
    if (ListFavorate_Product.some((i) => i.id === id_product)) {
      return true;
    }
    return false;
  };

  // useEfeect when update is list favorate
  useEffect(() => {
    // get list favorate | localstorage
    setListFavorate_Product(() => {
      const listF = localStorage.getItem("listFavorate");
      return JSON.parse(listF);
    });

    localStorage.setItem("listFavorate", JSON.stringify(ListFavorate_Product));
  }, [ListFavorate_Product]);

  // useEffect update list favorate
  useEffect(() => {}, [ListFavorate_Product]);
  // useEfect  un mount web
  const getDataCallback = useCallback(() => {
    axios.get("http://localhost:5000/menu").then((res) => {
      setMenuNavber(res.data[0].itemsMenu);
      setIsPending((prev) => {
        return prev ? prev : false;
      });
    });
    // get category products
    axios.get("http://localhost:5000/category_products").then((res) => {
      setCategoryProducts(res.data);
      setIsPending((prev) => {
        return prev ? prev : false;
      });
    });

    // get all info products & Discounts
    axios.get("http://localhost:5000/products").then((res) => {
      setProducts(res.data);
      setProductsDiscounts(() => {
        return res.data.filter((product) => product.discount !== null);
      });
      setIsPending((prev) => {
        return prev ? prev : false;
      });
    });

    // get all info our artist
    axios.get("http://localhost:5000/ourArtists").then((res) => {
      setOurArtists(res.data);
      setIsPending((prev) => {
        return prev ? prev : false;
      });
    });
    // get all info our projects
    axios.get("http://localhost:5000/projects").then((res) => {
      setOurProjects(res.data);
      res.data.map((project) => {
        setOurProjects_Img((prev) => {
          return [...prev, project.imgPr];
        });
      });
      setIsPending((prev) => {
        return prev ? prev : false;
      });
    });
  }, []);

  useEffect(() => {
    getDataCallback();
  }, []);

  return (
    <globalContext.Provider
      value={{
        // list menu navbar
        menuNavbar,
        // category products
        categoryProducts,
        // side bar b=navbar
        showsSidebar,
        setShowSidebar,
        // products & discount
        products,
        productsDiscount,
        // sidebar cart
        showsSidebarCart,
        setShowSidebarCart,

        // functions cart
        cart,
        lengthCart: cart.length,
        totalCart,
        addToCart,
        removeTo_Cart,
        // removeAll_cart,
        isTo_cart,

        // data info our artist
        ourArtists,
        // data info our projects and list img
        ourProjects,
        ourProjects_Img,
        // is pending datas
        isPending,

        // list favorate function
        isSaveTo_favorate,
        RemoveToList_favorate,
        AddToList_favorate,
      }}
    >
      {children}

      {/* toastify |When a product is added to the cart  */}
      <ToastContainer rtl />
    </globalContext.Provider>
  );
}
export default memo(GlobalProvider);
