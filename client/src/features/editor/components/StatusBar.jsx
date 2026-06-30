import React, { useEffect, useState } from "react";
import { getSocket } from "../../../socket/socket";

/**
 * StatusBar
 * ----------
 * Bottom bar showing: Connected/Disconnected, Saved/Unsaved, Typing, and
 * the current line count. `status` and `lineCount` come from useEditor
 * (Redux-backed); socket connection state is tracked locally here since
 * it's purely a transport-layer concern, not document state.
 */
const StatusBar = ({ status, lineCount }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = getSocket();
    setIsConnected(socket.connected);

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  const statusLabel =
    status === "typing" ? "Typing..." : status === "saved" ? "Saved" : "Unsaved";

  return (
    <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-800 border-t border-zinc-700 text-xs text-zinc-400">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span
            className={`h-2 w-2 rounded-full ${
              isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {isConnected ? "Connected" : "Disconnected"}
        </span>
        <span>{statusLabel}</span>
      </div>

      <span>Lines: {lineCount}</span>
    </div>
  );
};

export default StatusBar;