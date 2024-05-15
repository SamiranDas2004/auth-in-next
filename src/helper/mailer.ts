import nodemailer from 'nodemailer';
import User from "@/models/userMosel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {
                    $set:{verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {
                    $set:{forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}})
        }

      var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c02a326972bdb2",
    pass: "********4871"
  }
});

        const mailOptions = {
            from: 'samiran4209@gmail.com',
            to:'samiranbca68@gmail.com',
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail
        (mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}