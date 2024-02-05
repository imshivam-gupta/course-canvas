import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const section = await db.section.findMany({
        where: {
            courseId: courseId,
            isPublished: true,
        },
        select: {
            id: true,
        }
    });
    const sectionIds = section.map((section) => section.id);

    const publishedChapters = await db.chapter.findMany({
      where: {
        sectionId: {
          in: sectionIds,
        },
        isPublished: true,
      },
      select: {
        id: true,
      }
    });
   
    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      }
    });

    const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
}