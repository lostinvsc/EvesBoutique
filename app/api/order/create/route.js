import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";
import Order from "@/models/Order"
import { inngest } from "@/config/inngest";
import User from "@/models/User";

export async function POST(request) {
    try {
        const { userId } = getAuth(request)

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const {address,items} = await request.json()

        if(!address || !items.length){
                    return NextResponse.json({ success: false, message:"Invalid data" })
        }
        
        const amount=await items.reduce(async(acc,item)=>{
            const product=await Product.findById(items.product)
            return acc+product.offerPrice*item.quantity
        },0)

        await inngest.send({
            name:'order/created',
            data:{
                userId,
                address,
                items,
                amount:amount + Math.floor(amount*0.02),
                date:Date.now()
            }
        })

        const user =await User.findById(userId)
        user.cartItems={}
        await user.save()

        return NextResponse.json({ success: true, meassage: 'Order Placed' })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }
}