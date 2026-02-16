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
            Customize your Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500 dark:text-zinc-400">
            Give your server a personality with a name and an image.
          </DialogDescription>
        </DialogHeader>

      </DialogContent>
    </Dialog>
  );
};
