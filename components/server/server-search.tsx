"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export function ServerSearch({ data }: ServerSearchProps) {
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }

      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onClick = ({
    id,
    type
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);

    setRecent((prev) =>
      [id, ...prev.filter((i) => i !== id)].slice(0, 5)
    );

    if (type === "member") {
      router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }

    if (type === "channel") {
      router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
  };

  // 🔥 Flatten all items for recent lookup
  const allItems = data.flatMap((section) =>
    section.data?.map((d) => ({
      ...d,
      type: section.type
    })) || []
  );

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="group px-3 py-2 rounded-md flex items-center gap-x-2 w-full 
                   bg-zinc-200/50 dark:bg-zinc-800 
                   hover:bg-zinc-300/50 dark:hover:bg-zinc-700 
                   transition"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 
                      group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition">
          Search
        </p>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 text-[10px] font-mono text-muted-foreground">
          <span>⌘</span>
          <span>K</span>
        </kbd>
      </button>

      {/* Command Dialog */}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="animate-in fade-in zoom-in-95 duration-200"
      >
        <CommandInput
          autoFocus
          placeholder="Search channels and members..."
        />

        <CommandList>
          <CommandEmpty className="text-center text-sm text-zinc-500 py-6">
            😕 No results found
          </CommandEmpty>

          {/* 🔥 RECENT SECTION */}
          {recent.length > 0 && (
            <CommandGroup heading="Recent">
              {recent.map((id) => {
                const item = allItems.find((d) => d.id === id);
                if (!item) return null;

                return (
                  <CommandItem
                    key={item.id}
                    onSelect={() =>
                      onClick({ id: item.id, type: item.type })
                    }
                    className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer 
                               hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  >
                    <div className="text-zinc-500">{item.icon}</div>
                    <span className="flex-1">{item.name}</span>
                    <span className="text-xs text-zinc-400">
                      {item.type === "channel" ? "#channel" : "@user"}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {/* Main Data */}
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup
                key={label}
                heading={label}
                className="mt-2 first:mt-0"
              >
                {data.map(({ id, icon, name }) => (
                  <CommandItem
                    key={id}
                    onSelect={() => onClick({ id, type })}
                    className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer 
                               hover:bg-zinc-200 dark:hover:bg-zinc-700 
                               transition-all duration-150"
                  >
                    <div className="text-zinc-500">{icon}</div>

                    <span className="flex-1">{name}</span>

                    <span className="text-xs text-zinc-400">
                      {type === "channel" ? "#channel" : "@user"}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
}