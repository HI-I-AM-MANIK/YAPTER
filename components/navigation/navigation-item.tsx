"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "../action-tooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({
  id,
  imageUrl,
  name,
}: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const isActive = params?.serverId === id;

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        onClick={onClick}
        className="group relative flex items-center"
      >
        {/* Active Indicator */}
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all",
            isActive ? "h-10 w-[4px]" : "h-2 w-[4px] group-hover:h-6"
          )}
        />

        {/* Server Icon */}
        <div
          className={cn(
            "relative flex mx-3 h-12 w-12 rounded-full overflow-hidden transition-all",
            isActive
              ? "rounded-2xl"
              : "group-hover:rounded-2xl"
          )}
        >
          <Image
            fill
            src={imageUrl}
            alt={name}
            className="object-cover"
          />
        </div>
      </button>
    </ActionTooltip>
  );
};
