import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; }
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

  if (!course) {
    return redirect("/");
  }

  return redirect(`/courses/${course.id}/sections/${course.sections[0].id}/chapters/${course.sections[0].chapters[0].id}`);
}
 
export default CourseIdPage;