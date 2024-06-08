"use client";

import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { Button } from "@/components/ui/button";
import { Space_Grotesk } from "next/font/google";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import { overrides } from "./custom-components";
import { cn } from "@/lib/utils";
import PreBlock from "./CodeBlock";
import MyImage from "./CustomImage";

import {
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaHandPaper,
  FaShare,
} from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { CiVideoOn } from "react-icons/ci";
import YouTubePlayer from "./youtube-video-player";
import { useEffect, useState } from "react";
import DoubtSection from "./DoubtSection";
import { Chapter } from "@prisma/client";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

interface GetContentProps {
  chapter: Chapter;
  matterResult: any;
}


const Content = ({ chapter, matterResult }:GetContentProps) => {
  const [typeOfContent, setTypeOfContent] = useState("video");
  const [doubt, setDoubt] = useState(false);

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const finalOverrides = {
    ...overrides,
    pre: ({ node, ...props }: any) => (
      <PreBlock {...props} className="bg-[#25252B] rounded-xl" />
    ),
    img: ({ node, ...props }: any) => (
      <MyImage {...props} className="mt-2 rounded-xl" />
    ),
    code({ children, className, node, ...rest }: any) {
      return (
        <PreBlock className={cn("bg-[#25252B] rounded-xl", className)}>
          {children}
        </PreBlock>
      );
    },
  };
  return domLoaded ? (
    <div>
      {doubt && (
        <div className="fixed right-10 bottom-0 z-50">
          <DoubtSection setDoubt={setDoubt} />
        </div>
      )}

      <div>
        {typeOfContent === "video" ? (
          <div className="flex flex-col items-center bg-black  mx-auto mx-2 rounded-2xl ">
            {chapter.youtubeVideo && (
              <YouTubePlayer videoId={chapter.youtubeVideo} />
            )}
          </div>
        ) : typeOfContent === "notes" ? (
          <div className="page-body-course   px-20 pb-2 pt-6">
            <ReactMarkdown
              components={finalOverrides}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeRaw]}
              className={grotesk.className}
            >
              {matterResult.content}
            </ReactMarkdown>
          </div>
        ) : null}

        <div className="sticky bottom-0 flex flex-row justify-center bg-gray-100 py-4 px-6 gap-x-6">
          <div className="flex flex-row gap-x-6">
            <Button
              size="sm"
              className="w-full md:w-auto"
              onClick={() => setDoubt((prev) => !prev)}
            >
              <FaHandPaper />
              &nbsp;&nbsp;Ask a doubt
            </Button>
            {typeOfContent === "notes" && (
              <Button size="sm" className="w-full md:w-auto">
                <FaDownload />
                &nbsp;&nbsp;Download
              </Button>
            )}
            <Button size="sm" className="w-full md:w-auto">
              <FaShare />
              &nbsp;&nbsp;Share
            </Button>
            {typeOfContent === "video" ? (
              <Button
                size="sm"
                className="w-full md:w-auto"
                onClick={() => setTypeOfContent("notes")}
              >
                <SiGoogledocs />
                &nbsp;&nbsp;Notes
              </Button>
            ) : (
              <Button
                size="sm"
                className="w-full md:w-auto"
                onClick={() => setTypeOfContent("video")}
              >
                <CiVideoOn />
                &nbsp;&nbsp;Video
              </Button>
            )}
          </div>

          <div className="flex flex-row gap-x-6 flex-grow">
            <div className="flex flex-row gap-x-10 mx-auto justify-center items-center">
              <FaChevronLeft />
              <FaChevronRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Content;
