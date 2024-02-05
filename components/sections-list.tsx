import { Category, Section } from "@prisma/client";

import { SectionCard } from "@/components/section-card";

type SectionWithProgressWithCategory = Section & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
    courseId: string;
};

interface SectionsListProps {
  items: SectionWithProgressWithCategory[];
}

export const SectionsList = ({
  items
}: SectionsListProps) => {
  return (
    <div>
     
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <SectionCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            progress={null}
            courseId={item.courseId}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Sections Right Now!!! Please come back soon
        </div>
      )}
    </div>
  )
}