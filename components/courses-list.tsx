
import { CourseCard } from "@/components/course-card";

type CourseWithProgressWithCategory =  any;

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({
  items
}: CoursesListProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-y-6 gap-x-8">
        {items.map((item) => (
          <CourseCard
            key={item._id}
            id={item._id}
            title={item.title}
            imageUrl={item.bannerUrl!}
            sectionsLength={item.sections.length}
            price={item.price!}
            progress={item.progress}
            category={item?.category?.name!}
            description={item.description!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  )
}