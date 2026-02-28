import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ memberId: string }> }
) {
  try {
    const { memberId } = await context.params;
    const { searchParams } = new URL(req.url);

    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const serverId = searchParams.get("serverId");
    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    if (!memberId) {
      return new NextResponse("Member ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            profileId: {
              not: profile.id, // can't kick yourself
            },
          },
        },
      },
      include: {
        members: {
          include: { profile: true },
          orderBy: { role: "asc" },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[MEMBER_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ memberId: string }> }
) {
  try {
    const { memberId } = await context.params;
    const { searchParams } = new URL(req.url);
    const body = await req.json();

    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const serverId = searchParams.get("serverId");
    if (!serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    if (!memberId) {
      return new NextResponse("Member ID Missing", { status: 400 });
    }

    if (!body.role) {
      return new NextResponse("Role Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile.id, // can't change yourself
              },
            },
            data: {
              role: body.role as MemberRole,
            },
          },
        },
      },
      include: {
        members: {
          include: { profile: true },
          orderBy: { role: "asc" },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[MEMBER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}