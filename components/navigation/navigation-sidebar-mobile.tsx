import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import NavigationAction from "./natvigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import NavigationBottom from "./navigation-bottom";
import { ServerSidebar } from "../server/server-sidebar";

interface NavigationSidebarMobileProps {
  serverId: string;
}

const NavigationSidebarMobile = async ({
  serverId,
}: NavigationSidebarMobileProps) => {
  const profile = await currentProfile();

  if (!profile) {
    redirect("/login");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="flex h-full w-full overflow-hidden">
      <div
        className="
          w-[72px]
          flex
          flex-col
          bg-white
          dark:bg-[#0f172a]
          border-r
          border-zinc-200
          dark:border-zinc-800
        "
      >
        <div className="flex flex-col items-center py-3 space-y-4 flex-1">
          <NavigationAction />

          <Separator className="h-[2px] bg-zinc-200 dark:bg-zinc-700 rounded-md w-10 mx-auto" />

          <ScrollArea className="flex-1 w-full">
            <div className="flex flex-col items-center space-y-4 pb-4">
              {servers.map((server) => (
                <NavigationItem
                  key={server.id}
                  id={server.id}
                  imageUrl={server.imageUrl}
                  name={server.name}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        <NavigationBottom />
      </div>

      <div className="flex-1 min-w-0">
        <ServerSidebar serverId={serverId} />
      </div>
    </div>
  );
};

export default NavigationSidebarMobile;