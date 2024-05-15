import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userMosel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
import { error } from "console";
import jwt from 'jsonwebtoken'
connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody= await request.json();
        const {email,password}=reqBody;
        console.log(reqBody);

        const user=await User.findOne({email});
        if (!user) {
            return NextResponse.json({error:"user is not with this email"},{status:404})
        }
        const validPassword=await bcryptjs.compare(password,user.password)

        if (!validPassword) {
            return NextResponse.json({error:"user is not with this password"},{status:404})
        }

        const tokendata={
            id:user._id
        }

        const token=jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:'1d'})

        const response=NextResponse.json({message:"logged in Success",
            success:true
        })


        response.cookies.set("token",token,{httpOnly:true})
        return response

    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:404}
        )
    }
}