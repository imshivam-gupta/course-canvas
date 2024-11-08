import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import {WobbleCard} from "@/app/(dashboard)/_components/wobble-card";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  sectionsLength: number;
  price: number;
  progress: number | null;
  category: string;
  description: string;
};

export const CourseCard = ({
  id,
  title,
  imageUrl,
  sectionsLength,
  price,
  progress,
  category,
    description
}: CourseCardProps) => {
  return (
    // <Link href={`/courses/${id}`} className={"-mb-2"}>
    //   <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full scale-x-95 scale-y-90 duration-500" >
    //     <div className="relative w-full aspect-video rounded-md overflow-hidden">
    //       <Image
    //         fill
    //         className="object-cover"
    //         alt={title}
    //         src={imageUrl}
    //       />
    //     </div>
    //     <div className="flex flex-col pt-3 pb-5">
    //       <div className="text-lg font-medium group-hover:text-[#01FF62] transition line-clamp-2 text-neutral-400  duration-500">
    //         {title}
    //       </div>
    //       <p className="text-xs text-muted-foreground">
    //         {category}
    //       </p>
    //     </div>
    //   </div>
    // </Link>
      <Link href={`/courses/${id}`} >
      <WobbleCard
          containerClassName="h-full bg-gray-800 min-h-[4500px] lg:min-h-[300px]"
          className="py-10 px-2"
      >
        <div className="">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white max-w-[38rem]">
            {title}
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200 max-w-[24rem]">
            {description}
          </p>
        </div>
        <Image
            src={imageUrl}
            width={500}
            height={500}
            alt="linear demo image"
            className="absolute -right-4 lg:-right-[10%] filter -bottom-6 object-contain rounded-2xl opacity-80"
        />
      </WobbleCard>
      </Link>
  )
}