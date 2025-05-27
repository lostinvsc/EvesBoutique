import authSeller from "@/lib/authSeller"
import Product from "@/models/Product"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import connectDB from "@/config/db"
export async function DELETE(request) {
    try {
        const { userId } = getAuth(request)

        const isSeller = authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "Not authorized" })
        }

        const { productId } = await request.json();
        if (!productId) {
            return NextResponse.json({ success: false, message: "Product ID is required" });
        }
        await connectDB()
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, product: deletedProduct });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}

export { };