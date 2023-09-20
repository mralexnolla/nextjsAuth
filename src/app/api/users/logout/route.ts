import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message: "logout successfull",
            success: true
        })
        
        //remove the token from the cookies 
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)})

        return response

    } catch (error: any) {
        return NextResponse.json({
          message: "failed to logout",
          success: false,
        });
    }
}