import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGlobalData } from "../../hooks/useGlobalData";
import ProjectCard from "../project list/ProjectCard";
export default function SliderOurProjects() {
  const { ourProjects } = useGlobalData();
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
        {ourProjects.map((project) => (
          <SwiperSlide className="" key={project.id}>
            <ProjectCard {...project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
