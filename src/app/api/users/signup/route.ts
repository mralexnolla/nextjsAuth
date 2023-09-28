import connect from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(req: NextRequest) {
  try {

    const reqBody = await req.json()
    const {username, email, password} = reqBody;

    console.log(reqBody)

    //check if user already exist
    const user = await User.findOne({email})
    if(user){
        return NextResponse.json({
          message: "user already exist",
          error: "This error is because user already exist",
          success: false
        },
        {status: 400});
    }

    //hash password 
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt) 

    //save the user in the database 

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save()
    //console.log(savedUser);
    
    

    //send verification email before sending response
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    

    return NextResponse.json(
      {
        message: "user created successfully",
        success: true,
        data: savedUser,
      },
      { status: 201 }
    );

  } catch (error: any) {
    return NextResponse.json({ 
        error: error.message,
        message: "error in post function for signup route",
        success: false
    }, 
        { status: 500 });
  }
}