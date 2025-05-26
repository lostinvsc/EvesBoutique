'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {

  const { getToken } = useAppContext()
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Garments');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popular, setPopular] = useState(false);

  const [sizes, setSizes] = useState([]);
  const [newSize, setNewSize] = useState('');

  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState('');






  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true); // Disable the button


    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('price', price)
    formData.append('offerPrice', offerPrice)
    formData.append('popular', popular);
    formData.append('sizes', JSON.stringify(sizes));
    formData.append('colors', JSON.stringify(colors));



    for (let i = 0; i < files.length; i++) {

      formData.append('images', files[i])

    }

    try {
      const token = await getToken()

      const { data } = await axios.post('/api/product/add', formData, { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        toast.success(data.message)
        setFiles([])
        setCategory('Garments')
        setName('')
        setDescription('')
        setPrice('')
        setOfferPrice('')
        setPopular(false)
        setSizes([])
        setColors([])
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">

            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input onChange={(e) => {
                  const updatedFiles = [...files];
                  updatedFiles[index] = e.target.files[0];
                  setFiles(updatedFiles);
                }} type="file" id={`image${index}`} hidden />
                <Image
                  key={index}
                  className="max-w-24 cursor-pointer"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                />
              </label>
            ))}

          </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={category}
            >
              <option value="Garments">Garments</option>
              <option value="Footwear">Footwear</option>
              <option value="Bags">Bags</option>
              <option value="Merchandise">Merchandise</option>
              <option value="Accessories">Accessories</option>
              <option value="Jewelleries">Jewelleries</option>
              <option value="Cosmetics">Cosmetics</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              required
            />
          </div>

          {/* Sizes */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium">Sizes</label>
            <div className="flex gap-2 flex-wrap items-center">
              <input
                type="text"
                placeholder="e.g., XS"
                className="border px-3 py-1 rounded"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
              />
              <select
                className="border px-3 py-1 rounded"
                onChange={(e) => setNewSize(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Select size</option>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="bg-orange-600 text-white px-3 py-1 rounded"
                onClick={() => {
                  const size = newSize.toUpperCase();
                  if (size && !sizes.includes(size)) {
                    setSizes([...sizes, size]);
                    setNewSize('');
                  }
                }}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <span
                  key={size}
                  className="bg-gray-200 text-sm px-2 py-1 rounded cursor-pointer"
                  onClick={() => setSizes(sizes.filter((s) => s !== size))}
                  title="Click to remove"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>


          {/* Colors */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium">Colors</label>
            <div className="flex gap-2 flex-wrap items-center">
              <input
                type="text"
                placeholder="e.g., red"
                className="border px-3 py-1 rounded"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
              />

              {/* Color Picker */}
              <input
                type="color"
                className="w-10 h-10 p-0 border rounded"
                onChange={(e) => setNewColor(e.target.value)}
                title="Pick a color"
              />

              <button
                type="button"
                className="bg-orange-600 text-white px-3 py-1 rounded"
                onClick={() => {
                  const color = newColor.toLowerCase();
                  if (color && !colors.includes(color)) {
                    setColors([...colors, color]);
                    setNewColor('');
                  }
                }}
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <span
                  key={color}
                  className="flex items-center gap-1 bg-gray-200 text-sm px-2 py-1 rounded cursor-pointer"
                  onClick={() => setColors(colors.filter((c) => c !== color))}
                  title="Click to remove"
                >
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {color}
                </span>
              ))}
            </div>
          </div>



          <div className="flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="popular">
              Popular Product
            </label>
            <div className="flex items-center gap-2">
              <input
                id="popular"
                type="checkbox"
                checked={popular}
                onChange={(e) => setPopular(e.target.checked)}
                className="w-5 h-5"
              />
              <span>{popular ? "Yes" : "No"}</span>
            </div>
          </div>

        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-2.5 text-white font-medium rounded transition ${isSubmitting ? "bg-orange-400 cursor-not-allowed" : "bg-orange-600"
            }`}
        >
          {isSubmitting ? "Adding..." : "ADD"}
        </button>

      </form>
      {/* <Footer /> */}
    </div>
  );
};

export default AddProduct;