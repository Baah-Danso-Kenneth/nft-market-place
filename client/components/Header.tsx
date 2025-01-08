"use client";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggler } from "./ThemeToggler";
import { Menu } from "lucide-react";
import { useState } from "react";

function Header() {
  const [showToggle, setShowToggle] = useState(false);

  function toggle() {
    setShowToggle((prevState) => !prevState); 
  }

  return (
    <div className="border-b border-black dark:border-white ">
      <div className="flex mx-5 md:mr-28  items-center  md:flex h-auto justify-between ">
        {/* Logo */}

        <Link href="/" className="flex md:justify-center border-black md:border-b-0 lg:border-b-0">
          <Image
            src="/images/sticky.png"
            alt="obri"
            className=" md:py-3 md:mx-5 object-contain md:w-24 h-12 dark:invert"
            width={100}
            height={200}
          />
        </Link>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <Menu onClick={toggle} /> {/* Toggle menu on click */}
        </div>

        {/* Navigation Links */}
        <div className="hidden  md:text-[18px]  lg:flex justify-between md:whitespace-nowrap uppercase font-nunito">
          <Link href="/marketPlace" className="py-3 hover:bg-black hover:text-white px-3 border-black border-l border-r dark:border-white">
            [market]
          </Link>
          <Link href="/" className="hidden md:py-3 md:px-3 md:hover:bg-black md:block hover:text-white border-black border-r dark:border-white">
            [list]
          </Link>
          <Link href="/profile" className="py-3 px-10 md:px-3 hover:bg-black hover:text-white border-r border-black dark:border-white">
            [profile]
          </Link>
          <Link href="#" className="py-3 px-10 md:px-3 hover:bg-black hover:text-white border-r border-black dark:border-white">
            [connect wallet]
          </Link>
          <div className="py-3 px-3 hover:bg-black hover:text-white border-black border-r">
            <ThemeToggler />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showToggle && ( // Render menu only if `showToggle` is true
        <div className="absolute font-nunito z-50 uppercase h-[100vh] dark:bg-[#1A1C29] w-48 border   border-l-0 border-black dark:border-white bg-[#cec8bc] flex flex-col space-y-3  lg:hidden">
          <Link href="/marketPlace" className="pl-2 hover:bg-black py-2 hover:text-white border-b border-black dark:border-white">
            [market]
          </Link>
          <Link href="/collections" className="pl-2 md:hover:bg-black md:block hover:text-white border-b pb-1 border-black dark:border-white">
            [collections]
          </Link>
          <Link href="/about" className="pl-2 hover:text-white">
            [connect wallet]
          </Link>
          <div className="hover:bg-black pl-2 py-2 border border-b border-r-0 border-l-0 border-black dark:border-white hover:text-white">
            <ThemeToggler />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
