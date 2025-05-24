import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <Image className="w-28 md:w-32" src={assets.logo} alt="logo" />
          <p className="mt-6 text-sm">
            Born from stardust and stitched with sass, <strong>Eve'sBoutique</strong> isn’t just a brand — it's a revolution in your closet. From celestial silks to rebel threads, we serve fashion with a wink, a twist, and a little chaos. Why fit in when you were born to wear Eve?
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">Home</a>
              </li>
              <li>
                <Link className="hover:underline transition" href="/all-products">Shop</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>
                <a href="tel:+917005382300" className="hover:underline transition">phone: +91 70053 82300</a>
              </p>
              <p>
                <a href="mailto:Evesweetly23@gmail.com" className="hover:underline transition">Email: Evesweetly23@gmail.com</a>
              </p>
              <p>
                <a 
                  href="https://www.instagram.com/eve_botique" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline transition"
                >
                  Instagram: @eve_botique
                </a>
              </p>
              <p>
                <a 
                  href="https://www.facebook.com/Evesweetly" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:underline transition"
                >
                  Facebook: Evesweetly
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © Eve'sBoutique All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
