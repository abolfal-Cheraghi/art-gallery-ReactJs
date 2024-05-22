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

  useEffect(() => {
    set_queries_params(() => {
      const update = { query: searchURL.get("brand"), params: params["*"] };
      return update;
    });
    startTranstion(() => {
      axios
        .get("http://localhost:5000/products/?_page=1&_per_page=6")
        .then((res) => {
          setDataProducts(res.data.data);
          setPageCount(res.data.pages);
        });
      if (params["*"] === "" && searchURL["size"] === 0) {
        setDataProducts(DataProducts);
      } else {
        if (params["*"] !== "" && searchURL["size"] === 0) {
          axios
            .get(
              `http://localhost:5000/products/?category_Value=${params["*"]}&_page=1&_per_page=6`
            )
            .then((res) => {
              setDataProducts(res.data.data);
              setPageCount(res.data.pages);
            });
        } else if (params["*"] === "" && searchURL["size"] !== 0) {
          axios
            .get(
              `http://localhost:5000/products/?${
                searchURL.get("brand") !== null &&
                "brand=" + searchURL.get("brand")
              }&_page=1&_per_page=6`
            )
            .then((res) => {
              setDataProducts(res.data.data);
              setPageCount(res.data.pages);
            });
        } else if (params["*"] !== "" && searchURL["size"] !== 0) {
          axios
            .get(
              `http://localhost:5000/products/?category_Value=${params["*"]}&${
                searchURL.get("brand") !== null &&
                "brand=" + searchURL.get("brand")
              }&_page=1&_per_page=6`
            )
            .then((res) => {
              setDataProducts(res.data.data);
              setPageCount(res.data.pages);
            });
        }
      }
    });

    return () => {
      return;
    };
  }, [params]);

  // on chnage handler paginate
  const onChangePage = (e) => {
    startTranstion(() => {
      if (params["*"] === "" && searchURL["size"] === 0) {
        axios
          .get(
            `http://localhost:5000/products/?_page=${
              e.selected + 1
            }&_per_page=6`
          )
          .then((res) => {
            setDataProducts(res.data.data);
            setPageCount(res.data.pages);
          });
      } else {
        if (params["*"] !== "" && searchURL["size"] === 0) {
          axios
            .get(
              `http://localhost:5000/products/?category_Value=${
                params["*"]
              }&_page=${e.selected + 1}&_per_page=6`
            )
            .then((res) => {
              setDataProducts(res.data.data);
              setPageCount(res.data.pages);
            });
        } else if (params["*"] === "" && searchURL["size"] !== 0) {
          axios
            .get(
              `http://localhost:5000/products/?${
                searchURL.get("brand") !== null &&
                "brand=" + searchURL.get("brand")
              }&_page=${e.selected + 1}&_per_page=6`
            )
            .then((res) => {
              setDataProducts(res.data.data);

              setPageCount(res.data.pages);
            });
        } else if (params["*"] !== "" && searchURL["size"] !== 0) {
          axios
            .get(
              `http://localhost:5000/products/?category_Value=${params["*"]}&${
                searchURL.get("brand") !== null &&
                "brand=" + searchURL.get("brand")
              }&_page=${e.selected + 1}&_per_page=6`
            )
            .then((res) => {
              setDataProducts(res.data.data);

              setPageCount(res.data.pages);
            });
        }
      }
    });
  };

  // change select box category & brnad
  const changeSelect_category = useCallback((e) => {
    set_queries_params((prev) => {
      return { ...prev, params: e.target.value };
    });
  });
  const changeSelect_brand = useCallback((e) => {
    set_queries_params((prev) => {
      return { ...prev, query: e.target.value };
    });
  });

  // btn ApplyFilter_Handler and replace url
  const ApplyFilter_Handler = () => {
    // location.replace(
    //   `/shop/${queries_params.params}?brnad=${queries_params.query}`
    // );
    navigate(
      `/shop/${queries_params.params}${
        queries_params.query !== null ? "?brand=" + queries_params.query : ""
      }`
    );
  };
  return (
    <>
      <section className="shop-page">
        <div className="container">
          {/* wrapper box */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* sidebar filter*/}
            <div className="right">
              <contextShop.Provider
                value={{ queries_params, set_queries_params }}
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
                <SelectBox label="مرتب سازی بر اساس..." width="250px">
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
