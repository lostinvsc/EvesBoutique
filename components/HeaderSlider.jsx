import React, { useState, useEffect } from "react";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    { id: 3, imgSrc: "/h3.png" },
    { id: 1, imgSrc: "/h5.png" },
    { id: 2, imgSrc: "/h4.png" },
    { id: 4, imgSrc: "/h1.png" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
<div className="overflow-hidden relative w-full">

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
          >
            <Image
              src={slide.imgSrc}
              alt={`Slide ${slide.id}`}
              priority
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 md:mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index ? "bg-orange-600" : "bg-gray-500/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
