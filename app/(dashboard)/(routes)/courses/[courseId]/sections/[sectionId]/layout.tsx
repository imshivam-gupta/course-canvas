import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getProgress } from "@/actions/get-progress";

import { SectionSidebar } from "./_components/section-sidebar";
import { SectionNavbar } from "./_components/section-navbar";
import { getServerSession } from "next-auth";

const SectionLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { courseId: string,sectionId:string };
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
        return redirect("/")
    }

    const course = await db.course.findUnique({
        where:{
            id: params.courseId
        }
    });

    const section = await db.section.findFirst({
        where:{
            courseId: params.courseId
        },
        include:{
            chapters:{
                where:{
                    isPublished:true
                },
                include:{
                    userProgress:{
                        where:{
                            userId
                        }
                    }
                },
                orderBy:{
                    position:"asc"
                }
            }
    }});

    if (!section) {
        return redirect("/");
    }

    const progressCount = await getProgress(userId, section.id);

    return (
        <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
                <SectionNavbar
                    course={course}
                    section={section}
                    progressCount={progressCount}
                />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
                <SectionSidebar
                    course={course}
                    section={section}
                    progressCount={progressCount}
                />
            </div>
            <main className="md:pl-80 h-full">
                {children}
            </main>
        </div>
    )
}

export default SectionLayout