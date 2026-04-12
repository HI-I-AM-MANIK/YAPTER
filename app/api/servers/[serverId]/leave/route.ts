import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ serverId: string }> }
) {
  try {
    const profile = await currentProfile();

    const { serverId } = await context.params; // ✅ FIX HERE

    console.log("PROFILE:", profile);
    console.log("SERVER ID:", serverId);

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const server = await db.server.findUnique({
      where: { id: serverId },
    });

    if (!server) {
      return new NextResponse("Server not found", { status: 404 });
    }

    // if (server.profileId === profile.id) {
    //   return new NextResponse("Owner cannot leave the server", { status: 400 });
    // }

    await db.member.deleteMany({
      where: {
        serverId,
        profileId: profile.id,
      },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.log("[SERVER_LEAVE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}