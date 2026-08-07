import { Hash } from "lucide-react";

import { MobileToggle } from "../mobile-toggle";
import NavigationSidebarMobile from "../navigation/navigation-sidebar-mobile";
import { UserAvatar } from "../user-avatar";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}
 

const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-[#313338] text-md font-semibold px-3 flex items-center h-12 border-b-2 border-neutral-200 dark:border-neutral-800">
      <MobileToggle>
        <NavigationSidebarMobile serverId={serverId} />
      </MobileToggle>

      {type === "channel" && (
        <Hash className="h-5 w-5 mr-2 text-zinc-500 dark:text-zinc-400" />
      )}

      {type === "conversation"&& (
        <UserAvatar
          src={imageUrl}
          className="h-8 w-8 md:h-8 md:w-8 mr-2"
        />
      )}

      <p className="font-semibold text-md text-black dark:text-white">
        {name}
      </p>
    </div>
  );
};

export default ChatHeader;