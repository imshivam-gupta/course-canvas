// import { createUploadthing, type FileRouter } from "uploadthing/next";
import { isTeacher } from "@/lib/teacher";
import { auth } from '@/auth'

// const f = createUploadthing();

// const handleAuth = async () => {
//   const session = await auth();
//   const isAuthorized = isTeacher(session?.user);
//   if (!session?.user || !isAuthorized) throw new Error("Unauthorized");
//   const userId = session?.user?.id;
//   return { userId};
// }

// export const ourFileRouter = {
//   courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => { }),
//   courseAttachment: f(["text", "image", "video", "audio", "pdf"])
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => { }),
//   chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => { }),
//   sectionImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
//     .middleware(() => handleAuth())
//     .onUploadComplete(() => { }),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;


import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 


const handleAuth = async () => {
  const session = await auth();
  const isAuthorized = isTeacher(session?.user);
  if (!session?.user || !isAuthorized) throw new Error("Unauthorized");
  const userId = session?.user?.id;
  console.log("userId", userId);
  return { userId};
}

// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
 

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  sectionImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())

    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
 
      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;