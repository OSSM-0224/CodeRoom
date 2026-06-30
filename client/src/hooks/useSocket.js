import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { showError, showSuccess } from "../utils/toast";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export function useSocket(roomId, username) {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [status, setStatus] = useState("connecting");

  const socket = useMemo(() => {
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });
    }
    return socketRef.current;
  }, []);

  useEffect(() => {
    if (!roomId || !username) return;

    const handleConnect = () => {
      setConnected(true);
      setStatus("connected");
      socket.emit("editor:join", { roomId, username });
      showSuccess("Connected to room");
    };

    const handleDisconnect = () => {
      setConnected(false);
      setStatus("disconnected");
      showError("Connection lost. Reconnecting...");
    };

    const handleReconnect = () => {
      setConnected(true);
      setStatus("connected");
      socket.emit("editor:join", { roomId, username });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("reconnect", handleReconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("reconnect", handleReconnect);
    };
  }, [roomId, socket, username]);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return { socket, connected, participants, status, setParticipants };
}
