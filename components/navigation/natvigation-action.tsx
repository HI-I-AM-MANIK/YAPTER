"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from '@/components/action-tooltip';
const NavigationAction = () => {
  return (
    <div>
        <ActionTooltip label="Add a Server" side="right" align="center">

            <div className="flex items-center justify-center">
            <button className="group relative flex items-center">
                <div
                className="
                    flex items-center justify-center
                    h-12 w-12
                    mx-3
                    rounded-full
                    bg-neutral-700
                    transition-all duration-200 ease-in-out
                    group-hover:rounded-2xl
                    group-hover:bg-emerald-500
                    shadow-md
                "
                >
                <Plus
                    size={24}
                    className="
                    text-emerald-400
                    transition-colors duration-200
                    group-hover:text-white
                    "
                />
                </div>
            </button>
            </div>
        </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
