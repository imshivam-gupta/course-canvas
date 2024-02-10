"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useSession } from "next-auth/react";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  sectionId: string;
  isPublished: boolean;
};

export const Actions = ({
  disabled,
  courseId,
  sectionId,
  isPublished
}: ActionsProps) => {
  const router = useRouter();
  const { data: session } = useSession();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/sections/${sectionId}/unpublish`,{},{
          headers: {
            'authorization': session?.user.id
          },
        });
        toast.success("Section unpublished");
      } else {
        await axios.patch(`/api/courses/${courseId}/sections/${sectionId}/publish`,{},{
          headers: {
            'authorization': session?.user.id
          },
        });
        toast.success("Section published");
        confetti.onOpen();
      }

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/sections/${sectionId}`,{
        headers: {
          'authorization': session?.user.id
        },
      });

      toast.success("Course deleted");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}