
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@/auth";

export async function POST(
  req: Request,
) {
  try {
    const session = await auth();
    const { name,teacherId } = await req.json();

    if (!teacherId || !isTeacher(session?.user)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.editor.create({
      data: {
        name,
      }
    });

    

    return NextResponse.json(course);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}