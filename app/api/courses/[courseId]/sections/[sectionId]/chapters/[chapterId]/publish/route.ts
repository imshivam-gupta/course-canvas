import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string,sectionId:string } }
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

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        sectionId: params.sectionId,
      }
    });

    const muxData = await db.muxData.findUnique({
      where: {
        chapterId: params.chapterId,
      }
    });

    if (!chapter || !chapter.title || !chapter.description || (!chapter.videoUrl && !chapter.docUrl)) {
      console.log("[CHAPTER_PUBLISH] Missing required fields", chapter, muxData);
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        sectionId: params.sectionId,
      },
      data: {
        isPublished: true,
      }
    });

    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}