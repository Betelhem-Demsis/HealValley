"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../styles/hero.css";
import { Autoplay, Pagination } from "swiper/modules";
import { textVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import Link from "next/link";
export default function Hero() {
  const swiperRef = useRef(null);
  const handleSlideChange = (swiper) => {
    const currentSlide = swiper.slides[swiper.activeIndex];
    const videoElement = currentSlide.querySelector("video");
    if (videoElement) {
      swiper.autoplay.stop();
      videoElement.play();
      setTimeout(() => {
        swiper.slideNext();
        swiper.autoplay.start();
      }, 19000);
    } else {
      swiper.params.autoplay.delay = 3000;
      swiper.autoplay.start();
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={false}
        modules={[Autoplay, Pagination]}
        onSlideChange={handleSlideChange}
        onInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://africanhs.tanta.edu.eg/assets/img_external/revolution-slider/bg-1.jpg"
            alt=""
          />
          <div className="content">
            <motion.h3
              initial="hidden"
              animate="show"
              variants={textVariant(0.1)}
            >
              {" "}
              Cure Connect find cure from your home
            </motion.h3>
            <motion.h2
              initial="hidden"
              animate="show"
              variants={textVariant(0.3)}
            >
              {" "}
              Find Doctors <br /> Get Cured.
            </motion.h2>
            <motion.p
              initial="hidden"
              animate="show"
              variants={textVariant(0.5)}
            >
              {" "}
              <b>
                cure connect cure connect cure connect cure connect cure connect
              </b>
              l
            </motion.p>
            <Link href="/register">
              <motion.button
                animate="show"
                initial="hidden"
                variants={textVariant(0.8)}
              >
                {" "}
                Get Started
              </motion.button>{" "}
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.westwindrecovery.com/wp-content/uploads/2020/10/cognitive-behavioral-therapy-.jpeg"
            alt=""
          />
          <div className="content">
            <motion.h3
              initial="hidden"
              animate="show"
              variants={textVariant(0.1)}
            >
              {" "}
              Cure Connect you with your cure from your home
            </motion.h3>
            <motion.h2
              initial="hidden"
              animate="show"
              variants={textVariant(0.3)}
            >
              {" "}
              Find Therapist <br /> Get Consultation.
            </motion.h2>
            <motion.p
              initial="hidden"
              animate="show"
              variants={textVariant(0.5)}
            >
              {" "}
              <b>
                cure connect cure connect cure connect cure connect cure connect
              </b>
              l
            </motion.p>
            <Link href="/register">
              <motion.button
                animate="show"
                initial="hidden"
                variants={textVariant(0.8)}
              >
                {" "}
                Get Started
              </motion.button>{" "}
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.humanium.org/en/wp-content/uploads/2020/10/shutterstock_667950202-scaled.jpg"
            alt=""
          />
          <div className="content">
            <motion.h3
              initial="hidden"
              animate="show"
              variants={textVariant(0.1)}
            >
              {" "}
              Connect with the Best Doctor from wherever you are
            </motion.h3>
            <motion.h2
              initial="hidden"
              animate="show"
              variants={textVariant(0.3)}
            >
              {" "}
              Made by Ethiopian <br /> For Ethiopian.
            </motion.h2>
            <motion.p
              initial="hidden"
              animate="show"
              variants={textVariant(0.5)}
            >
              {" "}
              <b>
                cure connect cure connect cure connect cure connect cure connect
              </b>
              l
            </motion.p>
            <Link href="/register">
              <motion.button
                animate="show"
                initial="hidden"
                variants={textVariant(0.8)}
              >
                {" "}
                Get Started
              </motion.button>{" "}
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
