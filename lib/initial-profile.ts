import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "./db";

export const getInitialProfile = async () => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const existing = await db.profile.findUnique({
    where: { userId },
  });
  if (existing) return existing;

  // Fetch full user info
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  const name = [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || user.username || "";

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      username: `${(user.firstName || "").toLowerCase()}${(user.lastName || "").toLowerCase()}`,
      name,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
    },
  });

  return newProfile;
};
