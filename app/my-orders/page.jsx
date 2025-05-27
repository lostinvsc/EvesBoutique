'use client';
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Loading from "@/components/Loading";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {
    const { currency, getToken, user } = useAppContext();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/order/list', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                setOrders(data.orders.reverse());
                setLoading(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <h2 className="text-lg font-medium mt-6">My Orders</h2>
                    {loading ? (
                        <Loading />
                    ) : (
                        <div className="max-w-5xl border-t border-gray-300 text-sm">
                            {orders.map((order, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-6 p-5 border-b border-gray-300"
                                >
                                    <div className="flex flex-col md:flex-row justify-between">
                                        <div className="space-y-2">
                                            <p className="text-base font-semibold">
                                                Order ID: {order._id}
                                            </p>
                                            <p>
                                                <span className="font-medium">{order.address.fullName}</span><br />
                                                {order.address.area}, {order.address.city},<br />
                                                {order.address.state} - {order.address.pincode}<br />
                                                Phone: {order.address.phoneNumber}
                                            </p>
                                        </div>
                                        <div className="text-sm text-right">
                                            <p className="font-medium">Status: {order.status}</p>
                                            <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
                                            <p>
                                                Delivery: Before{" "}
                                                {new Date(new Date(order.date).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                            </p>

                                            <p className=" text-base">
                                                Mode: {order.paymentType}
                                            </p>
                                            
                                            <p className="font-semibold text-base">
                                                Total: {currency}{order.amount}
                                            </p>
                                            
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 items-center border p-3 rounded">
                                                <Image
                                                    src={item.product.image[0] || assets.box_icon}
                                                    alt={item.product.name}
                                                    width={64}
                                                    height={64}
                                                    className="rounded object-cover"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.product.name}</p>
                                                    <p>Qty: {item.quantity}</p>
                                                    <p>Size: {item.size}</p>
                                                    <p className="flex items-center gap-1">
                                                        Color: <span style={{ backgroundColor: item.color }} className="w-4 h-4 inline-block rounded border" />
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;
