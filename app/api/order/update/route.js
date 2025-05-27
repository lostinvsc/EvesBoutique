import { auth, getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";
import authSeller from "@/lib/authSeller";

export async function POST(request) {
    try {
        const { userId } = getAuth(request)
        const isSeller = await authSeller(userId)
        if (!isSeller) {
            return NextResponse.json({ success: false, message: "Not authorized" })
        }

        const {orderId,status}=await request.json();

        await connectDB()
      

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        return NextResponse.json({ success: true, order: updatedOrder });


    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }
}

export { }; 
