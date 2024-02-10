import { redirect } from "next/navigation";
import { LayoutDashboard, ListChecks } from "lucide-react";
import ObjectId from "bson-objectid"
import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Actions } from "./_components/actions";
import { auth } from '@/auth'

const SectionIdPage = async ({
  params
}: {
  params: { sectionId: string,courseId: string}
}) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }
  const userId = session?.user.id;

    if (!userId) {
        return redirect("/");
    }

    const section_id_mon = ObjectId.createFromHexString(params.sectionId);
    const course_id_mon = ObjectId.createFromHexString(params.courseId);
    const section = await db.section.findUnique({
      where: {
        id: section_id_mon,
        courseId: course_id_mon
      },
      include: {
        chapters: {
          orderBy: {
            position: "asc",
          },
        }
      },
    });


  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // if (!section) {
  //   return redirect("/");
  // }

  const requiredFields = [
    section.title,
    section.description,
    section.imageUrl
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>


      {!section.isPublished && (
        <Banner
          label="This section is unpublished. It will not be visible to the students."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Section setup
            </h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            sectionId={params.sectionId}
            isPublished={section.isPublished}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Customize your section
                </h2>
              </div>
              <TitleForm
                initialData={section}
                sectionId={section.id}
                courseId={params.courseId}
              />
              <DescriptionForm
                initialData={section}
                sectionId={section.id}
                courseId={params.courseId}
              />
              <ImageForm
                initialData={section}
                sectionId={section.id}
                courseId={params.courseId}
              />
            </div>

           
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">
                  Section Chapters
                </h2>
              </div>
              <ChaptersForm
                courseId={params.courseId}
                initialData={section}
                sectionId={section.id}
              />
            </div>
          </div>
        </div>
    </div>
</>
   );
}
 
export default SectionIdPage;