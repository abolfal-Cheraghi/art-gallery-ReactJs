import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGlobalData } from "../../hooks/useGlobalData";
import ArtistCard from "../artist list/ArtistCard";
import { TfiRuler } from "react-icons/tfi";
export default function SliderOurArtists() {
  const { ourArtists } = useGlobalData();
  return (
    <>
      <Swiper
        spaceBetween={30}
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
        {ourArtists.map((artist) => (
          <SwiperSlide className="" key={artist.id}>
            <ArtistCard {...artist} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
