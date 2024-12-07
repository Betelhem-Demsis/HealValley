"use client";
import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function NavBar({ currentPath }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "SERVICES", path: "/services" },
    { name: "HOW IT WORKS", path: "/how-it-works" },
  ];

  return (
    <Disclosure as="nav" className="relative">
      {({ open }) => (
        <>
          <div className="h-20 fixed top-0 left-0 w-full bg-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-full">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <Link href="/">
                    <h1 className="text-2xl mb-4 font-bold text-blue-600 hover:text-blue-700 transition-colors duration-300">
                      Cure-Connect
                    </h1>
                  </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-12">
                  <div className="flex items-center space-x-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.path}
                        className={`relative font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-300
                          ${
                            currentPath === link.path
                              ? "text-blue-600 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                              : ""
                          }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  {/* Auth Buttons */}
                  <div className="flex items-center space-x-8">
                    <Link href="/signup">
                      <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
                        Register
                      </button>
                    </Link>
                    <Link href="/login">
                      <button className="px-6 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors duration-300 transform hover:scale-105">
                        Login
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <DisclosureButton
                    onClick={() => setIsOpen(!isOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-300"
                  >
                    <span className="sr-only">Open main menu</span>
                    {isOpen ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <DisclosurePanel
            className={`md:hidden fixed top-20 right-0 w-64 h-screen bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out transform ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`block py-2 text-base font-medium ${
                    currentPath === link.path
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  } transition-colors duration-300`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="space-y-3 pt-4">
                <Link href="/signup" className="block">
                  <button className="w-full px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-300">
                    Register
                  </button>
                </Link>
                <Link href="/login" className="block">
                  <button className="w-full px-4 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition-colors duration-300">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

export default NavBar;
