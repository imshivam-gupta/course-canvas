import { Category, Chapter, Course, Section } from "@prisma/client";

import { SectionCard } from "@/components/section-card";
import {FocusCards} from "@/app/(dashboard)/(routes)/courses/_components/focus-card";

// type SectionWithProgressWithCategory = Section & {
//   category: Category | null;
//   chapters: Chapter[];
//   course: Course
//   courseId: string;
// };

interface SectionsListProps {
  items: any[];
  courseId: string;
}

export const SectionsList = ({
  items,
                                 courseId
}: SectionsListProps) => {
    const cards = items.map((item)=>(
        {
            title: item.title,
            src: item.bannerUrl,
            key: item._id,
            id: item._id,
            courseId,
        }
    ))
  return (
    <div>
     
      {/*<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">*/}
          <FocusCards cards={cards} />;

        {/*{items.map((item) => (*/}
        {/*  <SectionCard*/}
        {/*    key={item.id}*/}
        {/*    id={item.id}*/}
        {/*    title={item.title}*/}
        {/*    imageUrl={item.bannerUrl!}*/}
        {/*    chaptersLength={item.chapters.length}*/}
        {/*    progress={null}*/}
        {/*    courseId={item.courseId}*/}
        {/*  />*/}
        {/*))}*/}
      {/*</div>*/}
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Sections Right Now!!! Please come back soon
        </div>
      )}
    </div>
  )
}