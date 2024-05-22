import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGlobalData } from "../../hooks/useGlobalData";
import ProductList from "../product list/ProductList";
export default function SliderDiscounts() {
  const { productsDiscount } = useGlobalData();

  const [dateTimer, setDateTimer] = useState({
    hour: 24,
    min: 0,
    sec: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTimer((prev) => {
        const timer = { ...prev };

        if (timer.sec > 0) {
          timer.sec--;
        } else {
          if (timer.min > 0) {
            timer.sec = 59;
            timer.min--;
          } else {
            if (timer.hour > 0) {
              timer.sec = 59;
              timer.min = 59;
              timer.hour--;
            } else {
              clearInterval(interval);
            }
          }
        }
        return timer;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="h-[600px] sm:h[550px] md:h-[400px]">
        <div className="container-section-discounts w-full bg-g-secondary rounded-2xl bg-[url('./Rectangle-286.png')] bg-[center] h-[450px] md:h-[300px]  py-10  px-6">
          <div className="flex flex-wrap md:flex-nowrap gap-6">
            <div className="right w-full md:w-3/12">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <h3 className="title text-xl">
                    {" "}
                    تخفیف مارو{" "}
                    <span className="font-[inherit] text-white">
                      از دست ندین
                    </span>
                    !
                  </h3>
                  <img
                    src="./Group-71.png"
                    alt="i do no"
                    className="h-[30px] w-[30px]"
                  />
                </div>
                <p className="text-xs leading-6 text-justify text-white">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز است.
                </p>

                {/* box timer */}
                <div className="timer-box bg-white rounded-xl px-6 py-3 *:font-rokh-bold relative before:content-[''] before:absolute before:h-2 before:w-[80%] before:bg-g-primary before:rounded-b-xl before:-bottom-2 before:translate-x-[-50%] before:left-[50%]">
                  <div className="grid grid-cols-5 items-center justify-between ">
                    <div className="flex flex-col items-center gap-1 *:font-rokh text-s-13 b-">
                      <span>ثانیه</span>
                      <span className="text-xl">{dateTimer["sec"]}</span>
                    </div>
                    <hr className="rotate-90 text-[#c9c9c9]" />
                    <div className="flex flex-col items-center gap-1 *:font-rokh text-s-13">
                      <span>دقیقه</span>
                      <span className="text-xl">{dateTimer["min"]}</span>
                    </div>
                    <hr className="rotate-90 text-[#c9c9c9]" />
                    <div className="flex flex-col items-center gap-1 *:font-rokh text-s-13">
                      <span>ساعت</span>
                      <span className="text-xl">{dateTimer["hour"]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="left   w-full md:w-9/12">
              <Swiper
                spaceBetween={60}
                breakpoints={{
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 60,
                  },
                  800: {
                    slidesPerView: 2,
                    spaceBetween: 60,
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
                className="mySwipe swipe-slider-discount "
              >
                {productsDiscount.map((product) => (
                  <SwiperSlide
                    key={product.id}
                    className="flex justify-center items-center"
                  >
                    <ProductList {...product} all={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
