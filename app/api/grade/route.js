import db from "@/utils/dbConfig";
import { GRADES } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function GET(req){
    const result=await db.select().from(GRADES);
    return NextResponse.json(result)
}