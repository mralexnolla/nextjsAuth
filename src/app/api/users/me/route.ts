import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbconfig/dbconfig";

connect();

export async function GET(req: NextRequest){
    try {
        const userId = await getDataFromToken(req)
        const user = await User.findOne({ _id: userId }).select("-password"); // return the user without the password
        return NextResponse.json({
            message: "User Found",
            data: user
        })

    } catch (error: any) {
       // throw new Error(error.message)
        return NextResponse.json({
            message: "failed to get toke Data from me",
            success: false,
            error: error.message
        })
    }
}