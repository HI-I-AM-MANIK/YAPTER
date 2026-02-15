"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

const NavigationAction = () => {
  const {onOpen} = useModal();
  return (
    <ActionTooltip side="right" align="center" label="Add a server">
      <button onClick={() => onOpen("createServer")} className="w-full">
      <div className="group flex items-center">
        <div className="flex items-center justify-center h-12 w-12 mx-3 rounded-full bg-neutral-700 group-hover:bg-emerald-500 transition-all duration-300 group-hover:rounded-2xl">
          <Plus
            size={24}
            className="text-emerald-400 group-hover:text-white transition-colors duration-300"
          />
        </div>
      </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationAction;
