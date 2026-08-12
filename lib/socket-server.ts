import { Server } from "socket.io";

let io: Server | undefined;

export const setSocketServer = (server: Server) => {
  io = server;
};

export const getSocketServer = () => {
  return io;
};