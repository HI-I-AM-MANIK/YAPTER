import { currentProfile } from "@/lib/current-profile";
import { RedirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ServerPageProps {
  params: Promise<{
    serverId: string;
  }>;
}

const ServerPage = async ({ params }: ServerPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return <RedirectToSignIn/>;
  }

  const { serverId } = await params;

  const server = await db.server.findFirst({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const initialChannel = server.channels[0];

  if (!initialChannel) {
    return redirect("/");
  }

  return redirect(`/servers/${serverId}/channels/${initialChannel.id}`);
};

export default ServerPage;