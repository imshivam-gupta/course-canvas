import { SectionsList } from "@/components/sections-list";
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
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc"
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc"
                }
            }
        }
      }
    }
  });
    

  if (!course) {
    return redirect("/");
  }

  return(
    <div className="p-6 space-y-4">
         <h1 className="flex flex-row justify-center text-2xl  font-medium group-hover:text-sky-700 transition line-clamp-2">
        {course.title}
      </h1>
        <SectionsList items={course.sections} />
    </div>
  )
}
 
export default CourseIdPage;