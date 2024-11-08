import { redirect } from "next/navigation";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import matter from "gray-matter";
import { NotionAPI } from "notion-client";
import { auth } from "@/auth";
import Content from "./_components/Content";
import { cache } from "react";
import { NotionRenderer } from "@/components/notion/NotionRender";
import {fetchFromAPI} from "@/lib/utils";
import {
    HeroVideoDialog
} from "@/app/(dashboard)/(routes)/courses/[courseId]/sections/[sectionId]/chapters/[chapterId]/_components/video-component";
import CodeMirror from "@uiw/react-codemirror";
import Playground
    from "@/app/(dashboard)/(routes)/courses/[courseId]/sections/[sectionId]/chapters/[chapterId]/_components/playground";

const notion = new NotionAPI();
const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string; sectionId: string };
}) => {


  const chapter = await fetchFromAPI(`/chapter/${params.chapterId}`,"GET");
  console.log(chapter)
  let notionRecordMap = null;
  if (chapter?.articleUrl) {
    notionRecordMap = await notion.getPage(chapter.articleUrl);
  }
  //
  //
  // const uri = new URL(chapter.articleUrl!);
  // const response = await fetch(chapter?.docUrl);
  // const content = await response.text();
  // const matterResult = matter(content);

    let notionProblemMap = null;
  if(chapter?.problem?.descriptionUrl){
      notionProblemMap = await notion.getPage(chapter?.problem?.descriptionUrl);
  }
  return (
    <div>
      <div>

          {notionRecordMap &&
        <NotionRenderer recordMap={notionRecordMap} />
          }

          {chapter.videoUrl &&
          <div className={"text-center text-white"}>
              <HeroVideoDialog
                  className="block"
                  animationStyle="from-center"
                  videoSrc={chapter.videoUrl}
                  thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                  thumbnailAlt="Hero Video"
              /></div>}

          {chapter.contentType=="CODE"&&
              <div className={"flex flex-row overflow-x-hidden"}>
                  <div className={"w-5/12"}>
                      <NotionRenderer recordMap={notionProblemMap}/>
                  </div>
                  <div className={"w-7/12 text-white"}>
                        <Playground problem={chapter.problem} />
                  </div>
              </div>
          }


          {/* <Content chapter={chapter} matterResult={matterResult} /> */}
      </div>
    </div>
  );
};

export default ChapterIdPage;
