import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";
import { ChapterActions } from "./_components/chapter-actions";
import { ChapterDocForm } from "./_components/chapter-doc-form";
import { getServerSession } from "next-auth";

const ChapterIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string,sectionId:string }
}) => {
    const session = await getServerSession();
    if (!session?.user) {
      return redirect("/");
    }

    const staticData = await fetch(`${process.env.NEXT_API_URL}/user`, {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({ email: session.user.email }),
    });
    const res = await staticData.json();
    const userId = res.user.id;

    if (!userId) {
        return redirect("/");
    }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      sectionId: params.sectionId
    },
    include: {
      muxData: true,
      attachment: true,
    },
  });

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId
    }
  });

  if (!course) {
    return redirect("/");
  }

  if (!chapter) {
    return redirect("/")
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl || chapter.docUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}/sections/${params.sectionId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to section setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  Chapter Creation
                </h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                sectionId={params.sectionId}
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Customize your chapter
                </h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
                sectionId={params.sectionId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
                sectionId={params.sectionId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">
                  Access Settings
                </h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
                sectionId={params.sectionId}
              />
            </div>
          </div>
          <div>
          <div>
            <div className="flex items-center gap-x-2 mb-4">
              <IconBadge icon={Video} />
              <h2 className="text-xl">
                Add a video
              </h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
              sectionId={params.sectionId}
            />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">
                Add a markdown file
              </h2>
            </div>
            <ChapterDocForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
              sectionId={params.sectionId}
            />
          </div>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default ChapterIdPage;