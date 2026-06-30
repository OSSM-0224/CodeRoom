import { Code2, LogOut, Share2, Wifi } from "lucide-react";
import { useMemo } from "react";
import CopyButton from "../../../components/common/CopyButton";
import {toast} from "react-toastify";

function Toolbar({ roomCode, handleLeaveRoom, connected = true, roomName = "Shared Room" }) {
  const shareText = useMemo(() => `Join CodeRoom with code ${roomCode}`, [roomCode]);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: "CodeRoom", text: shareText });
      toast.info("Invite link shared");
      return;
    }
    toast.success("Room code ready to share");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-700 bg-[#111827] px-6">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Code2 className="h-7 w-7 text-[#57F287]" />
          <div>
            <h1 className="text-xl font-bold text-[#57F287]">CodeRoom</h1>
            <p className="text-xs text-gray-400">Collaborative Editor</p>
          </div>
        </div>
        <div className="hidden md:block">
          <h2 className="text-sm font-semibold text-white">{roomName}</h2>
          <p className="text-xs text-gray-400">Room Code: {roomCode}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className={`hidden items-center gap-2 rounded-full px-3 py-1 md:flex ${connected ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-300"}`}>
          <Wifi className="h-4 w-4" />
          <span className="text-xs font-medium">{connected ? "Connected" : "Reconnecting"}</span>
        </div>
        <CopyButton value={roomCode} label="Copy Code" />
        <button onClick={handleShare} className="rounded-lg border border-slate-600 p-2 transition hover:border-[#57F287] hover:text-[#57F287]">
          <Share2 className="h-5 w-5" />
        </button>
        <button onClick={handleLeaveRoom} className="rounded-lg border border-red-500/50 p-2 text-red-400 transition hover:bg-red-500 hover:text-white">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}

export default Toolbar;