import { Chapter, Course, Section, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { SectionProgress } from "@/components/section-progress";

import { SectionSidebarItem } from "./section-sidebar-item";
import { auth } from '@/auth'
import Link from "next/link";

interface SectionSidebarProps {
  section: any;
  course: Course;
  sectionId: string;
  courseId: string;
};

export const SectionSidebar = async ({
  section,
  course,
  sectionId,
    courseId,
}: SectionSidebarProps) => {
    




  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="px-8 h-[80px] flex flex-col justify-center">

      </div>
      <div className="flex flex-col w-full">
        {section.chapters.map((chapter) => (
          <SectionSidebarItem
            sectionId={sectionId}
            key={chapter._id}
            id={chapter._id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={courseId}
            isLocked={false}
          />
        ))}
      </div>
    </div>
  )
}