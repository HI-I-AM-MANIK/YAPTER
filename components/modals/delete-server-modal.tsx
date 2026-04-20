"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const isModalOpen = isOpen && type === "deleteServer";

  const isMatch = confirmText === server?.name;

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);

      router.refresh();
      router.push("/");
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden rounded-xl">
        
        {/* 🔥 Animation wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold text-red-600">
              Delete Server
            </DialogTitle>

            <DialogDescription className="text-center text-zinc-500 mt-2">
              This action is <span className="font-semibold text-red-500">irreversible</span>.
              <br />
              Type{" "}
              <span className="font-bold text-indigo-500">
                {server?.name}
              </span>{" "}
              to confirm.
            </DialogDescription>
          </DialogHeader>

          {/* 🔤 Confirm input */}
          <div className="px-6 mt-4">
            <Input
              disabled={isLoading}
              placeholder="Enter server name to confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>

          <DialogFooter className="px-6 py-6">
            <div className="flex items-center justify-between w-full">
              
              <Button
                disabled={isLoading}
                onClick={onClose}
                variant="ghost"
              >
                Cancel
              </Button>

              {/* 💀 Danger button */}
              <Button
                disabled={!isMatch || isLoading}
                onClick={onClick}
                className="bg-red-600 hover:bg-red-700 text-white transition-all"
              >
                {isLoading ? "Deleting..." : "Delete Server"}
              </Button>

            </div>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};