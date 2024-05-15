import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userMosel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
import { getTokenData } from "@/helper/getTokenData";
import { error } from "console";

connect()
 
export async function POST(request:NextRequest) {
   const userId= await getTokenData(request)
   const user=await User.findOne({_id:userId});
   if (!user) {
    return NextResponse.json({message: "user not found"}, {status: 500})
   }

   return NextResponse.json({message:"user found",data:user})
}