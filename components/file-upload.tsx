"use client";

import toast from "react-hot-toast";

import { UploadDropzone } from "@/lib/uploadThing";
import { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({
  onChange,
  endpoint
}: any) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  )
}