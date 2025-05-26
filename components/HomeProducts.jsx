import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full mb-10">
        Popular products
      </p>

      {/* Container with central vertical line for <400px */}
      <div className="relative w-full max-[400px]:w-screen">
        <div className="flex flex-wrap justify-around gap-y-6 relative z-10">
          {products
            .filter(product => product.popular) 
            .map((product, index) => (
              <div
                key={index}
                className={`w-[200px] 
                  max-[400px]:w-1/2 
                  max-[300px]:w-full`}
              >
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>

      <button
        onClick={() => {
          router.push("/all-products");
        }}
        className="px-10 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition mt-10"
      >
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
