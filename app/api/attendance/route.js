import db from "@/utils/dbConfig";
import { ATTENDACE, STUDENTS } from "@/utils/schema";
import { and, eq, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";
import { parse } from 'date-fns';

// GET Attendance Records
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const grade = searchParams.get("grade");
  const month = searchParams.get("month");

  try {
    const result = await db
      .select({
        name: STUDENTS.name,
        present: ATTENDACE.present,
        day: ATTENDACE.day,
        date: ATTENDACE.date,
        grade: STUDENTS.grade,
        studentId: STUDENTS.id,
        attendanceId: ATTENDACE.id,
      })
      .from(STUDENTS)
      .leftJoin(ATTENDACE, eq(STUDENTS.id, ATTENDACE.studentId))
      .where(eq(STUDENTS.grade, grade))
      .where(or(eq(ATTENDACE.date, month), isNull(ATTENDACE.date)));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance data" },
      { status: 500 }
    );
  }
}

// POST New Attendance Record
export async function POST(req) {
  const data = await req.json();
  console.log("Received data on server:", data); // Debugging log

  try {
    const result = await db.insert(ATTENDACE).values({
      day: data.day,
      studentId: data.studentId,
      present: data.present,
      date: data.date,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error inserting attendance record:", error);
    return NextResponse.json(
      { error: "Failed to mark attendance" },
      { status: 500 }
    );
  }
}

// DELETE Attendance Record
 // Make sure to install date-fns if you haven't

 export async function DELETE(req) {
   const searchParams = req.nextUrl.searchParams;
   const studentId = searchParams.get("studentId");
   const date = searchParams.get("date"); // Expected format: "MM/YYYY"
   const day = searchParams.get("day");
 
   // Ensure that the parameters are properly retrieved
   if (!studentId || !date || !day) {
     return new NextResponse("Missing parameters", { status: 400 });
   }
 
   try {
     // Append a day to the date string to make it valid (e.g., "01/05/2024")
     const dateString = `01/${date}`; // Assuming first day of the month
     const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
 
     // Check if the parsed date is valid
     if (!isValid(parsedDate)) {
       return new NextResponse("Invalid date format", { status: 400 });
     }
 
     // Convert parsed date to ISO format (YYYY-MM-DD)
     const isoDate = parsedDate.toISOString().split('T')[0];
 
     // Perform the deletion in the database
     const result = await db
       .delete(ATTENDACE)
       .where(
         and(
           eq(ATTENDACE.day, day),
           eq(ATTENDACE.studentId, studentId),
           eq(ATTENDACE.date, isoDate) // Use isoDate here
         )
       );
 
     return NextResponse.json({ success: true, result });
   } catch (error) {
     console.error("Error deleting attendance record:", error);
     return new NextResponse("Internal Server Error", { status: 500 });
   }
 }
 
