import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import NavigationAction from "./natvigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";

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
  });

  return (
    <div className="bg-black h-full flex flex-col items-center text-primary w-full py-3 space-y-4">
      
      {/* Create Server Button */}
      <NavigationAction />

      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />

      {/* Servers List */}
      <ScrollArea className="w-full flex-1">
        <div className="flex flex-col items-center space-y-4">
          {servers.map((server) => (
            <div key={server.id} className="flex items-center justify-center w-full">
              <NavigationItem

                id={server.id}
                imageUrl={server.imageUrl}
                name={server.name}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NavigationSidebar;
