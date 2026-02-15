import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChannelType } from "@prisma/client";

interface ServerSidebarProps {
    serverId: string;
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
    const profile = await currentProfile();
    if(!profile){
        return redirect("/");
    }

    // Fetch a single server from the database
const server = await db.server.findUnique({
  
  // 🔎 Find the server using its unique ID
  where: {
    id: serverId, // This must be a unique field (usually the ID from the URL)
  },

  // 📦 Include related data along with the server
  include: {

    // 📁 Include all channels that belong to this server
    channels: {
      orderBy: {
        createdAt: "asc" // Sort channels from oldest → newest
      },
    },

    // 👥 Include all members of this server
    members: {

      // 🔗 For each member, also fetch their profile information
      include: {
        profile: true, // This joins the Profile table so you can access name, image, etc.
      },

      // 📊 Sort members by role (e.g., ADMIN first if enum order is ADMIN → MODERATOR → GUEST)
      orderBy: {
        role: "asc",
      },
    },
  },
});


    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);

    const members = server?.members.filter((member) => member.profileId !== profile.id);

    if (!server) {
        return redirect("/");
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;
    return (
        <div className="h-full w-full bg-gray-800 ">
            Server sidebar Component
        </div>
    );
}