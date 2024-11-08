"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SectionSidebarItemProps {
  label: string;
  id: string;
  isCompleted: boolean;
  courseId: string;
  isLocked: boolean;
  sectionId: string;
};

export const SectionSidebarItem = ({
  label,
  sectionId,
  id,
  isCompleted,
  courseId,
  isLocked,
}: SectionSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle);
  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/sections/${sectionId}/chapters/${id}`);
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-neutral-500 text-sm font-[500] pl-6 transition-all hover:text-neutral-600 hover:bg-neutral-300/20",
        isActive && "text-neutral-100 bg-neutral-200/20 hover:bg-neutral-200/20 hover:text-neutral-100",
        isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-neutral-500",
            isActive && "text-neutral-100",
            isCompleted && "text-emerald-700"
          )}
        />
        {label}
      </div>
      <div className={cn(
        "ml-auto opacity-0 border-2 border-neutral-700 h-full transition-all",
        isActive && "opacity-100",
        isCompleted && "border-emerald-700"
      )} />
    </button>
  )
}