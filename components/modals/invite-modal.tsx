"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const FileUpload = dynamic(() => import("@/components/file-upload"), {
  ssr: false,
});

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Copy, Icon, RefreshCw } from "lucide-react";


export const InviteModal = () => {

  const { isOpen, onClose, type } = useModal();
  
  const router = useRouter();

  const isModalOpen = isOpen && type === "invite";

 

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="bg-white dark:bg-[#1e1f22] text-black dark:text-white p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends 
          </DialogTitle>
          
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase teex-xs font-bold text-zincc-500 dark:text-secondary/70">
              Server Invite Link 
          </Label>
          <div className="flex ityems-ceenter mt-2 gap-x-2">
              <Input 
                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" value="invite-link"
              />
              <Button size="icon">
                <Copy className="w-4 h-4" />
              </Button>
          </div>
          <Button 
          variant="link"
          size="sm"
          className="text-xs text-zinc-500 mt-4">
              Generate a new Link 
              <RefreshCw className="w-4 h-4 ml-2"/>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
