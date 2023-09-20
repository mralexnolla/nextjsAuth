import connect from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(req: NextRequest){
    try {

        const reqBody = await req.json()
        const { email, password } = reqBody;
        

        //check if user exist
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                message: "User does not exist",
                success: false
            }, {status: 400})
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({
                message: "invalid password",
                success: false
            }, {status: 400})
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create the token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "loging successfull",
            success: true
        })

        response.cookies.set("token", token, {httpOnly: true})

        return response

        
    } catch (error: any) {
        return NextResponse.json({
          error: error.message,
          message: "Failed to login",
          success: false
        }, {status: 500});
    }
}



