'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function EditProduct() {
    const { id } = useParams();
    const router = useRouter();

    const [product, setProduct] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const categories = ['Garments', 'Bags', 'Footwear', 'Accessories', 'Merchandise', 'Jewelleries', 'Cosmetics'];


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/product/edit/${id}`);
                if (data.success) {
                    setProduct(data.product);
                    setFormData(data.product);
                } else {
                    toast.error(data.message || 'Error fetching product');
                }
            } catch (err) {
                toast.error('Error fetching product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (name, index, value) => {
        const updated = [...(formData[name] || [])];
        updated[index] = value;
        setFormData(prev => ({ ...prev, [name]: updated }));
    };

    const handleUpdate = async () => {
        const confirmUpdate = window.confirm('Are you sure you want to update this product?');
        if (!confirmUpdate) return;

        setUpdating(true);
        try {
            const { data } = await axios.put(`/api/product/edit/${id}`, formData);
            if (data.success) {
                toast.success('Product updated successfully!');
                router.push('/seller/product-list');
            } else {
                toast.error(data.message || 'Update failed');
            }
        } catch (err) {
            toast.error('Update error');
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) return;

        try {
            const { data } = await axios.delete(`/api/product/edit/${id}`);
            if (data.success) {
                toast.success('Product deleted!');
                router.push('/seller/product-list');
            } else {
                toast.error(data.message || 'Delete failed');
            }
        } catch (err) {
            toast.error('Delete error');
        }
    };

    if (loading) return <div className="text-center py-10 text-xl">Loading...</div>;
    if (!product) return <div className="text-center py-10 text-red-600">Product not found</div>;

    return (
        <div className="max-w-3xl p-4 sm:p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

            <div className="space-y-4">
                {/* Standard fields */}
                {[
                    { label: 'Name', name: 'name' },
                    { label: 'Description', name: 'description' },
                    { label: 'Price', name: 'price', type: 'number' },
                    { label: 'Offer Price', name: 'offerPrice', type: 'number' }
                ].map(field => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium mb-1">{field.label}</label>
                        <input
                            type={field.type || 'text'}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                ))}

                {/* Category Dropdown */}
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        name="category"
                        value={formData.category || product.category}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value={product.category}>{product.category} (current)</option>
                        {categories
                            .filter(cat => cat !== product.category)
                            .map(cat => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Sizes */}
                <div>
                    <label className="block text-sm font-medium mb-1">Sizes</label>
                    {(formData.sizes || []).map((size, index) => (
                        <div key={index} className="flex items-center mb-2 space-x-2">
                            <input
                                value={size}
                                onChange={(e) => handleArrayChange('sizes', index, e.target.value)}
                                className="w-full border rounded p-2"
                                placeholder={`Size ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const updated = [...formData.sizes];
                                    updated.splice(index, 1);
                                    setFormData(prev => ({ ...prev, sizes: updated }));
                                }}
                                className="text-red-600 hover:text-red-800 font-bold px-2"
                                title="Remove size"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            setFormData(prev => ({
                                ...prev,
                                sizes: [...(prev.sizes || []), '']
                            }))
                        }
                        className="text-orange-600 hover:underline mt-1"
                    >
                        + Add Size
                    </button>
                </div>

                {/* Colors */}
                <div>
                    <label className="block text-sm font-medium mb-1">Colors</label>
                    {(formData.colors || []).map((color, index) => (
                        <div key={index} className="flex items-center mb-2 space-x-2">
                            <input
                                type="text"
                                value={color}
                                onChange={(e) => handleArrayChange('colors', index, e.target.value)}
                                className="w-32 px-2 py-1 border rounded text-sm"
                                placeholder="#ff0000 or red"
                                title={`Color ${index + 1}`}
                            />
                            <div
                                className="w-6 h-6 rounded border"
                                style={{ backgroundColor: color }}
                                title={color}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const updated = [...formData.colors];
                                    updated.splice(index, 1);
                                    setFormData(prev => ({ ...prev, colors: updated }));
                                }}
                                className="text-red-600 hover:text-red-800 font-bold px-2"
                                title="Remove color"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            setFormData(prev => ({
                                ...prev,
                                colors: [...(prev.colors || []), '']
                            }))
                        }
                        className="text-orange-600 hover:underline mt-1"
                    >
                        + Add Color
                    </button>
                </div>



                {/* Popular checkbox */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="popular"
                        checked={formData.popular || false}
                        onChange={(e) =>
                            setFormData(prev => ({ ...prev, popular: e.target.checked }))
                        }
                    />
                    <label className="text-sm">Popular</label>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button
                        onClick={handleUpdate}
                        className="bg-orange-600 hover:bg-orange-400 text-white py-2 px-4 rounded"
                        disabled={updating}
                    >
                        {updating ? 'Updating...' : 'Update Product'}
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-black hover:bg-red-700 text-white py-2 px-4 rounded"
                    >
                        Delete Product
                    </button>
                </div>
            </div>
        </div>
    );
}
