import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new UploadThingError("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  serverImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(handleAuth)
    .onUploadComplete(() => {
      /* handle completion (optional) */
    }),

  messageFile: f(["image", "pdf"])
    .middleware(handleAuth)
    .onUploadComplete(() => {
      /* handle completion (optional) */
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;