import React, { useRef } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const FeaturedProduct = () => {
  const bottomRef = useRef(null);

  return (
    <div className="mt-14">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-medium">Features</p>
        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">

        {/* Product 3 */}
        <div className="relative group h-[403px] w-full">
          <Image
            src={assets.girl_with_earphone_image}
            alt="Stay Connected"
            fill
            className="group-hover:brightness-75 transition duration-300 object-cover"
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


        {/* Product 1 */}

        <div className="relative group h-[403px] w-full">
          <Image
            src="/cosmetics.png"
            alt="Glow Naturally"
            fill
            className="group-hover:brightness-75 transition duration-300 object-cover"
          />
          <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
            {/* <p className="font-medium text-xl lg:text-2xl"></p> */}
            <p className="text-sm lg:text-base leading-5 max-w-60">
              Discover premium cosmetics to enhance your natural beauty—because you deserve the best.
            </p>
            <button className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded">
              Glow Naturally
            </button>
          </div>
        </div>

        {/* Product 2 */}
        <div className="relative group h-[403px] w-full">
          <Image
            src={assets.girl_with_headphone_image}
            alt="Carry confidence—wherever life takes you."
            fill
            className="group-hover:brightness-75 transition duration-300 object-cover"
          />
          <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
            {/* <p className="font-medium text-xl lg:text-2xl">
              
            </p> */}
            <p className="text-sm lg:text-base leading-5 max-w-60">
              Our bags are made to match your pace—durable, stylish, and designed for every journey.
            </p>
            <button className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 text-white rounded">
             Carry confidence
            </button>
          </div>
        </div>



        {/* Product 4 - Jewellery */}
        <div className="relative group h-[403px] w-full">
          <Image
            src="/jewellery.png"
            alt="Elegant Sparkle"
            fill
            className="group-hover:brightness-75 transition duration-300 object-cover"
          />
          <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
            {/* <p className="font-medium text-xl lg:text-2xl"></p> */}
            <p className="text-sm lg:text-base leading-5 max-w-60">
              Elevate your style with timeless jewellery—crafted to shine on every occasion.
            </p>
            <button className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded">
              Elegant Sparkle
            </button>
          </div>
        </div>

{/* Product - Clothes */}
<div className="relative group h-[403px] w-full">
  <Image
    src="/clothes.png"
    alt="Trendy Clothing"
    fill
    className="group-hover:brightness-75 transition duration-300 object-cover"
  />
  <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
    {/* <p className="font-medium text-xl lg:text-2xl"></p> */}
    <p className="text-sm lg:text-base leading-5 max-w-60">
      Discover fashion-forward clothing that blends comfort and confidence—perfect for every season and style.
    </p>
    <button className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded">
     Dress to Impress
    </button>
  </div>
</div>

{/* Product - Shoes */}
<div className="relative group h-[403px] w-full">
  <Image
    src="/shoes.png"
    alt="Stylish Footwear"
    fill
    className="group-hover:brightness-75 transition duration-300 object-cover"
  />
  <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
    {/* <p className="font-medium text-xl lg:text-2xl"></p> */}
    <p className="text-sm lg:text-base leading-5 max-w-60">
      From casual kicks to elegant heels—our shoes keep you moving with confidence and comfort.
    </p>
    <button className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded">
      Step in Style
    </button>
  </div>
</div>


      </div>

      <div ref={bottomRef} />
    </div>
  );
};

export default FeaturedProduct;
