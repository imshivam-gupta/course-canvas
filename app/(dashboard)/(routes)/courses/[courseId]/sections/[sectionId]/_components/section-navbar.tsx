import { Chapter, Course, Section, UserProgress } from "@prisma/client"

import { NavbarRoutes } from "@/components/navbar-routes";

import { SectionMobileSidebar } from "./section-mobile-sidebar";

interface SectionNavbarProps {
  section: Section & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
  course: Course;
};

export const SectionNavbar = ({
  section,
  course,
  progressCount,
}: SectionNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <SectionMobileSidebar
      course={course}
        section={section}
        progressCount={progressCount}
      />
      <NavbarRoutes />      
    </div>
  )
}
