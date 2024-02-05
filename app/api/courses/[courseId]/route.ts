import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { courseId: string } }
  ) {
    try {
      const userId = req.headers.get("authorization");
      const { courseId } = params;
      const values = await req.json();

      console.log("[COURSE_ID]", userId, courseId, values);
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      const course = await db.course.update({
        where: {
          id: courseId,
          userId
        },
        data: {
          ...values,
        }
      });
  
      return NextResponse.json(course);
    } catch (error) {
      console.log("[COURSE_ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
}