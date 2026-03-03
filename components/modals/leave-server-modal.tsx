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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";

import { Button } from "../ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";


export const LeaveServerModal = () => {

  const {isOpen, onClose, type ,data} = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "leaveServer";

  const origin= useOrigin();

  const {server} = data;
  const inviteUrl= `${origin}/invite/${server?.inviteCode}`

  const [isLoading,setIsLoading] = useState(false);

  const onClick = async() =>{
    try{
      setIsLoading(true);
      await axios.patch(`/api/servers/{server?.id}/leave`);
      onClose();
      router.refresh();
      router.push("/")
    }catch(error){
      console.log(error)
    }finally{
      setIsLoading(false);
    }
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
              Leave Server 
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to leave <span className="font-semibold text-indigo-500">${server?.name}</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onClick}
              variant="primary"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


