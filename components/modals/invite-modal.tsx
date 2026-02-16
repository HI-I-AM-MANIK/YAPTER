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
import { Check, Copy, Icon, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";


export const InviteModal = () => {

  const { isOpen, onClose, type ,data} = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "invite";

  const origin= useOrigin();

  const {server} = data;
  const inviteUrl= `${origin}/invite/${server?.inviteCode}`

  const [copied,setCopied] = useState(false);

  const [isLoading,setIsLoading] = useState(false);

  const onCopy=()=>{
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    
    setTimeout(()=>{
      setCopied(false);
    },1000);
  }


  

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="bg-white  text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends 
          </DialogTitle>
          
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
              Server Invite Link 
          </Label>
          <div className="flex ityems-ceenter mt-2 gap-x-2">
              <Input readOnly
                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" value={inviteUrl}
              />
              <Button size="icon" onClick={onCopy}>
                {copied? <Check className="w-4 h-4"/>:<Copy className="w-4 h-4" />}
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


