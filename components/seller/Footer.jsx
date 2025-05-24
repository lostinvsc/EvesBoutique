import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-10 py-6 gap-4 md:gap-0 bg-white text-gray-500 text-sm">
      
      {/* Left Section */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
        <Image className="w-24 md:w-auto" src={assets.logo} alt="logo" />
        <div className="hidden md:block h-6 w-px bg-gray-400" />
        <p className="text-xs md:text-sm">
          © 2025 Eve'sBoutique. All Rights Reserved.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex gap-4">
        <a
          href="https://www.facebook.com/Evesweetly"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={assets.facebook_icon}
            alt="Facebook"
            className="w-5 h-5 hover:opacity-75 transition-opacity duration-300"
          />
        </a>

        <a
          href="https://www.instagram.com/eve_boutique"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={assets.instagram_icon}
            alt="Instagram"
            className="w-5 h-5 hover:opacity-75 transition-opacity duration-300"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
