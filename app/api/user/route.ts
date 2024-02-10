import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const user_email = req.body.email;
        const user = await db.user.findFirst({where:{email:user_email}});
        return NextResponse.json({user});
    } catch(e){
        return new NextResponse("Internal Error", { status: 500 });
    }
}