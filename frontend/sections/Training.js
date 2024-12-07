"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useTransform, useScroll, useInView } from "framer-motion";
import { fadeInUpVariant } from "@/utils/motion";
import "@/styles/hero.css";
import Link from "next/link";

function TrainingSection() {
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 0], ["-100%", "-100%"]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="training-container">
      <div ref={ref} className="image-container">
        <img
          src="https://fuerstsolutions.com/wp-content/uploads/2020/02/doc-lady.jpg"
          alt=""
          className="training-image"
        />
        <motion.div
          className="training-text"
          style={{ y: isMobile ? 0 : yTransform }}
          initial="hidden"
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: "-100%" }}
          variants={fadeInUpVariant}
        >
          <h2>START Your Treatment Right away</h2>
          <p>
            -Get Consultation <br />
            -Get Treatment with affordable price from your home <br />
            -Personalized in Video chat <br />
          </p>
          <Link href="/register">
            <button className="bg-slate-500">Find Doctor</button>
          </Link>
        </motion.div>
      </div>

      <div className="logo-above"></div>
      <div className="logos space-x-10">
        <div className="logos-slide">
          <h2>Video Call</h2>
        </div>
        <div className="logos-slide">
          <h2>Personalized Chat</h2>
        </div>
        <div className="logos-slide">
          <h2>24 Hour Availability</h2>
        </div>
        <div className="logos-slide">
          <h2>Consultation</h2>
        </div>
        <div className="logos-slide">
          <h2>Therapy</h2>
        </div>
      </div>
      <div className="logo-below"></div>
    </div>
  );
}

export default TrainingSection;
