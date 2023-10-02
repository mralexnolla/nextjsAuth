import connect from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect()

export async function POST(req: NextRequest){
    try {

        const reqBody = await req.json()
        const { email, newpword, confirmpword } = reqBody;
        
        const user = await User.findOne({ email });
        if(!user){
            return NextResponse.json({
                message: "user not found",
                success: false
            })
        }

        if(newpword !== confirmpword){
            return NextResponse.json({
                message: "New password and confirm password must be identical",
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(confirmpword, salt);

        //update the passowrd
        user.password = hashedPassword;
        await user.save()

        return NextResponse.json({
            message: "Password Reset successfully",
            success: true
        })
        
    } catch (error: any) {
        return NextResponse.json({
            message: "failed to reset password",
            success: false,
            error: error.message
        }, {status: 500})
    }
}
