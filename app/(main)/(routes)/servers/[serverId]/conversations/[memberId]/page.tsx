import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { RedirectToSignIn } from "@clerk/nextjs";
import { getOrCreateConversation } from "@/lib/conversation";
import { db } from "@/lib/db";
import ChatHeader from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { channel } from "diagnostics_channel";

interface MemberIdProps {
  params: Promise<{
    serverId: string;
    memberId: string;
  }>;
}

const MemberId = async ({ params }: MemberIdProps) => {
  const { serverId, memberId } = await params;

  const profile = await currentProfile();

  if (!profile) {
    return <RedirectToSignIn />;
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    memberId
  );

  if (!conversation) {
    return redirect(`/servers/${serverId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.id === currentMember.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl || undefined}
        name={otherMember.profile.name || "Unknown"}
        serverId={serverId}
        type="conversation"
      />
    </div>
  );
};

export default MemberId;