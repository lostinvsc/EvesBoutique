import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { inngest } from "@/config/inngest";
import User from "@/models/User";
import connectDB from "@/config/db";

export async function POST(request) {
    try {
        const { userId } = getAuth(request)

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const {address,items} = await request.json()

        if(!address || items.length===0){
                    return NextResponse.json({ success: false, message:"Invalid data" })
        }
         
        const amount=await items.reduce(async(acc,item)=>{
            const product=await Product.findById(item.product)
            return await acc+product.offerPrice*item.quantity
        },0)

        await inngest.send({
            name:'order/created',
            data:{
                userId,
                address,
                items,
                amount:amount ,
                date:Date.now()
            }
        })

         await connectDB();

        const user =await User.findById(userId)

        user.cartItems={}
        await user.save()

        return NextResponse.json({ success: true, message: 'Order Placed' })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error.message })
    }
}

export {}; 
