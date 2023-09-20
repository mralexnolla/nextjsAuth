import { NextRequest, NextResponse } from "next/server";
import  jwt  from "jsonwebtoken";

export const getDataFromToken = (req: NextRequest) => {
    try {
        //get the encoded token
        const encodedToken = req.cookies.get("token")?.value || "";

        //decode the encoded token
        const decodedToken: any = jwt.verify(encodedToken, process.env.TOKEN_SECRET!);
        return decodedToken.id  //id is part of the token data in the login route

    } catch (error: any) {
        throw new Error(error.message)
        return NextResponse.json({
            message: "failed to get data fro token",
            success: false
        })
    }
}