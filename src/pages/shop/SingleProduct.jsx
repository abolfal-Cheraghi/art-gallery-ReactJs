import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
  Fragment,
} from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalData } from "../../hooks/useGlobalData";
import axios from "axios";
import discountPrice from "../../functions/discountPrice";
// import svg
import Icon_cars from "../../assets/svg/Icon_cars.svg";
import icon_Warranty from "../../assets/svg/icon_Warranty.svg";
import icon_compensation from "../../assets/svg/icon_compensation.svg";
import icon_box from "../../assets/svg/icon_boxes.svg";
// icon
import { FaCheckCircle, FaRandom } from "react-icons/fa";
import { GiRoundStar } from "react-icons/gi";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";
// flowbit tabs
import { Tabs } from "flowbite-react";
// tailwind component
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import DOMPurify from "dompurify";
import ProductList from "../../components/product list/ProductList";
import CommentBox from "../../components/comment box/CommentBox";
import { ToastContainer, toast } from "react-toastify";

export default function SingleProduct() {
  const params = useParams().productID;
  const {
    isTo_cart,
    removeTo_Cart,
    addToCart,
    isSaveTo_favorate,
    RemoveToList_favorate,
    AddToList_favorate,
    products,
  } = useGlobalData();
  const [isPending, startTranstion] = useTransition();
  const [isPending_Comment, setIsPending_Comment] = useState(false);
  const [dataProduct, setDataProdact] = useState({});
  const [comments, setComments] = useState([]);
  const [descList, setDescList] = useState([]);
  const { perecentageValue, finalValue } = discountPrice(
    dataProduct.price,
    dataProduct.discount
  );
  const imgRef = useRef(null);
  const [openModal_Img, setOpenModal_Img] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [tabActive, setTabActive] = useState("desc");
  const [dataForm_Comment, setDataForm_Comment] = useState({});
  var regexEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  var regexFa = /[\u0600-\u06FF]/;
  const getComment = useCallback(() => {
    axios
      .get(`http://localhost:5000/comments/?productID=${params}`)
      .then((res) => {
        setComments(res.data);
      });
  });
  useEffect(() => {
    // get data this product
    startTranstion(() => {
      axios.get(`http://localhost:5000/products/${params}`).then((res) => {
        setDataProdact(res.data);
        setDescList(res.data["short_desc"]);
        console.log(res.data);
      });
      // get coomment
      getComment();
    });
  }, [params]);

  useEffect(() => {
    // zoom img ref
    const img = imgRef.current;
    img.addEventListener("mousemove", handleMouseMove);
    img.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      img.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleMouseMove = useCallback((event) => {
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    img.style.transform = `scale(1.9) translate(${x - rect.width / 2}px, ${
      y - rect.height / 2
    }px)`;
  });
  const handleMouseLeave = useCallback(() => {
    const img = imgRef.current;
    img.style.transform = "scale(1) translate(0 , 0)";
  });

  // button handler full screen
  const handler_fullScreen = () => {
    if (document.fullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      var elem = document.documentElement;
      setIsFullScreen(true);
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    }
  };

  // change handler form | inputs , textarea
  const changeFroms_Handler = (e) => {
    setDataForm_Comment({
      ...dataForm_Comment,
      [e.target.name]: e.target.value,
    });
  };
  // submit handler comment
  const submitComment_handler = async () => {
    if (
      dataForm_Comment["message"] !== "" &&
      dataForm_Comment["name"] !== "" &&
      dataForm_Comment["email"] !== ""
    ) {
      if (!regexEmail.test(dataForm_Comment["email"])) {
        toast.warn("ایمیل معتبر نیست!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        if (!regexFa.test(dataForm_Comment["name"])) {
          toast.warn("نام باید فارسی باشد!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setIsPending_Comment(true);
          const newDataForm = {
            ...dataForm_Comment,
            productID: dataProduct.id,
            profile: "",
            date: new Date(),
            reaply: {
              userID: null,
              Answer: null,
            },
          };
          setDataForm_Comment(newDataForm);
          // post comment in dataBase
          axios
            .post("http://localhost:5000/comments", newDataForm)
            .then((res) => {
              startTranstion(() => {
                getComment();
              });

              toast.success("کامنت با موفقیت ارسال شد .", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setIsPending_Comment(false);
              setDataForm_Comment({
                name: "",
                email: "",
                message: "",
              });
            })
            .catch((err) => {
              toast.error("کامنت ارسال نشد .", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setIsPending_Comment(false);
            });
        }
      }
    } else {
      toast.warn("لطفا تمام فیلد هارا پر کنید!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <>
      <section className="single-page-product mt-5">
        <div className="container">
          {/* alert add to cart */}
          {isTo_cart(dataProduct.id) && (
            <div className="bg-[#FAFBF5] p-4 w-full md:w-[80%] rounded-xl m-auto mb-8 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <FaCheckCircle className="fill-[#0EB123]" />
                <span className=" text-xs md:text-s-13">
                  "{dataProduct.name}" به سبد خرید شما افزوده شده.
                </span>
              </div>

              <Link
                to="/cart"
                className="text-s-13 font-yekanbakh-bold text-white bg-[#0EB123] py-1.5 px-5 rounded-lg"
              >
                مشاهده سبد خرید
              </Link>
            </div>
          )}
          {/* location box */}
          <div className="w-full h-[45px] py-4 px-4 bg-g-secondary rounded-lg flex items-center mt-2">
            <div className="flex gap-1 text-white text-s-13">
              <Link to={"/"}>خانه</Link>
              <span>/</span>
              <Link to={`/shop/${dataProduct.category_Value}`}>
                {dataProduct.category}
              </Link>
              <span>/</span>
              <span>{dataProduct.name}</span>
            </div>
          </div>

          {/* main content */}
          <main className="my-8">
            <div className="flex flex-wrap lg:flex-nowrap gap-4">
              {/* right box | img product */}
              <div className="right h-[320px] bg-white rounded-3xl overflow-hidden w-full lg:w-[30%] flex items-center justify-center">
                <div className="img-box-product relative h-full w-full overflow-hidden">
                  <BiSearchAlt
                    className="absolute left-5 top-5  z-[5] cursor-pointer"
                    size="24px"
                    style={{ transform: "rotateY(180deg)" }}
                    onClick={() => {
                      setOpenModal_Img(true);
                    }}
                  />
                  <img
                    ref={imgRef}
                    src={dataProduct.img}
                    alt={dataProduct.name}
                    className="bg-black h-[100%] duration-500 ease-out"
                  />
                </div>
              </div>
              {/* left box | info product */}
              <div className="left bg-white rounded-3xl p-7 w-full lg:w-[70%]">
                <div className="flex flex-wrap sm:flex-nowrap gap-6 h-full">
                  {/* info product box | right */}
                  <div className="w-full sm:w-[60%]">
                    <div className="flex flex-col gap-2">
                      {/* title */}
                      <h1 className="text-lg md:text-xl font-rokh-bold text-accent">
                        {dataProduct.name}
                      </h1>
                      {/* EN Name box*/}
                      <div className="flex gap-3 items-center justify-between">
                        <span className="flex items-center font-sans gap-3 w-full relative text-[#979797] text-xs w-full after:content-[''] after:flex-grow after:h-[0.5px]  after:bg-[#e1e1e1]">
                          {dataProduct.name_EN}
                        </span>
                      </div>

                      {/* box nav */}
                      <div className="flex items-center gap-2.5 mt-2">
                        {/* Assessment box */}
                        <div className="flex items-center gap-[2px] *:fill-[#CCD6DF]">
                          <GiRoundStar size="14px" />
                          <GiRoundStar size="14px" />
                          <GiRoundStar size="14px" />
                          <GiRoundStar size="14px" />
                          <GiRoundStar size="14px" />
                        </div>
                        {/* Number of views box */}
                        <a
                          className="text-s-10 font-yekanbakh-bold text-[#a3a3a3]"
                          href="#sec-comment"
                          onClick={() => {
                            setTabActive("comment");
                          }}
                        >
                          ({comments.length === 0 ? "بدون " : comments.length}
                          دیدگاه)
                        </a>

                        {/* add to list favorate */}
                        {!isSaveTo_favorate(dataProduct.id) ? (
                          <RiHeart3Line
                            className="fill-gray cursor-pointer"
                            size="17px"
                            onClick={() => {
                              AddToList_favorate(dataProduct);
                            }}
                          />
                        ) : (
                          <RiHeart3Fill
                            className="fill-gray cursor-pointer"
                            size="17px"
                            onClick={() => {
                              RemoveToList_favorate(dataProduct.id);
                            }}
                          />
                        )}

                        {/* Add to comparison list box */}
                        <FaRandom className="fill-gray" size="15px" />
                      </div>

                      {/* short description */}

                      <div className="flex flex-col gap-3 mt-5">
                        <h3 className="text-g-secondary text-md font-rokh-bold">
                          توضیحات محصول
                        </h3>
                        {/* list short desc */}
                        <ul className="mr-2 text-gray list-inside list-disc *:text-s-13 *:font-yekanbakh-bold flex flex-col gap-3">
                          {descList.map((list, index) => (
                            <li
                              className=""
                              key={`info product list : ${index}`}
                            >
                              {list}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* product box price and ... | left */}
                  <div className="w-full sm:w-[40%]">
                    <div className="bg-[#f4f4f4] rounded-3xl p-6">
                      <div className="flex flex-col gap-2">
                        {/* seller name */}
                        <div className="flex items-end gap-2">
                          <span className="text-g-secondary font-yekanbakh-bold text-sm">
                            طراحی سایت
                          </span>
                        </div>
                        {/* divider */}
                        <hr className="text-white" />

                        {/* list into buy */}
                        <ul className="mt-2 flex flex-col gap-6 *:text-s-13 *:font-yekanbakh-bold *:text-[#8d8d8d] *:flex *:items-center *:gap-2 ">
                          <li>
                            <span className="icon">
                              <img src={Icon_cars} alt="Icon_cars" />
                            </span>
                            ارسال توسط فروشگاه
                          </li>
                          <li>
                            <span className="icon">
                              <img src={icon_Warranty} alt="icon_Warranty" />
                            </span>
                            گارانتی اصالت و سلامت فیزیکی کالا
                          </li>
                          <li>
                            <span className="icon">
                              <img
                                src={icon_compensation}
                                alt="icon_compensation"
                              />
                            </span>
                            ضمانت تعویض کالا
                          </li>
                          <li>
                            <span className="icon">
                              <img src={icon_box} alt="icon_box" />
                            </span>
                            هزینه حمل به عهده خریدار
                          </li>
                        </ul>

                        {/* box price */}
                        <div className="flex mt-3 items-center justify-between">
                          {/* right */}
                          <div className="flex flex-col">
                            {dataProduct.discount !== null ? (
                              <>
                                <span className="w-fit text-s-13 font text-gray relative before:content-[''] before:h-[0.5px] before:w-full before:bg-g-primary before:absolute before:top-[6px] before:rotate-[-7deg]">
                                  {Number(dataProduct.price).toLocaleString(
                                    "fa-ir"
                                  )}
                                </span>
                                <span className="text-lg font-yekanbakh-bold text-g-secondary">
                                  {finalValue.toLocaleString("fa")}
                                  <i className="text-xs text-gray font-yekanbakh-bold mr-1">
                                    تومان
                                  </i>
                                </span>
                              </>
                            ) : (
                              <span className="text-lg font-yekanbakh-bold text-g-secondary">
                                {dataProduct.price.toLocaleString("fa")}
                                <i className="text-xs text-gray font-yekanbakh-bold mr-1">
                                  تومان
                                </i>
                              </span>
                            )}
                          </div>
                          {/* left */}
                          {dataProduct.discount !== null && (
                            <div className="box-present text-xs bg-g-secondary rounded-lg p-2 text-white">
                              {dataProduct.discount}%
                            </div>
                          )}
                        </div>

                        {/* button add to cart */}
                        <button
                          type="button"
                          className="bg-g-secondary w-full  text-white rounded-xl text-sm font-yekanbakh-bold py-2.5 text-center duration-500 hover:bg-[#2954bf] "
                          onClick={() => {
                            addToCart(dataProduct);
                          }}
                        >
                          افزودن به سبد خرید
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* tabs */}

          <div
            className="teb-box bg-white p-6 rounded-xl flex flex-col gap-2"
            id="sec-comment"
          >
            {/* tab item */}
            <div className="items-tab w-fit">
              <div
                className={`flex gap-4 *:font-rokh-bold text-gray *:font-xs *:cursor-pointer relative after:content-[''] after:w-[55%] after:h-[3px] after:bg-g-secondary after:absolute after:-bottom-2 after:duration-500 ${
                  tabActive === "desc"
                    ? "after:translate-x-0"
                    : "after:-translate-x-full"
                }`}
              >
                <button
                  className="px-3"
                  value="desc"
                  onClick={(e) => {
                    setTabActive(e.target.value);
                  }}
                >
                  توضیحات
                </button>
                <button
                  className="px-3"
                  value="comment"
                  onClick={(e) => {
                    setTabActive(e.target.value);
                  }}
                >
                  نظرات ({comments.length})
                </button>
              </div>
            </div>

            {tabActive === "desc" ? (
              <div className="border-t border-[#d6d6d6] p-4">
                <div
                  className="*:text-gray *:text-sm *:leading-7"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(dataProduct.long_desc),
                  }}
                ></div>
              </div>
            ) : (
              <div className="border border-[#d6d6d6] rounded-lg p-4 ">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
                  {/* list comments */}
                  <div className="">
                    <span className="font-rokh text-sm">نقد و برسی ها</span>
                    {comments.length === 0 && (
                      <p className="text-sm font-yekanbakh-bold text-gray mt-3">
                        هنوز بررسی‌ای ثبت نشده است.
                      </p>
                    )}

                    {/* wrapper comments */}
                    <div className="flex flex-col gap-5 max-h-[500px] overflow-y-auto scroll">
                      {comments.map((comment, index) => (
                        <>
                          <CommentBox key={comment.id} {...comment} />
                          {/* {index + 1 < comments.length && (
                            <hr className="text-[#e8e8e8] mt-5" />
                          )} */}
                        </>
                      ))}
                    </div>
                  </div>

                  {/* form add comment */}
                  <div className="flex flex-col gap-4 px-0 lg:px-10">
                    <p className="paragraph pl-0 lg:pl-14">
                      {comments.length === 0 &&
                        `اولین کسی باشید که دیدگاهی می نویسد “${dataProduct.name}”`}
                      نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز
                      علامت‌گذاری شده‌اند *
                    </p>

                    {/* form add comment */}
                    <form>
                      {/* wrapper form */}
                      <div className="wrapper-form flex flex-col gap-6">
                        {/* rating box */}
                        <div className="box-input">
                          <label htmlFor="" className="text-gray text-s-13">
                            امتیاز شما *
                          </label>
                        </div>
                        {/* your point of view box */}
                        <div className="box-input">
                          <label
                            htmlFor="message"
                            className="text-gray text-s-13"
                          >
                            دیدگاه شما *
                          </label>
                          <textarea
                            id="message"
                            rows="6"
                            name="comment"
                            defaultValue={dataForm_Comment["comment"]}
                            className="mt-2 block p-4 w-full text-sm text-gray-900 bg-[#F4F4F4] rounded-3xl dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={changeFroms_Handler}
                          ></textarea>
                        </div>
                        {/* your name box */}
                        <div className="box-input">
                          <label
                            htmlFor="small-input"
                            className="text-gray text-s-13"
                          >
                            نام *
                          </label>
                          <input
                            type="text"
                            id="small-input"
                            name="name"
                            defaultValue={dataForm_Comment["name"]}
                            className="mt-2 block w-full px-4 py-3 text-gray-900 rounded-3xl bg-[#F4F4F4] text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={changeFroms_Handler}
                          />
                        </div>
                        {/* email box */}
                        <div className="box-input ">
                          <label
                            htmlFor="small-input"
                            className="text-gray text-s-13"
                          >
                            ایمیل *
                          </label>
                          <input
                            type="text"
                            id="small-input"
                            name="email"
                            defaultValue={dataForm_Comment["email"]}
                            className="mt-2 block w-full px-4 py-3 text-gray-900 rounded-3xl bg-[#F4F4F4] text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={changeFroms_Handler}
                          />
                        </div>
                        {/* checkbox save info */}
                        <div class="flex items-center gap-2">
                          <input
                            id="link-checkbox"
                            type="checkbox"
                            value="isSave_info"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border border-gray rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            defaultChecked
                          />
                          <label
                            htmlFor="link-checkbox"
                            className="text-gray text-s-13"
                          >
                            ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که
                            دوباره دیدگاهی می‌نویسم.
                          </label>
                        </div>

                        {/* button submit to comments */}
                        <button
                          type="button"
                          className={`btn-secondary w-fit px-8 py-1 ${
                            isPending_Comment ? "opacity-70" : ""
                          }`}
                          onClick={submitComment_handler}
                        >
                          ثبت
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* products list   */}
          <div className="container-product-list mt-14">
            <h3 className="title-box">محصولات مرتبط</h3>
            {/* slider */}
            <Swiper
              spaceBetween={50}
              breakpoints={{
                1200: {
                  slidesPerView: 4,
                },
                800: {
                  slidesPerView: 2,
                },
                600: {
                  slidesPerView: 1,
                  spaceBetween: 60,
                },
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              className="con-slider-product flexible-center mt-4  "
            >
              {products.map(
                (product) =>
                  product.category === dataProduct.category && (
                    <SwiperSlide key={product.id} className="relative">
                      <ProductList {...product} all={product} />
                      {product.id === dataProduct.id && (
                        <span className="absolute top-0 right-0 bg-g-secondary text-white py-1 px-1.5 rounded-lg text-xs">
                          همین محصول
                        </span>
                      )}
                    </SwiperSlide>
                  )
              )}
            </Swiper>
          </div>
        </div>
      </section>
      {/* modal show full image */}
      <Transition show={openModal_Img}>
        <Dialog className="relative z-10" onClose={setOpenModal_Img}>
          <TransitionChild
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 left-0 flex max-w-full">
                <TransitionChild
                  enter="transform transition ease-in-out duration-300 origin-center"
                  enterFrom="scale-0"
                  enterTo="scale-100"
                  leave="transform transition ease-in-out duration-300 origin-center"
                  leaveFrom="scale-100"
                  leaveTo="scale-0"
                >
                  <DialogPanel className="pointer-events-auto relative w-screen w-full">
                    <TransitionChild
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute flex items-center gap-3 right-0 top-0 m-2">
                        <button
                          type="button"
                          className="relative rounded-md text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => {
                            setOpenModal_Img(false);
                            setIsFullScreen(false);
                            document.exitFullscreen();
                          }}
                        >
                          <IoMdClose size="28px" />
                        </button>
                        <button
                          type="button"
                          className="relative rounded-md text-white "
                          onClick={handler_fullScreen}
                        >
                          {isFullScreen ? (
                            <BsFullscreenExit size="16px" />
                          ) : (
                            <BsFullscreen size="16px" />
                          )}
                        </button>
                      </div>
                    </TransitionChild>
                    <div className="flex h-full bg-black/90 py-6 shadow-xl">
                      <div className="flex items-center justify-center relative mt-6 flex-1 px-4 sm:px-6">
                        <img src={dataProduct.img} alt={dataProduct.name} />
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
