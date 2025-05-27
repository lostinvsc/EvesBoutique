import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { inngest } from "@/config/inngest";
import User from "@/models/User";
import connectDB from "@/config/db";
// import authSeller from "@/lib/authSeller";
// import nodemailer from "nodemailer";
import { sendOrderMessage } from "./function";
import axios from "axios";
export async function POST(request) {
    try {
        await connectDB();

        const { userId } = getAuth(request);
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { address, items } = await request.json();

        if (!address || !items || items.length === 0) {
            return NextResponse.json({ success: false, message: "Invalid data" });
        }

        let totalAmount = 0;


        const parsedItems = [];

        for (const item of items) {
            const [productId, size, color] = item.product.split("-");

            const product = await Product.findById(productId);
            if (!product) {
                return NextResponse.json(
                    { success: false, message: `Product not found: ${productId}` },
                    { status: 404 }
                );
            }

            const itemSubtotal = product.offerPrice * item.quantity;
            totalAmount += itemSubtotal;

            parsedItems.push({
                product: productId,
                size,
                color,
                quantity: item.quantity,
            });
        }



        // const allusers = await User.find({});

        // for (let i = 0; i < allusers.length; i++) {
        //     const isSeller = await authSeller(allusers[i]._id);
        //     if (isSeller) {
        //         const to=allusers[i].email
        //         const subject="New Order placed"
        //         const text="You have received a new order"

        //         const transporter = nodemailer.createTransport({
        //             service: "gmail",
        //             auth: {
        //                 user: process.env.EMAIL_USERNAME,
        //                 pass: process.env.EMAIL_PASSWORD,
        //             },
        //         });

        //         await transporter.sendMail({
        //             from: process.env.EMAIL_USERNAME,
        //             to,
        //             subject,
        //             text,
        //         });


        //     }
        // }


        const orderss = {
            address,
            items: parsedItems,
            amount: totalAmount,
            date: Date.now(),
        }


        if (sendOrderMessage(orderss)) {

        await inngest.send({
            name: "order/created",
            data: {
                userId,
                address,
                items: parsedItems,
                amount: totalAmount,
                date: Date.now(),
            },
        });

        // Clear cart
        const user = await User.findById(userId);
        if (user) {
            user.cartItems = {};
            await user.save();
        }


        return NextResponse.json({ success: true, message: "Order Placed" });
        }

        return NextResponse.json({ success: false, message: "Error placing order" });

    } catch (error) {
        console.error("Order placement error:", error);
        return NextResponse.json({ success: false, message: error.message });
    }
}

export { };
