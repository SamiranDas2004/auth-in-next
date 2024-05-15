import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userMosel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

connect()


export async function POST(request:NextRequest) {
    try {
        const reqBody=await request.json();
        const {token}=reqBody

        const user=await User.findOne({verifyToken:token})

        if (!user) {
            return NextResponse.json({error:"ivalid token"},{status:400})
        }
        

        console.log(user);

        user.isVerfied=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined

        await user.save()
        return NextResponse.json(
            {message:"vefification successfull"},{status:200}
        )
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}