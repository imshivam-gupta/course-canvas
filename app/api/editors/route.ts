
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";

export async function POST(
  req: Request,
) {
  try {
    const { name,teacherId } = await req.json();

    if (!teacherId || !isTeacher(teacherId)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.editor.create({
      data: {
        name,
      }
    });

    

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}