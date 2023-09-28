import connect from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect()

export async function POST(req: NextRequest){
    try {
        
       const reqBody = await req.json()
       const {token} = reqBody
       console.log(token)

       //getting the user base on the token
       const user  = await User.findOne({ verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}}); //$gt = greater than

       if(!user){
        return NextResponse.json({
            message: "Invalid token",
            success: false
        }, {status: 400})
       }

       user.isVerified = true;
       user.verifyToken = undefined;
       user.verifyTokenExpiry = undefined;

       await user.save();

       return NextResponse.json({
        message: "Email verified successfully",
        success: true
       })

    } catch (error: any) {
        return NextResponse.json({
            message: "verification failed",
            success: false,
            error: error.message
        }, {status: 500})
    }
}