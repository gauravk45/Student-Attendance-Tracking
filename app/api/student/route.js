import db from "@/utils/dbConfig";
import { STUDENTS } from "@/utils/schema";
import { NextResponse } from "next/server";
import { eq } from 'drizzle-orm';

export async function POST(req,res){
    const data=await req.json();

    const result = await db.insert(STUDENTS)
    .values({
        name:data?.name,
        grade:data?.grade,
        address:data?.address,
        contact:data?.contact
    })
    return NextResponse.json({"error":result});
}

export async function GET(req){

    const result=await db.select().from(STUDENTS);

    return NextResponse.json(result);
}

export async function DELETE(req) {
    console.log("fffffffffffffffffffffffffffffffffffffffffffff")
    try {
        const searchParams = req.nextUrl.searchParams;
        const id = searchParams.get('id');  // Get the id from query parameters

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        console.log("Deleting record with ID:", id);  // Debugging log

        // Execute the DELETE query
        const result = await db.delete(STUDENTS)
            .where(eq(STUDENTS.id, parseInt(id)));  // Use 'eq' to match the ID

        // Check if any rows were deleted
        if (result.rowCount === 0) {
            return NextResponse.json({ message: 'No record found with this ID' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Record deleted successfully', result });
    } catch (error) {
        console.error("Error during deletion:", error);  // Log the error
        return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
    }
}
