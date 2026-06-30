import { Activity, Circle, Wifi } from "lucide-react";
import Badge from "../ui/Badge";

function Header({ title, status = "Connected", roomCode, participants = 0 }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-[#111827]/90 px-6 py-4">
      <div>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <p className="text-sm text-slate-400">{roomCode ? `Room ${roomCode}` : "Shared workspace"}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="success" className="flex items-center gap-2">
          <Circle className="h-2.5 w-2.5 fill-current" />
          {status}
        </Badge>
        <Badge variant="info" className="flex items-center gap-2">
          <Wifi className="h-3.5 w-3.5" />
          {participants} active
        </Badge>
        <Badge variant="default" className="flex items-center gap-2">
          <Activity className="h-3.5 w-3.5" />
          Collaborative
        </Badge>
      </div>
    </header>
  );
}

export default Header;
