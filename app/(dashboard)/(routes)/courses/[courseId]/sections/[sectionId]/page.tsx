import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import {fetchFromAPI} from "@/lib/utils";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; sectionId: string;}
}) => {
  // const course = await db.course.findUnique({
  //   where: {
  //     id: params.courseId,
  //   },
  //   include: {
  //       sections: {
  //           include: {
  //               chapters: {
  //                   where: {
  //                       isPublished: true,
  //                   },
  //                   orderBy: {
  //                       position: "asc"
  //                   }
  //               }
  //           },
  //           orderBy: {
  //               position: "asc"
  //           }
  //       }
  //   }
  // });
  //
  // const section = await db.section.findUnique({
  //   where: {
  //     id: params.sectionId,
  //     courseId: params.courseId,
  //   },
  //   include: {
  //     chapters: {
  //       where: {
  //         isPublished: true,
  //       },
  //       orderBy: {
  //         position: "asc",
  //       },
  //     },
  //   },
  // });

  // if (!course) {
  //   return redirect("/");
  // }

    const course =  await fetchFromAPI(`/course/${params.courseId}`,"GET");
    const section =  await fetchFromAPI(`/section/${params.sectionId}`,"GET");
    console.log("course section" ,course,section)
    return redirect(`/courses/${course._id}/sections/${params.sectionId}/chapters/${section.chapters[0]._id}`);
}
 
export default CourseIdPage;