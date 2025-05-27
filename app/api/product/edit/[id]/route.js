import connectDB from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";

// Get single product
export async function GET(request, { params }) {
  try {
      
      const { userId } = getAuth(request);
      const isSeller = authSeller(userId);
      if (!isSeller) {
          return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 });
        }
        
        const { id } =await params;
        
    
        await connectDB();

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true,product});
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}



export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { userId } = getAuth(request);
    const isSeller = authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
    if (!updatedProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { userId } = getAuth(request);
    const isSeller = authSeller(userId);
    if (!isSeller) {
      return NextResponse.json({ success: false, message: "Not authorized" }, { status: 401 });
    }

    const { id } = params;

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: deletedProduct });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export {};