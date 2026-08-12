import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { getSocketServer } from "@/lib/socket-server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();

    const { content, fileUrl } = await req.json();

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const channelId = searchParams.get("channelId");

    if (!profile) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!serverId) {
      return Response.json(
        { error: "ServerId is missing" },
        { status: 400 }
      );
    }

    if (!channelId) {
      return Response.json(
        { error: "ChannelId is missing" },
        { status: 400 }
      );
    }

    if (!content) {
      return Response.json(
        { error: "Content is missing" },
        { status: 400 }
      );
    }

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
        members: true,
      },
    });

    if (!server) {
      return Response.json(
        { error: "You are not a member of this server" },
        { status: 403 }
      );
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId,
        serverId: server.id,
      },
    });

    if (!channel) {
      return Response.json(
        { error: "Channel not found" },
        { status: 404 }
      );
    }

    const member = server.members.find(
      (member) => member.profileId === profile.id
    );

    if (!member) {
      return Response.json(
        { error: "You are not a member of this channel" },
        { status: 403 }
      );
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${channelId}:message`;

    const io = getSocketServer();

    io?.emit(channelKey, message);

    return Response.json(message);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);

    return Response.json(
      { message: "Internal Error" },
      { status: 500 }
    );
  }
}