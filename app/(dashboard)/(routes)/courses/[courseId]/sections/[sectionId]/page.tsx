import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; sectionId: string;}
}) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
        sections: {
            include: {
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    orderBy: {
                        position: "asc"
                    }
                }
            },
            orderBy: {
                position: "asc"
            }
        }
    }
  });

  const section = await db.section.findUnique({
    where: {
      id: params.sectionId,
      courseId: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  return redirect(`/courses/${course.id}/sections/${params.sectionId}/chapters/${section.chapters[0].id}`);
}
 
export default CourseIdPage;