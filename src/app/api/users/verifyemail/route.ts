import {connect} from "@/dbconfig/dbConfig";
import User from "@/models/userMosel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

connect()


export async function GET() {
    try {
     
        const response = NextResponse.json(
            {
                message: " successful",
                success: true,
                
            }
        )

        return response;
     
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}