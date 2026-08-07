import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { RedirectToSignIn } from "@clerk/nextjs";
import { getOrCreateConversation } from "@/lib/conversation";
import { db } from "@/lib/db";
import ChatHeader from "@/components/chat/chat-header";


interface MemberIdProps {
  params: {
    serverId: string;
    memberId: string;
  };
}

const MemberId = async ({ params }: MemberIdProps) => {
  
  
  const profile = await currentProfile();

  if (!profile) {
    return <RedirectToSignIn />;
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
    include:{
        profile: true
    }
  });
  if(!currentMember){
    return redirect("/");
  }

  const conversation =  await getOrCreateConversation(currentMember.id, params.memberId);
  if(!conversation){
    return redirect(`/servers/${params.serverId}`);
  }

  const {memberOne ,memberTwo} = conversation;
  
  const otherMember = memberOne.id === currentMember.id ? memberTwo : memberOne;



  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full w-full ">
        <ChatHeader
          imageUrl={otherMember.profile.imageUrl || undefined}
          name={otherMember.profile.name || "Unknown"}
          serverId={params.serverId}
          type="conversation"
          
        >

        </ChatHeader>
    </div>
  );
};

export default MemberId;