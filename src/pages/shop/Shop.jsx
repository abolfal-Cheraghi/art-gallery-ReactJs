import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import ReactPaginate from "react-paginate";
import SelectBox from "../../components/select box/SelectBox";
import FilterBox from "../../components/sidebar filter/FilterBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProductList from "../../components/product list/ProductList";
import axios from "axios";
import { useGlobalData } from "../../hooks/useGlobalData";

export const contextShop = createContext(null);

export default function Shop() {
  const { categoryProducts } = useGlobalData();
  const [isPending, startTranstion] = useTransition();
  const [DataProducts, setDataProducts] = useState([]);
  const params = useParams();
  const { search } = useLocation();
  const searchURL = new URLSearchParams(search);
  const navigate = useNavigate();
  const [pageCount, setPageCount] = useState();
  const [queries_params, set_queries_params] = useState({
    query: null,
    params: null,
  });
  const [filterByOrder, setFilterByOrder] = useState("");
  const [disabled_btnFilter, setDisabled_btnFilter] = useState(false);

  // function fetch data product

  const fetchProduct = async (url) => {
    try {
      const response = await fetch(`http://localhost:5000/products${url}`);
      const data = await response.json();
      setDataProducts(data.data);
      setPageCount(data.pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Each time the route changes, the filter state is sorted by = with ""
    setFilterByOrder("");
    // get query params and params and save to state
    set_queries_params(() => {
      const update = { query: searchURL.get("brand"), params: params["*"] };
      return update;
    });

    // get data products
    startTranstion(() => {
      fetchProduct("?_page=1&_per_page=6");
      if (params["*"] === "" && searchURL["size"] === 0) {
        setDataProducts(DataProducts);
      } else {
        if (params["*"] !== "" && searchURL["size"] === 0) {
          fetchProduct(`?category_Value=${params["*"]}&_page=1&_per_page=6`);
        } else if (params["*"] === "" && searchURL["size"] !== 0) {
          fetchProduct(
            `?${
              searchURL.get("brand") !== null &&
              "brand=" + searchURL.get("brand")
            }&_page=1&_per_page=6`
          );
        } else if (params["*"] !== "" && searchURL["size"] !== 0) {
          fetchProduct(
            `?category_Value=${params["*"]}&${
              searchURL.get("brand") !== null &&
              "brand=" + searchURL.get("brand")
            }&_page=1&_per_page=6`
          );
        }
      }
    });
  }, [params]);

  // on chnage handler paginate
  const onChangePage = (e) => {
    setFilterByOrder("");
    startTranstion(() => {
      if (params["*"] === "" && searchURL["size"] === 0) {
        fetchProduct(`?_page=${e.selected + 1}&_per_page=6`);
      } else {
        if (params["*"] !== "" && searchURL["size"] === 0) {
          fetchProduct(
            `?category_Value=${params["*"]}&_page=${e.selected + 1}&_per_page=6`
          );
        } else if (params["*"] === "" && searchURL["size"] !== 0) {
          fetchProduct(
            `?${
              searchURL.get("brand") !== null &&
              "brand=" + searchURL.get("brand")
            }&_page=${e.selected + 1}&_per_page=6`
          );
        } else if (params["*"] !== "" && searchURL["size"] !== 0) {
          fetchProduct(
            `?category_Value=${params["*"]}&${
              searchURL.get("brand") !== null &&
              "brand=" + searchURL.get("brand")
            }&_page=${e.selected + 1}&_per_page=6`
          );
        }
      }
    });
  };

  // change select box category & brnad
  const changeSelect_category = useCallback((e) => {
    set_queries_params((prev) => {
      return { ...prev, params: e.target.value };
    });
    setDisabled_btnFilter(false);
  });
  const changeSelect_brand = useCallback((e) => {
    set_queries_params((prev) => {
      return { ...prev, query: e.target.value };
    });
    setDisabled_btnFilter(false);
  });

  // btn ApplyFilter_Handler and replace url
  const ApplyFilter_Handler = (e) => {
    if (disabled_btnFilter) {
      removeEventListener(e.target);
    } else {
      navigate(
        `/shop/${queries_params.params}${
          queries_params.query !== null ? "?brand=" + queries_params.query : ""
        }`
      );
      setDisabled_btnFilter(true);
    }
  };

  // select box change Handler order
  const changeOrder_Handler = (e) => {
    setFilterByOrder(e.target.value);
    console.log(e.target.value);
  };

  // when change is state filterByOrder
  useEffect(() => {
    startTranstion(() => {
      if (filterByOrder === "cheapest") {
        setDataProducts((prevData) => {
          const orderBy_cheapest = prevData.sort(
            (a, b) => parseInt(a.price) - b.price
          );
          return orderBy_cheapest;
        });
      } else if (filterByOrder === "most-expensive") {
        setDataProducts((prevData) => {
          const orderBy_MostExpensive = prevData.sort(
            (a, b) => parseInt(b.price) - parseInt(a.price)
          );
          return orderBy_MostExpensive;
        });
      } else if (filterByOrder === "oldest") {
        setDataProducts((prevData) => {
          const orderBy_oldest = prevData.sort(
            (a, b) => parseInt(a.id) - parseInt(b.id)
          );
          return orderBy_oldest;
        });
      } else if (filterByOrder === "newest") {
        setDataProducts((prevData) => {
          const orderBy_oldest = prevData.sort(
            (a, b) => parseInt(b.id) - parseInt(a.id)
          );
          return orderBy_oldest;
        });
      } else {
      }
    });
  }, [filterByOrder]);

  return (
    <>
      <section className="shop-page">
        <div className="container">
          {/* wrapper box */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* sidebar filter*/}
            <div className="right">
              <contextShop.Provider
                value={{
                  queries_params,
                  set_queries_params,
                  disabled_btnFilter,
                  setDisabled_btnFilter,
                }}
              >
                <div className="sticky top-8">
                  <FilterBox
                    onChange_category={changeSelect_category}
                    onChange_brand={changeSelect_brand}
                    Apply_filter={ApplyFilter_Handler}
                  />
                </div>
              </contextShop.Provider>
            </div>
            <div className="col-span-3 flex flex-col gap-7">
              {/* top box */}
              <div className="bg-white py-3 px-3.5 flex justify-between items-center rounded-lg border-box">
                <h2 className="font-rokh-bold text-[#444444] text-lg md:text-xl">
                  فروشگاه
                </h2>
                <SelectBox
                  label="مرتب سازی بر اساس..."
                  width="250px"
                  labelSelcted={filterByOrder === "" ? true : false}
                  onchange={changeOrder_Handler}
                >
                  <option value="cheapest">
                    بر اساس قیمت از ارزانترین به گرانترین
                  </option>
                  <option value="most-expensive">
                    بر اساس قیمت از گرانترین به ارزانترین
                  </option>
                  <option value="oldest">
                    بر اساس تاریخ از قدیمی ترین به جدیدترین
                  </option>
                  <option value="newest">
                    بر اساس تاریخ از جدیدترین به قدیمی ترین
                  </option>
                </SelectBox>
              </div>

              {/* wrapper products */}

              {isPending ? (
                "درحال ...."
              ) : (
                <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-3 pl-5">
                  {DataProducts.length === 0 ? (
                    <div
                      className="col-span-3 text-center my-14
                    "
                    >
                      چیزی یافت نشد🫡
                    </div>
                  ) : (
                    DataProducts.map((product) => (
                      <ProductList
                        key={product.id}
                        all={product}
                        {...product}
                      />
                    ))
                  )}
                </div>
              )}

              {/* pageinate box */}
              <ReactPaginate
                breakLabel="..."
                className="flex gap-6 items-center px-4 py-2 bg-white rounded-xl justify-center text-sm text-gray"
                nextClassName=""
                activeClassName=""
                activeLinkClassName=" text-g-secondary"
                pageLinkClassName="hover:text-g-secondary"
                previousClassName=""
                disabledClassName="opacity-30"
                nextLabel="بعدی"
                onPageChange={onChangePage}
                pageCount={pageCount}
                previousLabel="قبلی"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
