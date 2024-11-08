import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

import { SectionSidebar } from "./_components/section-sidebar";
import { SectionNavbar } from "./_components/section-navbar";
import { auth } from '@/auth'
import {fetchFromAPI} from "@/lib/utils";

const SectionLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { courseId: string,sectionId:string };
}) => {

    const course =  await fetchFromAPI(`/course/${params.courseId}`,"GET");
    const section =  await fetchFromAPI(`/section/${params.sectionId}`,"GET");


    // const section = await db.section.findFirst({
    //     where:{
    //         id: params.sectionId,
    //         courseId: params.courseId
    //     },
    //     include:{
    //         chapters:{
    //             where:{
    //                 isPublished:true
    //             },
    //             include:{
    //                 userProgress:{
    //                     where:{
    //                         userId
    //                     }
    //                 }
    //             },
    //             orderBy:{
    //                 position:"asc"
    //             }
    //         }
    // }});



    // const progressCount = await getProgress(userId, section.id);

    return (
        <div className="h-full">
            {/*<div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">*/}
            {/*    <SectionNavbar*/}
            {/*        course={course}*/}
            {/*        section={section}*/}
            {/*        // progressCount={progressCount}*/}
            {/*    />*/}
            {/*</div>*/}
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <SectionSidebar
                    course={course}
                    section={section}
                    courseId={params.courseId}
                    sectionId={params.sectionId}
                    // progressCount={progressCount}
                />
            </div>
            <main className="md:pl-80 h-full">
                {children}
            </main>
        </div>
    )
}

export default SectionLayout