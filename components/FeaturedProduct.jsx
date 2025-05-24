import React, { useRef } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
const FeaturedProduct = () => {
  const bottomRef = useRef(null);



  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Features</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {/* Product 1 */}
        <div className="relative group h-[403px] w-full">
          <Image
            src={assets.girl_with_headphone_image}
            alt="Carry confidence—wherever life takes you."
            fill
            className="group-hover:brightness-75 transition duration-300 object-cover"
          />

          <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
            <p className="font-medium text-xl lg:text-2xl">
              Carry confidence—wherever life takes you.
            </p>
            <p className="text-sm lg:text-base leading-5 max-w-60">
              Our bags are made to match your pace—durable, stylish, and
              designed for every journey.
            </p>
            <button className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded">
              Find Your Style
            </button>
          </div>
        </div>


        {/* Product 2 */}
        <div className="relative group h-[403px] mb-8">
          <Image
            src={assets.girl_with_earphone_image}
            alt="Stay Connected"
            className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
          />
          <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
            <p className="font-medium text-xl lg:text-2xl">Stay Connected</p>
            <p className="text-sm lg:text-base leading-5 max-w-60">
              Compact and stylish products for every occasion.
            </p>
            <button
              onClick={() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded"
            >
              Stay in Touch
            </button>

          </div>
        </div>

        {/* Product 3 */}
        <div className="relative group h-[403px]">
          <Image
            src={assets.boy_with_laptop_image}
            alt="Power in Every Pixel"
            className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
          />
          <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
            <p className="font-medium text-xl lg:text-2xl">Power in Every Pixel</p>

            <Link
              href="/all-products"
              className="inline-flex w-fit items-center gap-1.5 bg-orange-600 px-4 py-2 rounded"
            >
              Shop now
            </Link>

          </div>
        </div>
      </div>

      <div ref={bottomRef} />
    </div>
  );
};

export default FeaturedProduct;
