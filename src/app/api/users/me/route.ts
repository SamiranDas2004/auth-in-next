import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userMosel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

import { error } from "console";

connect()

export async function POST(request: NextRequest) {
    try {
      
        const { email } = await request.json();
        
       
        if (!email) {
            throw new Error("Email is missing in the request body");
        }
        
       
        const user = await User.findOne({ email });
        
        
        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error:any) {
       
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

