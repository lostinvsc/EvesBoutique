import { auth, getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Order from "@/models/Order";
import Address from "@/models/Address";
import authSeller from "@/lib/authSeller";

export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        const isSeller = await authSeller(userId)
        if (!isSeller) {
            return NextResponse.json({ success: false, message: "Not authorized" })
        }

        await connectDB()
        Address.length

        const orders = await Order.find({ }).populate('address items.product')

        return NextResponse.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }
}

export { }; 
