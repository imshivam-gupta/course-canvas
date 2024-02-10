import { redirect } from "next/navigation";
import { File } from "lucide-react";
import ReactMarkdown from "react-markdown";
// import Markdown from "markdown-to-jsx";
import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { MDXRemote } from 'next-mdx-remote/rsc'
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { CourseProgressButton } from "./_components/course-progress-button";
import { url } from "inspector";
import matter from "gray-matter";
import PreBlock from "./_components/CodeBlock";
import MyImage from "./_components/CustomImage";
import Head from "next/head";
import { auth } from '@/auth'
import YouTubePlayer from "./_components/youtube-video-player";
import rehypeRaw from 'rehype-raw'
import { overrides } from "./_components/custom-components";
import { cn } from "@/lib/utils";
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'

const ChapterIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string, sectionId: string }
}) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return redirect("/auth/signin");
  }


  if (!userId) {
    return redirect("/");
  }


  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
    sectionId: params.sectionId,
  });


  if (!chapter || !course) {
    return redirect("/")
  }

  const uri = new URL(chapter.docUrl!)
  const response = await fetch(uri);
  const content = await response.text();
  const matterResult = matter(content);


  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  const finalOverrides = {
    ...overrides,
    pre: ({ node, ...props }) => <PreBlock {...props} className='bg-[#25252B] rounded-xl' />,
    img: ({ node, ...props }) => <MyImage {...props} className='mt-2 rounded-xl' />,
    code({ children, className, node, ...rest }) {
      return <PreBlock className={cn('bg-[#25252B] rounded-xl', className)}>{children}</PreBlock>
    }
  }




  return (
    <div>

      <div>
        {userProgress?.isCompleted && (
          <Banner
            variant="success"
            label="You already completed this chapter."
          />
        )}
        {/* {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )} */}

        {
          chapter.videoUrl ? <div className="flex flex-col max-w-4xl mx-auto pb-20">
            <div className="p-4">
              {chapter.videoUrl && (
                <VideoPlayer
                  chapterId={params.chapterId}
                  title={chapter.title}
                  courseId={params.courseId}
                  nextChapterId={nextChapter?.id}
                  playbackId={muxData?.playbackId!}
                  isLocked={isLocked}
                  completeOnEnd={completeOnEnd}
                />)}

            </div>
            <div>
              {/* <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div> */}
              <Separator />
              <div>
                <Preview value={chapter.description!} />
              </div>

              {!!attachments.length && (
                <>
                  <Separator />
                  <div className="p-4">
                    {attachments.map((attachment) => (
                      <a
                        href={attachment.url}
                        target="_blank"
                        key={attachment.id}
                        className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                      >
                        <File />
                        <p className="line-clamp-1">
                          {attachment.name}
                        </p>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div> :

            <div>
              <div>
                {/* <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?.id}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div> */}
                <Separator />
                <div>
                </div>
                {!!attachments.length && (
                  <>
                    <Separator />
                    <div className="p-4">
                      {attachments.map((attachment) => (
                        <a
                          href={attachment.url}
                          target="_blank"
                          key={attachment.id}
                          className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                        >
                          <File />
                          <p className="line-clamp-1">
                            {attachment.name}
                          </p>
                        </a>
                      ))}
                    </div>
                  </>
                )}


              </div>

              {
                chapter.youtubeVideo ?

                  <div className="flex flex-col mr-auto mb-6">

                    {chapter.youtubeVideo && (<YouTubePlayer videoId={chapter.youtubeVideo} />)}
                  </div> :

                  <div></div>
              }

              {
                chapter.youtubeVideo &&
                <h1 className="flex flex-row justify-center text-2xl  font-medium group-hover:text-sky-700 transition line-clamp-2">
                  {"Editorial"}
                </h1>
              }

              <div className="page-body-course   px-20 pb-20 pt-6">

                <ReactMarkdown

                  components={finalOverrides}
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeRaw]}

                // options={{
                //   overrides: {
                //     ...overrides,
                //     pre: { component: PreBlock,props: {className: 'bg-[#25252B] rounded-xl',},},
                //     img: { component: MyImage,props: {className: 'w-[75%]  mx-auto mt-2 rounded-xl ',},},
                //   },
                // }}
                >
                  {matterResult.content}
                </ReactMarkdown>
              </div>
            </div>
        }

      </div>
    </div>
  );
}


export default ChapterIdPage;
