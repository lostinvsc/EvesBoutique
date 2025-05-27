"use client"
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import Link from "next/link";

const Product = () => {

    const { id } = useParams();

    const { products, router, addToCart } = useAppContext()

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [showSelectModal, setShowSelectModal] = useState(false);

    const handleAddToCartClick = () => {
        const hasColors = productData.colors?.length > 0;
        const hasSizes = productData.sizes?.length > 0;

        const needColor = hasColors && !selectedColor;
        const needSize = hasSizes && !selectedSize;

        if (needColor || needSize) {
            setShowSelectModal(true);
        } else {
            addToCart(productData._id, selectedSize || null, selectedColor || null);
            setSelectedSize("");
            setSelectedColor("");
        }
    };


    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product);
    }

    useEffect(() => {
        fetchProductData();
    }, [id, products.length])

    return productData ? (<>
        <Navbar />
        <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                        <Image
                            src={mainImage || productData.image[0]}
                            alt="alt"
                            className="w-full h-auto object-cover mix-blend-multiply"
                            width={1280}
                            height={720}
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {productData.image.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setMainImage(image)}
                                className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                            >
                                <Image
                                    src={image}
                                    alt="alt"
                                    className="w-full h-auto object-cover mix-blend-multiply"
                                    width={1280}
                                    height={720}
                                />
                            </div>

                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
                        {productData.name}
                    </h1>
                    <p className="text-gray-600 mt-3">
                        {productData.description}
                    </p>
                    <p className="text-3xl font-medium mt-6">
                        ₹{productData.offerPrice}
                        <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                            ₹{productData.price}
                        </span>
                    </p>
                    <hr className="bg-gray-600 my-6" />

                    <div className="overflow-x-auto mt-4">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-gray-600 font-medium">Category:</td>
                                    <td className="text-gray-800/50"> {productData.category}</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Colors:</td>
                                    <td className="text-gray-800/50 flex gap-2">
                                        {productData.colors && productData.colors.length > 0
                                            ? productData.colors.map((color, idx) => (
                                                <span
                                                    key={idx}
                                                    title={color}
                                                    className="w-6 h-6 rounded-full border border-gray-300"
                                                    style={{ backgroundColor: color }}
                                                ></span>
                                            ))
                                            : "N/A"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Sizes:</td>
                                    <td className="text-gray-800/50 flex gap-2">
                                        {productData.sizes && productData.sizes.length > 0
                                            ? productData.sizes.map((size, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-1 border border-gray-400 rounded text-sm"
                                                >
                                                    {size}
                                                </span>
                                            ))
                                            : "N/A"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div className="flex items-center mt-10 gap-4">
                        <button onClick={handleAddToCartClick} className="w-full py-3.5 bg-orange-600 text-white font-bold hover:bg-orange-400 transition">
                            Add to Cart
                        </button>

                    </div>
                </div>
            </div>


            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 mt-16">
                    <p className="text-3xl font-medium">Featured <span className="font-medium text-orange-600">Products</span></p>
                    <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
                </div>

                <div className="relative w-full max-[400px]:w-screen my-8">
                    <div className="flex flex-wrap justify-around gap-y-6 relative z-10">
                        {products
                            .filter((p) => p.category === productData.category)
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

                <Link href="/all-products" className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                    See more
                </Link>
            </div>
        </div>

        {showSelectModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                    <h2 className="text-xl font-semibold mb-4">Select Size & Color</h2>

                    <div>
                        <p className="font-medium">Sizes:</p>
                        <div className="flex gap-3 mt-2 flex-wrap">
                            {productData.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-3 py-1 border rounded ${selectedSize === size ? "bg-blue-500 text-white" : ""
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="font-medium">Colors:</p>
                        <div className="flex gap-3 mt-2 flex-wrap">
                            {productData.colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border ${selectedColor === color ? "ring-2 ring-blue-600" : ""
                                        }`}
                                    style={{ backgroundColor: color }}
                                    aria-label={color}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            onClick={() => { setShowSelectModal(false); setSelectedColor(""); setSelectedSize("") }}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={
                                (productData.colors.length > 0 && !selectedColor) ||
                                (productData.sizes.length > 0 && !selectedSize)
                            }
                            onClick={() => {
                                addToCart(productData._id, selectedSize || null, selectedColor || null);
                                setSelectedSize("");
                                setSelectedColor("");
                                setShowSelectModal(false);
                            }}
                            className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50"
                        >
                            Add to Cart
                        </button>


                    </div>
                </div>
            </div>
        )}


        <Footer />
    </>
    ) : <Loading />
};

export default Product;

