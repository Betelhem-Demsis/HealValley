"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar } from "react-icons/fa";
import { testimonyData } from "@/constants/testimonydata";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/testimony.css";

import { Pagination, Navigation } from "swiper/modules";

export default function Testimony() {
  return (
    <>
      <div className="Testimony-title">
        <h1 className="text-cyan-400 font-bold text-center mb-4">
          WHAT CLIENTS SAY
        </h1>
      </div>
      <div className="testimony">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 60,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {testimonyData.map((data, index) => (
            <SwiperSlide key={index}>
              <div className="grid">
                <h3 className="font-bold text-black">{data.title}</h3>
                <div className="flex py-8 star">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p>{data.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
