import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import "@/styles/footer.css";

function Footer() {
  return (
    <div className="bg-slate-500 mt-20 footer">
      <div className="lg:flex sm:grid justify-between pt-20 px-20">
        <h1 className="text-neutral-50">Cure-Connect</h1>
        <ul className="footer-icons flex space-x-10 pt-8">
          <li className="rounded-full">
            <FaFacebook className="text-white h-8 w-8 hover:text-blue-500 cursor-pointer transition-colors duration-300" />
          </li>
          <li className="rounded-full ">
            <FaTwitter className="text-white h-8 w-8  hover:text-blue-500  cursor-pointer transition-colors duration-300" />
          </li>
          <li className="rounded-full ">
            <FaInstagram className="text-white h-8 w-8  hover:text-blue-500  cursor-pointer transition-colors duration-300" />
          </li>
          <li className="rounded-full">
            <FaYoutube className="text-white h-8 w-8  hover:text-blue-500  cursor-pointer transition-colors duration-300" />
          </li>
        </ul>
      </div>
      <div className="h-1 bg-fuchsia-200 mx-10 mt-5"></div>
      <div className="lg:flex sm:grid space-x-10">
        <div className="px-20 py-10">
          <p className=" text-cyan-50 py-3">JOIN OUR MAILING LIST TODAY</p>
          <h2 className="text-3xl text-cyan-50">For more health updates</h2>
          <p className="text-cyan-50 py-3">
            Plus gain exclusive access to health tips and food nutrition guides
          </p>
          <Link href="/Login">
            <button className="region-button">Find Doctor</button>
          </Link>
        </div>
        <div className="links lg:flex space-x-10  text-cyan-50 py-16  lg:text-xl lg:pl-20 ">
          <Link className="hover:text-blue-500 " href="/">
            FAQ
          </Link>
          <Link className="hover:text-blue-500 " href="/">
            Invest
          </Link>
          <Link className="hover:text-blue-500 " href="/">
            Career
          </Link>
          <Link className="hover:text-blue-500 " href="/">
            Terms
          </Link>
          <Link className="hover:text-blue-500 " href="/">
            Privacy Policy
          </Link>
        </div>
      </div>

      <div className="footer-bottom grid  justify-center lg:pt-12 pb-5">
        <p className="text-white pt-10">
          © {new Date().getFullYear()} Cure-Connect. All rights reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
