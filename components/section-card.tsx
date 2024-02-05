import Image from "next/image";
import Link from "next/link";
import { SectionProgress } from "@/components/section-progress";
import { IconBadge } from ".";
import { BookOpen } from "lucide-react";

interface SectionCardProps {
  id: string;
  title: string;
  imageUrl: string;
  progress: number | null;
    chaptersLength: number;
    courseId: string;
};

export const SectionCard = ({
  id,
  title,
  imageUrl,
  progress,
    chaptersLength,
    courseId
}: SectionCardProps) => {
  return (
    <Link href={`/courses/${courseId}/sections/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full flex flex-row">
        
      <div className="ml-2">
        <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
        </div>
        <div className="flex flex-col pt-2">
          
          <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          {progress !== null ? (
            <SectionProgress
              variant={progress === 100 ? "success" : "default"}
              size="sm"
              value={progress}
            />
          ) : (
            <></>
          )}
        </div>
    </div>

        <div className="relative w-10 h-10 my-auto ml-auto mr-4 aspect-video rounded-full border-sm shadow-2xl overflow-hidden">
          <Image
            fill
            className="object-cover rounded-full"
            alt={title}
            src={imageUrl}
          />
        </div>
        
      </div>
    </Link>
  )
}