import { redirect } from "next/navigation";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import matter from "gray-matter";
import { NotionAPI } from "notion-client";
import { auth } from "@/auth";
import Content from "./_components/Content";
import { cache } from "react";
import { NotionRenderer } from "@/components/notion/NotionRender";

const notion = new NotionAPI();
const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string; sectionId: string };
}) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return redirect("/auth/signin");
  }

  if (!userId) {
    return redirect("/");
  }

  const { chapter, course, userProgress } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
    sectionId: params.sectionId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }
  let notionRecordMap = null;

  if (chapter?.docUrl) {
    notionRecordMap = await notion.getPage(chapter.docUrl);
  }



  // const uri = new URL(chapter.docUrl!);
  // const response = await fetch(chapter?.docUrl);
  // const content = await response.text();
  // const matterResult = matter(content);

  return (
    <div>
      <div>
        {userProgress?.isCompleted && (
          <Banner
            variant="success"
            label="You already completed this chapter."
          />
        )}

        <NotionRenderer recordMap={notionRecordMap} />


        {/* <Content chapter={chapter} matterResult={matterResult} /> */}
      </div>
    </div>
  );
};

export default ChapterIdPage;
