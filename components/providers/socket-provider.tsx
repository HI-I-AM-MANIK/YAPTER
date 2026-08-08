"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket";

const SocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
};

export default SocketProvider;