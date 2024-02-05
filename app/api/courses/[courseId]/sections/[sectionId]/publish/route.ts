import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string,sectionId:string } }
) {
  try {
    const userId = req.headers.get("authorization");

    if (!userId) {
      console.log("[CHAPTER_PUBLISH] Unauthorized", userId);
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId
      }
    });

    if (!ownCourse) {
      console.log("[CHAPTER_PUBLISH] Unauthorized", userId, params.courseId);
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const section = await db.section.findUnique({
      where: {
        id: params.sectionId,
        courseId: params.courseId,
      }
    });


    if (!section || !section.title || !section.description || (!section.imageUrl)) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedSection = await db.section.update({
      where: {
        id: params.sectionId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedSection);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}