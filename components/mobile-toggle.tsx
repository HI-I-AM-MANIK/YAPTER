"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileToggleProps {
  children: React.ReactNode;
}

export const MobileToggle = ({ children }: MobileToggleProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left"  className="p-0 flex gap-0 w-[372px] overflow-hidden">
        <SheetHeader className="sr-only">
          <SheetTitle>Server Navigation</SheetTitle>
        </SheetHeader>

        {children}
      </SheetContent>
    </Sheet>
  );
};