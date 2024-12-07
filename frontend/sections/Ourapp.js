"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useTransform, useScroll, useInView } from "framer-motion";
import { fadeInUpVariant } from "@/utils/motion";
import "@/styles/hero.css";

function Ourapp() {
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 300], ["0%", "-5%"]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control popup

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Function to handle button click and show popup
  const handleDownloadClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false); // Hide popup after 2 seconds
    }, 2000);
  };

  return (
    <div ref={ref} className="app-container">
      <img
        src="https://theisozone.com/wp-content/uploads/2021/07/AI-In-Healthcare.jpg"
        alt="app"
        className="app-image"
      />
      <motion.div
        className="app-text"
        style={{ y: isMobile ? 0 : yTransform }}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={fadeInUpVariant}
      >
        <h2>START Your Treatment Right away</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum
          ex nec orci feugiat, sit amet tincidunt metus ultrices. Aliquam et
          nunc scelerisque, vulputate orci id, efficitur eros. Vivamus vitae
          metus sit amet orci aliquet accumsan id non odio. Integer venenatis
          luctus enim, sed commodo lorem consectetur id.
        </p>
        <button onClick={handleDownloadClick}>Download App</button>
      </motion.div>

      {/* Popup that shows when the button is clicked */}
      {showPopup && (
        <div className="popup">
          <p>The app is coming soon!</p>
        </div>
      )}
    </div>
  );
}

export default Ourapp;
