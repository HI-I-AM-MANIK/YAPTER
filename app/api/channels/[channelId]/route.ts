import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ channelId: string }> }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { channelId } = await context.params;

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
    });

    if (!server) {
      return new NextResponse("Server not found or insufficient permissions", {
        status: 403,
      });
    }

    const channel = await db.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    if (!channel) {
      return new NextResponse("Channel not found", { status: 404 });
    }

    if (channel.name === "general") {
      return new NextResponse("Cannot delete the general channel", {
        status: 400,
      });
    }

    await db.channel.delete({
      where: {
        id: channelId,
      },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("[CHANNEL_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}






export async function PATCH(
  req: Request,
  context: { params: Promise<{ channelId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { channelId } = await context.params;

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Channel name missing", { status: 400 });
    }

    // Check permission
    const server = await db.server.findFirst({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
    });

    if (!server) {
      return new NextResponse(
        "Server not found or insufficient permissions",
        { status: 403 }
      );
    }

    const channel = await db.channel.findUnique({
      where: {
        id: channelId,
      },
    });

    if (!channel) {
      return new NextResponse("Channel not found", { status: 404 });
    }

    if (channel.name === "general") {
      return new NextResponse(
        "Cannot edit the general channel",
        { status: 400 }
      );
    }

    const updatedChannel = await db.channel.update({
      where: {
        id: channelId,
      },
      data: {
        name,
        type,
      },
    });

    return NextResponse.json(updatedChannel);
  } catch (error) {
    console.error("[CHANNEL_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}