import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"


export const sendEmail = async({email, emailType, userId}: any) => {
    try {
        
        //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(
              userId, // this is the Id that it will find
              {
                //these are the only fields that will be updated
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
              }
            );
        }else if (emailType === "RESET"){
            await User.findByIdAndUpdate(
              userId, // this is the Id that it will find
              {
                //these are the only fields that will be updated
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
              }
            );
        }
          
         

          //create mail smtp to 
          let transport = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: "nba4everwanted@gmail.com",
              pass: "cfieuujsdrceoryi",
            },
          });

          

          //mail options
          const mailOptions = {
            from: 'nba4everwanted@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
              
              <p>
                 Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "verifyforgotpassword" }?token=${hashedToken}">here</a> to 
                 ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
              </p>
            `
          }

          const mailresponse = await transport.sendMail(mailOptions);
          //console.log(mailresponse);
          return mailresponse;

    } catch (error: any) {
        throw new Error(error.message)
    }
}