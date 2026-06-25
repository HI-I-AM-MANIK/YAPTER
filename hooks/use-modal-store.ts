import { Server } from "@prisma/client";
import { create } from "zustand";
import {ChannelType} from "@prisma/client"
import { Channel } from "@/lib/generated/prisma/client";

export type ModalType = "createServer"|"invite"|"editServer"|"members"| "createChannel" | "leaveServer" | "deleteServer"| "deleteChannel";

interface ModalData{
  server?:Server;
  channel?:Channel;
  channelType?: ChannelType;
}

interface ModalStore {
  type: ModalType | null;
  data:ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?:ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data:{},
  isOpen: false,
  onOpen: (type,data={}) => set({ type, isOpen: true ,data}),
  onClose: () => set({ type: null, isOpen: false }),
}));
