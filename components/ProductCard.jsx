import React from 'react';
import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';

const ProductCard = ({ product }) => {
  const { currency, router } = useAppContext();

  return (
    <div
      onClick={() => {
        router.push('/product/' + product._id);
        scrollTo(0, 0);
      }}
      className="cursor-pointer max-w-[220px] w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col gap-3 p-4"
    >
      <div className="relative w-full h-56 rounded-lg overflow-hidden group">
        <Image
          src={product.image[0]}
          alt={product.name}
          className="object-cover w-full h-full rounded-lg transition-transform duration-300 group-hover:scale-105"
          width={800}
          height={800}
          priority
        />

        {/* Optional Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-lg z-10">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 truncate" title={product.name}>
          {product.name}
        </h3>
        <p
          className="text-sm text-gray-600 mt-1 line-clamp-2"
          title={product.description}
        >
          {product.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-xl font-bold text-orange-600">
          {currency}
          {product.offerPrice.toFixed(0)}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push('/product/' + product._id);
            scrollTo(0, 0);
          }}
          className="bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-orange-700 transition-colors duration-300"
        >
          Buy now
        </button>

      </div>
    </div>
  );
};

export default ProductCard;
