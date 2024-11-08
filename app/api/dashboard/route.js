import db from "@/utils/dbConfig";
import { ATTENDACE, STUDENTS } from "@/utils/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date");
  const grade = searchParams.get("grade");

  const result = await db
    .select({
      day: ATTENDACE.day,
      presentCount: sql`count(${ATTENDACE.day})`,
    })
    .from(ATTENDACE)
    .innerJoin(STUDENTS, eq(ATTENDACE.studentId, STUDENTS.id))
    .groupBy(ATTENDACE.day)
    .where(and(eq(ATTENDACE.date, date), eq(ATTENDACE.grade, grade)))
    .orderBy(desc(ATTENDACE.day))
    .limit(7);

  return NextResponse.json(result);
}
