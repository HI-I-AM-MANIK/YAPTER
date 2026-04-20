import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";


export async function DELETE(
  req: Request,
  context: { params: Promise<{ serverId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { serverId } = await context.params; 

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const deletedServer = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id,
      }
    });

    return NextResponse.json(deletedServer);

  } catch (error) {
    console.log("[SERVER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ serverId: string }> }
) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();
    const { serverId } = await context.params; // ✅ unwrap params

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    // 🔒 Check ownership
    const existingServer = await db.server.findFirst({
      where: {
        id: serverId,
        profileId: profile.id,
      },
    });

    if (!existingServer) {
      return new NextResponse("Server not found", { status: 404 });
    }

    // ✅ Safe single update
    const updatedServer = await db.server.update({
      where: { id: serverId },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(updatedServer);

  } catch (error) {
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}