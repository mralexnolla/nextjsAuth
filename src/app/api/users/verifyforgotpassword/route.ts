import connect from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect()

export async function POST(req: NextRequest) {
    try {
        
       const reqBody = await req.json()
       const { token } = reqBody;

       const user = await User.findOne({
         forgotPasswordToken: token,
         forgotPasswordTokenExpiry: {$gt: Date.now()},
       });

       const mail = user.email;

       if(!user){
        return NextResponse.json({
            message: "Invalid password token",
            success: false
        }, {status: 400})
       }

       user.forgotPasswordToken = undefined;
       user.forgotPasswordTokenExpiry = undefined;

       await user.save()

       return NextResponse.json({
         message: "Email verified for password successfully",
         success: true,
         data: mail,
       });

    } catch (error: any) {
         return NextResponse.json(
           {
             message: "verification failed",
             success: false,
             error: error.message,
           },
           { status: 500 }
         );
    }
}