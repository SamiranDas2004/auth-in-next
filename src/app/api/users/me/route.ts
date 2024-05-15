import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userMosel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
import { getTokenData } from "@/helper/getTokenData";
import { error } from "console";

connect()

export async function GET(request:NextRequest){

    try {
        const userId = await getTokenData(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}