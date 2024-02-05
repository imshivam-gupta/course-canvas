import { Menu } from "lucide-react";
import { Chapter, Course, Section, UserProgress } from "@prisma/client";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

import { SectionSidebar } from "./section-sidebar";

interface SectionMobileSidebarProps {
  section: Section & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  course: Course;
  progressCount: number;
};

export const SectionMobileSidebar = ({ 
  section,
  course,
  progressCount,
}: SectionMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <SectionSidebar
          course={course}
          section={section}
          progressCount={progressCount}
        />
      </SheetContent>
    </Sheet>
  )
}