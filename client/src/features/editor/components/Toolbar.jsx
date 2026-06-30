import { Code2, Copy, Share2, LogOut, Wifi } from "lucide-react";
import { useMemo } from "react";
import { toast } from "react-toastify";

function Toolbar({
  roomCode,
  handleLeaveRoom,
  connected = true,
  roomName = "Shared Room",
  participants = [],
}) {
  const shareText = useMemo(
    () => `Join CodeRoom with code ${roomCode}`,
    [roomCode],
  );

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
      {/* Left */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <Code2 className="h-7 w-7 text-[#57F287]" />

          <div>
            <h1 className="text-xl font-bold text-[#57F287]">CodeRoom</h1>

            <p className="text-xs text-gray-400">Collaborative Editor</p>
          </div>
        </div>

        <div className="hidden md:block">
          <h2 className="text-sm font-semibold text-white">Frontend Squad</h2>

          <p className="text-xs text-gray-400">Room Code : {roomCode}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Connection Status */}
        <div
          className={`hidden items-center gap-2 rounded-full px-3 py-1 md:flex ${
            connected ? "bg-green-500/10" : "bg-red-500/10"
          }`}
        >
          <Wifi
            className={`h-4 w-4 ${
              connected ? "text-green-400" : "text-red-400"
            }`}
          />

          <span
            className={`text-xs font-medium ${
              connected ? "text-green-400" : "text-red-400"
            }`}
          >
            {connected ? "Connected" : "Offline"}
          </span>
        </div>

        {/* Participants Count */}
        <div className="hidden rounded-full bg-slate-700 px-3 py-1 text-xs text-white md:block">
          👥 {participants.length} Participants
        </div>

        <button className="rounded-lg border border-slate-600 p-2 transition hover:border-[#57F287] hover:text-[#57F287]">
          <Copy className="h-5 w-5" />
        </button>

        <button className="rounded-lg border border-slate-600 p-2 transition hover:border-blue-400 hover:text-blue-400">
          <Share2 className="h-5 w-5" />
        </button>

        <button
          onClick={handleLeaveRoom}
          className="rounded-lg border border-red-500/50 p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
        </button>

        <img
          src="https://i.pravatar.cc/100"
          alt="Profile"
          className="h-10 w-10 rounded-full border-2 border-[#57F287]"
        />
      </div>
    </header>
  );
}

export default Toolbar;
