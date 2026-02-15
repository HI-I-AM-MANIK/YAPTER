import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import NavigationAction from "./natvigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import NavigationBottom from "./navigation-bottom";

const NavigationSidebar = async () => {
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
    <div className="h-full w-full flex flex-col items-center py-3 space-y-4
                    bg-white dark:bg-[#0f172a]
                    text-black dark:text-white
                    border-r border-zinc-200 dark:border-zinc-800
                    transition-colors duration-300">

      {/* Create Server Button */}
      <NavigationAction />

      <Separator className="h-[2px] bg-zinc-200 dark:bg-zinc-700 rounded-md w-10 mx-auto" />

      {/* Servers List */}
      <ScrollArea className="w-full flex-1">
        <div className="flex flex-col items-center space-y-4">
          {servers.map((server) => (
            <div
              key={server.id}
              className="flex items-center justify-center w-full"
            >
              <NavigationItem
                id={server.id}
                imageUrl={server.imageUrl}
                name={server.name}
              />
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Section (Client Component) */}
      <NavigationBottom />
    </div>
  );
};

export default NavigationSidebar;
