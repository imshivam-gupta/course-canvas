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
import { getServerSession } from "next-auth";
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
    pre: ({node, ...props}) => <PreBlock {...props} className='bg-[#25252B] rounded-xl'/>,
    img: ({node, ...props}) => <MyImage {...props} className='mt-2 rounded-xl'/>,
    code({children, className, node, ...rest}) {
      return <PreBlock className={cn('bg-[#25252B] rounded-xl',className)}>{children}</PreBlock>
    }
  }


  const new_cont = `## Mc Culloh Pitts Neuron

  <img src="https://utfs.io/f/888b5a93-dfef-42ca-b33e-75b12f545132-t8ftem.png" alt="McCulloh Pitts Neuron" position="left"/>
  
  Mc Culloh and Pitts proposed a simplified model of the neuron in 1943. $g$ aggregates the inputs and the function $f$ takes a decision based on the aggregated input. The inputs can be inhibitory or excitatory. The model is a binary model, i.e. the output is binary.
  
  y is 0 if any of the inputs is inhibitory else:
  
  $$g(x_1, x_2, x_3, ..., x_n) = \\sum_{i=1}^{n} w_i x_i$$

  $y = f(g(x_1, x_2, x_3, ..., x_n))$ = 1 if $g(x_1, x_2, x_3, ..., x_n)$ $\\geq$ $\\theta$ else 0
  
  $\\theta$ is the threshold. This is called Thresholding Logic.
  
  <img src="https://utfs.io/f/06ba104a-c93f-43ae-8cec-f30c78da6ae2-t7y02c.png" alt="Various Thresholding Logics" />
  
  
  ## Or Logic
  
  <img src="https://utfs.io/f/c7631f34-2b50-4ee2-a061-cd45588f823f-t7xeho.png" alt="Or Logic" />
  
  A single MP neuron splits the input space(4 quadrants) into 2 halves. All inputs which produce an output 0 will be on one side ($\\Sigma_{i=1}^n x_i < \\theta$)`
  
  
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
        chapter.videoUrl ?   <div className="flex flex-col max-w-4xl mx-auto pb-20">
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
        chapter.youtubeVideo  &&
        <h1 className="flex flex-row justify-center text-2xl  font-medium group-hover:text-sky-700 transition line-clamp-2">
          {"Editorial"}
        </h1>
}
          
            <div className="page-body-course   px-20 pb-20 pt-6">
 
            <ReactMarkdown

              components={finalOverrides}
              remarkPlugins={[remarkGfm,remarkMath]}
              rehypePlugins={[rehypeHighlight,rehypeKatex,rehypeRaw]}
              
              // options={{
              //   overrides: {
              //     ...overrides,
              //     pre: { component: PreBlock,props: {className: 'bg-[#25252B] rounded-xl',},},
              //     img: { component: MyImage,props: {className: 'w-[75%]  mx-auto mt-2 rounded-xl ',},},
              //   },
              // }}
            >
              {/* {matterResult.content} */}
              {new_cont}
            </ReactMarkdown>
            </div>
          </div>
      }
    
    </div>
    </div>
   );
}
 

export default ChapterIdPage;
