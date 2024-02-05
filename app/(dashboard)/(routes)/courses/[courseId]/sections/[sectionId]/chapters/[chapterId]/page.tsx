import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { File } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";
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

interface CommonProps {
  children: React.ReactNode;
}

const MyElement: React.FC<CommonProps> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

const MyTable: React.FC<CommonProps> = ({ children, ...props }) => (
  <table {...props}>{children}</table>
);

const MyTableHead: React.FC<CommonProps> = ({ children, ...props }) => (
  <thead {...props}>{children}</thead>
);

const MyTableBody: React.FC<CommonProps> = ({ children, ...props }) => (
  <tbody {...props}>{children}</tbody>
);

const MyTableRow: React.FC<CommonProps> = ({ children, ...props }) => (
  <tr {...props}>{children}</tr>
);

const MyTableData: React.FC<CommonProps> = ({ children, ...props }) => {
  let txtclss;
  if(children?.toString()==="Easy"){
    txtclss = "text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-700 p-2 rounded-xl";
  } else if(children?.toString()==="Medium"){
    txtclss = "text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-700 p-2 rounded-xl";
  } else if(children?.toString()==="Hard"){
    txtclss = "text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-700 p-2 rounded-xl";
  }
  return(
  <td {...props}><span className={`${txtclss}`}>
    {children}</span></td>)
};

const MyTableHeader: React.FC<CommonProps> = ({ children, ...props }) => (
  <th {...props}>{children}</th>
);

const MyHeading1: React.FC<CommonProps> = ({ children, ...props }) => (
  <h1 {...props}>{children}</h1>
);

const MyHeading2: React.FC<CommonProps> = ({ children, ...props }) => (
  <h2 {...props}>{children}</h2>
);

const MyHeading3: React.FC<CommonProps> = ({ children, ...props }) => (
  <h3 {...props}>{children}</h3>
);

const MyHeading4: React.FC<CommonProps> = ({ children, ...props }) => (
  <h4 {...props}>{children}</h4>
);

const MyHeading5: React.FC<CommonProps> = ({ children, ...props }) => (
  <h5 {...props}>{children}</h5>
);

const MyHeading6: React.FC<CommonProps> = ({ children, ...props }) => (
  <h6 {...props}>{children}</h6>
);

const MyParagraph: React.FC<CommonProps> = ({ children, ...props }) => (
  <p {...props}>{children}</p>
);

const MyEmphasis: React.FC<CommonProps> = ({ children, ...props }) => (
  <em {...props}>{children}</em>
);

const MyStrong: React.FC<CommonProps> = ({ children, ...props }) => (
  <strong {...props}>{children}</strong>
);

const MyDelete: React.FC<CommonProps> = ({ children, ...props }) => (
  <del {...props}>{children}</del>
);

const MyLink: React.FC<CommonProps> = ({ children, ...props }) => (
  <a {...props} target="_blank">
      {children}
  </a>
);

const MyList: React.FC<CommonProps> = ({ children, ...props }) => (
  <ul {...props}>{children}</ul>
);

const MyOrderedList: React.FC<CommonProps> = ({ children, ...props }) => (
  <ol {...props}>{children}</ol>
);

const MyListItem: React.FC<CommonProps> = ({ children, ...props }) => (
  <li {...props}>{children}</li>
);

const MyBlockQuote: React.FC<CommonProps> = ({ children, ...props }) => (
  <blockquote {...props}>{children}</blockquote>
);

const MyInlineCode: React.FC<CommonProps> = ({ children, ...props }) => (
  <code {...props}>{children}</code>
);

const MyCode: React.FC<CommonProps> = ({ children, ...props }) => (
  <pre {...props}>{children}</pre>
);

const MyHorizontalRule: React.FC<CommonProps> = ({ children, ...props }) => (
  <hr {...props}>{children}</hr>
);


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
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
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
          </div>
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
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
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
          </div>
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
        
        <div className="flex flex-col mx-auto mb-6">
        
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
          
            <div className="page-body-course flex items-center justify-between px-20 pb-20 pt-6">
 
            <Markdown
              options={{
                overrides: {
                  h1: { component: MyHeading1,props: {className: 'text-4xl font-bold text-black mt-5 mb-2',},},
                  h2: { component: MyHeading2,props: {className: 'text-3xl font-bold text-black mt-5 mb-2',},},
                  h3: { component: MyHeading3,props: {className: 'text-2xl font-bold text-black mt-5 mb-2',},},
                  h4: { component: MyHeading4,props: {className: 'text-xl font-bold text-black mt-5 mb-2',},},
                  h5: { component: MyHeading5,props: {className: 'text-lg font-bold text-black mt-5 mb-2',},},
                  h6: { component: MyHeading6,props: {className: 'text-base font-bold text-black mt-5 mb-2',},},
                  ul: { component: MyList,props: {className: 'marker:text-black list-disc list-inside mt-1 mb-4',},},
                  ol: { component:MyOrderedList,props: {className: 'list-decimal list-inside marker:text-black  mt-1 mb-4 ',},},
                  li: { component: MyListItem,props: {className: 'font-sans',},},
                  p: { component: MyParagraph,props: {className: 'font-sans mb-1 prevent-select',},},
                  em: { component: MyEmphasis,props: {className: '',},},
                  strong: { component: MyStrong,props: {className: ' font-semibold prevent-select',},},
                  del: { component: MyDelete,props: {className: ' ',},},
                  a: { component: MyLink,props: {className: 'text-[#9aa4e7] hover:text-[#a591ee] font-semibold'},},
                  blockquote: { component: MyBlockQuote,props: {className: 'border-l-4 border-gray-400 dark:border-gray-600 italic my-8 pl-8',},},
                  code: { component:MyCode,props: {className: 'cd ',},},
                  span: { component: MyCode,props: {className: 'sp ',},},
                  table: { component: MyTable,props: {className: 'table-fixed w-full mt-6 mb-10 rounded-xl',},},
                  thead: { component: MyTableHead,props: {className: 'bg-gray-200 dark:bg-gray-700 rounded-tl-xl',},},
                  tbody: { component: MyTableBody,props: {className: 'divide-y divide-gray-200 dark:divide-gray-700',},},
                  tr: { component: MyTableRow,props: {className: ' ',},},
                  td: { component: MyTableData,props: {className: 'px-6 py-4 align-top whitespace-normal text-sm font-medium text-gray-800 dark:text-gray-200',},},
                  th: { component: MyTableHeader,props: {className: 'px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase',},},
                  hr: { component:MyHorizontalRule,props: {className: 'my-8',},},
                  pre: { component: PreBlock,props: {className: 'bg-[#25252B] rounded-xl',},},
                  img: { component: MyImage,props: {className: 'w-[75%]  mx-auto mt-2 rounded-xl ',},},
                },
              }}
            >
              {matterResult.content}
            </Markdown>
            </div>
          </div>
      }
    
    </div>
    </div>
   );
}
 

export default ChapterIdPage;
