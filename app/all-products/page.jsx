'use client'

import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {
  const { products } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");

const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  product.description.toLowerCase().includes(searchQuery.toLowerCase())
);


  return (
    <>
      <Navbar />
      <div className={`flex flex-col items-start mb-28 ${searchQuery ? "w-screen px-0" : "w-full md:px-16 lg:px-32 max-[400px]:w-screen"}`}>



        {/* Header and Search */}
        <div className="flex flex-col w-full pt-12 px-6">
          <div className="flex flex-col items-start md:items-end w-full">
            <p className="text-2xl font-medium">All products</p>
            <div className="w-16 h-0.5 bg-orange-600 rounded-full mb-4"></div>
          </div>

          {/* Search Bar */}
          {/* Search Bar with bottom border and search icon */}
          <div className="relative w-full md:w-1/2 lg:w-1/3 mb-20">
            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-10 py-2 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-orange-500 transition"
            />
          </div>

        </div>

        {/* Product Grid */}
        <div className="relative w-full">

          <div className="flex flex-wrap justify-around gap-y-6 relative z-10">
            {filteredProducts.map((product, index) => (
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
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
