"use client";
import React, { useRef } from "react";
import Link from "next/link";
import "../styles/hero.css";
import { motion, useInView } from "framer-motion";
import { textVariant, fadeInUpVariant } from "../utils/motion";

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="about flex flex-col items-center sm:flex-row sm:justify-between"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={fadeInUpVariant}
        className="sm:w-1/2"
      >
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.s9_ToTHqzdCzHcBnJiN98QHaEK&pid=Api&P=0&h=220"
          alt="Woman"
          className="w-full sm:w-auto object-cover"
        />
      </motion.div>

      <div className="middle-text text-center sm:text-left sm:w-1/2 p-4 sm:p-8">
        <motion.h1
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={textVariant(0.1)}
          className="text-blue-600 text-xl sm:text-3xl font-bold mb-4"
        >
          WHY CURE CONNECT
        </motion.h1>

        <motion.p
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={textVariant(0.5)}
          className="text-sm sm:text-base mb-6"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam rutrum
          ex nec orci feugiat, sit amet tincidunt metus ultrices. Aliquam et
          nunc scelerisque, vulputate orci id, efficitur eros. Vivamus vitae
          metus sit amet orci aliquet accumsan id non odio. Integer venenatis
          luctus enim, sed commodo lorem consectetur id. Phasellus nec ante
          justo. Nunc lacinia, augue id laoreet sodales, nisi libero suscipit
          orci, et ultricies odio augue at nisl. Nam malesuada mauris id erat
          dapibus, et cursus eros feugiat. Maecenas vehicula tincidunt justo, et
          suscipit justo tincidunt eget.
        </motion.p>

        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          variants={textVariant(0.9)}
        >
          <Link href="/About">
            <button
              type="button"
              className="bg-cyan-700 text-white px-6 py-2 rounded-full hover:bg-cyan-800 transition-colors duration-300"
            >
              Learn more
            </button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        variants={fadeInUpVariant}
        className="sm:w-1/2"
      >
        <img
          src="https://tse2.mm.bing.net/th?id=OIP.s9_ToTHqzdCzHcBnJiN98QHaEK&pid=Api&P=0&h=220"
          alt="Man"
          className="w-full sm:w-auto object-cover"
        />
      </motion.div>
    </div>
  );
}

export default About;
