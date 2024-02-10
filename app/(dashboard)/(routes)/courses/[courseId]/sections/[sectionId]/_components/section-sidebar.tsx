import { Chapter, Course, Section, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SectionProgress } from "@/components/section-progress";

import { SectionSidebarItem } from "./section-sidebar-item";
import { auth } from '@/auth'
import Link from "next/link";

interface SectionSidebarProps {
  section: Section & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[]
  };
  progressCount: number;
  course: Course;
};

export const SectionSidebar = async ({
  section,
  course,
  progressCount,
}: SectionSidebarProps) => {
    
    const session = await auth();
    const userId = session?.user.id;
    if(!userId) {
      return redirect("/auth/signin");
    }


  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      }
    }
  });

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="px-8 py-6 flex flex-col">
        <Link href={`/courses/${course.id}`}>
        <h1 className="font-semibold -mt-2">
          {course.title}
        </h1>
        </Link>
        {purchase && (
          <div className="mt-10">
            <SectionProgress
              variant="success"
              value={progressCount}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {section.chapters.map((chapter) => (
          <SectionSidebarItem
            sectionId={section.id}
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  )
}