import React from "react";
import BtnPri from "../components/buttons/BtnPri";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/free-mode";
import { FreeMode, Autoplay } from "swiper/modules";
// icons
import { IoMdColorPalette } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { TbCheckbox } from "react-icons/tb";
import { GrUserManager } from "react-icons/gr";
import { BsWrenchAdjustableCircleFill } from "react-icons/bs";
// images
import imgGroup1 from "/Group-70-min.png";
import imgGroup2 from "/studio-with-props-painting.jpg";
import imgGroup3 from "/Rectangle-office.png";
import imgGroup4 from "/Group-70-min-1.png";

import BtnAcc from "../components/buttons/BtnAcc";
export default function Home() {
  return (
    <>
      {/* section hero */}
      <section className="hero-section mt-10 md:mt-20 bg-hero-pattern object-contain object-center">
        <div className="grid grid-cols-1 gap-6 md:gap-14 ">
          {/* top hero */}
          <div className="top-hero container">
            <div className="flex flex-wrap md:flex-nowrap items-center gap-10">
              {/* right */}
              <div className="w-full md:w-10/12 flex flex-col gap-4">
                <h2 className="title text-xl md:text-2xl lg:text-3xl ">
                  تنها زمانی که احساس میکنم زنده ام، زمانی است که نقاشی میکشم!
                </h2>
                <p className="paragraph leading-7 w-full md:w-11/12">
                  تنها زمانی که احساس میکنم زنده ام، زمانی است که نقاشی میکشم!
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه و متخصصان را می طلبد.
                </p>
                <div className="text-blockqute">ون گوک</div>
              </div>
              {/* left */}
              <div className="w-full md:w-2/12 flex justify-end">
                <BtnPri text="سفارش نقاشی" className="py-2 ">
                  <IoMdColorPalette size="30px" />
                </BtnPri>
              </div>
            </div>
          </div>
          {/* bottom hero */}
          <div className="bottom-hero">
            <div className="container">
              <Swiper
                spaceBetween={80}
                breakpoints={{
                  1200: {
                    slidesPerView: 4,
                  },
                  800: {
                    slidesPerView: 3,
                  },
                  600: {
                    slidesPerView: 2,
                  },
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                freeMode={true}
                modules={[FreeMode]}
                className="mySwiper *:flex *:items-center"
              >
                <SwiperSlide className="flex items-center justify-center">
                  <img
                    src="https://halochin.ir/art-gallery/wp-content/uploads/2023/10/gallery1.png"
                    alt="art board"
                    className="img-fluid"
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                  <img
                    src="https://halochin.ir/art-gallery/wp-content/uploads/2023/10/monalisa-1-1-min.png"
                    alt="art board"
                    className="img-fluid"
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                  <img
                    src="https://halochin.ir/art-gallery/wp-content/uploads/2023/10/night-1-1-min.png"
                    alt="art board"
                    className="img-fluid"
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                  <img
                    src="https://halochin.ir/art-gallery/wp-content/uploads/2023/10/TheScream-1-1-min.png"
                    alt="art board"
                    className="img-fluid"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* section 2  */}
      <section className="my-20 md:my-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* right */}
            <div>
              {/* content left box */}
              <div className="flex flex-col gap-6">
                <h2 className="title">
                  گالری نقاشی ما در انتظار{" "}
                  <span className="text-g-primary font-[inherit]">هنر شما</span>
                  عزیزان است !
                </h2>
                <p className="paragraph">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه و متخصصان را می طلبد.
                </p>

                {/* buttons group */}
                <div className="flex">
                  <BtnAcc
                    text="تماس با ما"
                    link="/contact"
                    className="py-3 font-rokh-bold px-8 -ml-5"
                  >
                    <IoCall />
                  </BtnAcc>
                  <BtnPri
                    text="درباره ما"
                    link="/about"
                    className="py-3 font-rokh-bold hover:bg-g-primary"
                  >
                    <FaUser />
                  </BtnPri>
                </div>
              </div>
            </div>
            {/* left */}
            <div>
              <img src={imgGroup1} alt="عکس یه یارو که سیبیل داره🫡" />
            </div>
          </div>
        </div>
      </section>

      {/* section Some of the products in our store! */}
      <section className="some-of-product my-20">
        <div className="container">
          {/* title this section */}
          <h2 className="title-box">
            برخی از
            <span className="text-g-primary font-[inherit]">محصولات</span>
            فروشگاه ما !
          </h2>
        </div>
      </section>

      {/* section 4 */}
      <section className="my-20 md:my-32 relative ">
        {/* BOXES FLOWER FLOAT  */}
        <div className="hidden lg:block absolute top-48 left-[35%] w-32 h-32 md:w-44 md:h-44 opacity-80">
          <img src="/shape.png" alt="shapes" />
        </div>
        <div className="absolute -top-14 lg:-top-10 left-0 lg:left-[35%] w-32 h-32 md:w-44 md:h-44 opacity-80">
          <img src="/shape.png" alt="shapes" />
        </div>
        <div className="absolute top-10 right-0 w-32 h-32 md:w-32 md:h-32 opacity-80">
          <img src="/shapeL.png" alt="shapes" />
        </div>
        <div className="absolute top-[35%] lg:top-10 left-0 w-32 h-32 md:w-32 md:h-32 opacity-80">
          <img src="/shapeR.png" alt="shapes" />
        </div>
        <div className="container ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* right */}
            <div>
              {/* content left box */}
              <div className="flex flex-col gap-6">
                <h2 className="title">
                  گالری نقاشی ما در انتظار
                  <span className="text-g-primary font-[inherit]">هنر شما</span>
                  عزیزان است !
                </h2>
                <p className="paragraph">
                  هرچی رو که بخوای ما برات میکشیم :)) لورم ایپسوم متن ساختگی با
                  تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
                  است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
                  لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
                  متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در
                  شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان
                  را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
                  رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی
                  ایجاد کرد، در این صورت می توان امید داشت.
                </p>

                {/* buttons group */}
                <div className="flex">
                  <BtnAcc
                    text="ثبت سفارش"
                    link="/order-request"
                    className="py-3 font-rokh-bold px-8 hover:bg-g-primary"
                  >
                    <TbCheckbox size="20px" />
                  </BtnAcc>
                </div>
              </div>
            </div>
            {/* left */}
            <div className="flex justify-end">
              <img
                src={imgGroup2}
                alt="عکس نمایشگاه ما"
                className="h-80 w-full lg:w-[85%] z-10 object-cover object-right-bottom rounded-xl border-[5px] border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* section Part of our effects in exhibitions! */}
      <section className="our-effect">
        <div className="container">
          <h2 className="title-box">
            بخشی از
            <span className="text-g-primary font-[inherit]">اثرات ما</span> در
            نمایشگاه ها !
          </h2>
        </div>
        {/* wrapper our effects */}
        <div className="mt-6 h-96 bg-g-primary relative before:content-[''] before:bg-[url('/pattern-1.png')] before:w-full before:h-full before:absolute before:top-0"></div>
      </section>

      {/* section list our members */}
      <section className="my-32">
        <div className="container">
          <h2 className="title-box">
            هنرمندهای
            <span className="text-g-primary font-[inherit]">
              {" "}
              گالری ما را
            </span>{" "}
            بشناسید !
          </h2>
        </div>
      </section>

      {/* section some of our Discounts */}
      <section className="discount"></section>

      {/* section 8 */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* right */}
            <div>
              {/* content left box */}
              <div className="flex flex-col gap-6">
                <h2 className="title">
                  خوشحال میشیم از
                  <span className="text-g-primary font-[inherit]">نزدیک</span>
                  ببینیمتون :))
                </h2>
                <p className="paragraph">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه و متخصصان را می طلبد.
                </p>

                <div className="flex items-center gap-2">
                  <FaMapLocationDot className="fill-g-primary" size="20px" />
                  <span className="text-accent text-sm font-yekanbakh-bold">
                    شهر یزد ، خیابان خوبان ، کوچه طراحان سایت ، پلاک 36
                  </span>
                </div>
              </div>
            </div>
            {/* left */}
            <div className="flex justify-end">
              <img
                src={imgGroup3}
                alt="عکس دفتر ما"
                className="rounded-xl border-[5px] border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* section some of our projects */}
      <section className="some-of-project my-32">
        <div className="container">
          <h2 className="title-box">
            <span className="text-g-primary font-[inherit]">نمونه کارهای</span>{" "}
            ما !
          </h2>
        </div>
      </section>

      {/* section 10 */}
      <section>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* right */}
            <div>
              {/* content left box */}
              <div className="flex flex-col gap-6">
                <h2 className="title">
                  این
                  <span className="text-g-primary font-[inherit]">
                    {" "}
                    مجسمه هارو
                  </span>
                  هیچ جا نمیبینی !
                </h2>
                <p className="paragraph">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه و متخصصان را می طلبد.
                </p>

                {/* buttons group */}
                <div className="flex gap-4">
                  <BtnAcc
                    text="همه نمونه کار ها"
                    link="/contact"
                    className="py-3 font-rokh-bold px-8 hover:bg-g-primary"
                  >
                    <BsWrenchAdjustableCircleFill size="18px" />
                  </BtnAcc>
                  <BtnPri
                    text="ُسفارش ساخت"
                    link="/about"
                    className="py-3 font-rokh-bold hover:bg-accent"
                  >
                    <GrUserManager  size="16px"/>
                  </BtnPri>
                </div>
              </div>
            </div>
            {/* left */}
            <div className="flex justify-center lg:justify-end">
              <img src={imgGroup4} alt="عکس یه مجسمه 🫡" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
