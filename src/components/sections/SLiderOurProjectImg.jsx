import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGlobalData } from "../../hooks/useGlobalData";
export default function SLiderOurProjectImg() {
  const { ourProjects_Img } = useGlobalData();
  return (
    <>
      <Swiper
        spaceBetween={25}
        breakpoints={{
          1200: {
            slidesPerView: 3,
          },
          800: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 2,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        className="mySwiper mt-6"
      >
        {ourProjects_Img.map((projectImg, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="flex items-center justify-center w-full h-full relative before:content-[''] before:h-full before:w-full before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-[url('./old-wooden-frame-3.png')] before:bg-no-repeat  bg-cover bg-center py-10">
              <img
                src={projectImg}
                alt={`img project : ${index}`}
                className="h-[330px] w-[250px] object-cover "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
