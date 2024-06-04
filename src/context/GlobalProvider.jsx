import axios from "axios";
import React, {
  createContext,
  memo,
  useCallback,
  useEffect,
  useRef,
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
  // const ListFavorate_ProductRef = useRef(ListFavorate_Product);
  // list cart
  const [cart, setCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);

  const updateLocalstorage_fav = useCallback(() => {
    localStorage.setItem("listFavorate", JSON.stringify(ListFavorate_Product));
  }, [ListFavorate_Product]);

  // when is changed list carts
  useEffect(() => {
    if (cart.length !== 0) {
      const arrayPrice = cart.map((i) => i.finalPrice * i.quantity);
      const total = arrayPrice.reduce((prev, current) => prev + current, 0);
      setTotalCart(total);
    } else {
      setTotalCart(0);
    }
  }, [cart]);
  /* functions 
  add to cart 
  & remove to cart 
  & remove All */
  const addToCart = useCallback((newObject) => {
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
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  });
  const removeTo_Cart = useCallback((id) => {
    setCart((prevState) => {
      const updatedCart = prevState.map((item) => {
        if (item.id === id) {
          if (item.quantity === 1 || item.quantity === 0) {
            return null; // Remove this item from the cart
          } else {
            return { ...item, quantity: item.quantity - 1 }; // Decrease the quantity of this item
          }
        }
        return item;
      });

      return updatedCart.filter((item) => item !== null); // Remove null items from the cart
    });
  });

  // function change quantity
  const changeQuantity_Cart = useCallback((id, quantityUpdata) => {
    if (quantityUpdata === 0) {
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
    } else {
      setCart((prev) => {
        const updatedCart = prev.map((product) => {
          if (product.id === id) {
            return { ...product, quantity: Number(quantityUpdata) };
          } else {
            return product;
          }
        });
        return updatedCart;
      });
    }
  });
  // function removeAll_cart() {}
  const isTo_cart = useCallback((id) => {
    if (!cart.some((i) => i.id === id)) {
      return false;
    } else {
      return true;
    }
  });
  // Added to localstorage when an item is added to the cart
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

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
      autoClose: 2000,
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
      autoClose: 2000,
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
    // get list cart | localstorage
    // const cartData = localStorage.getItem("cart");
    // setCart(cartData ? JSON.parse(cartData) : []);

    // get list favorate | localstorage
    setListFavorate_Product((setListFavorate_Product, ListFavorate_Product) => {
      return JSON.parse(localStorage.getItem("listFavorate"));
    });
  }, []);

  useEffect(() => {
    updateLocalstorage_fav();
  }, [ListFavorate_Product, updateLocalstorage_fav]);

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
        changeQuantity_Cart,
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
    </globalContext.Provider>
  );
}
export default memo(GlobalProvider);
