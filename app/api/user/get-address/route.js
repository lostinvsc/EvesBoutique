import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";
import Address from "@/models/Address";
import connectDB from "@/config/db";

export async function GET(request) {
    try {
        const { userId } = getAuth(request)

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        
        await connectDB();

        const addresses = await Address.find({ userId })
  
        return NextResponse.json({ success: true, addresses })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}