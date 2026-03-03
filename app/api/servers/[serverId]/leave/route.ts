import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ serverId: string }> }
) {
  try {
    const { serverId } = await context.params;

    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    // 1️⃣ Find the server first
    const server = await db.server.findUnique({
      where: { id: serverId },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    // 2️⃣ Prevent owner from leaving
    if (server.profileId === profile.id) {
      return new NextResponse("Owner cannot leave the server", { status: 400 });
    }

    // 3️⃣ Remove membership
    await db.member.deleteMany({
      where: {
        serverId: serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("[SERVER_ID_LEAVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}