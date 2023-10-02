import connect from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(req: NextRequest) {
    try {
      const reqBody = await req.json();
      const { email } = reqBody;

      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json(
          {
            message: "user not found",
            success: false
          },
          { status: 404 }
        );
      }

      const userId = user._id.toString();
      //console.log(userId);

      await sendEmail({ email, emailType: "RESET", userId });
      return NextResponse.json({
        message: "an mail has been sent you",
        success: true,
        data: { email: user.email },
      });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            message: "failed to update password",
            success: false,
        }, {status: 500})
    }
}