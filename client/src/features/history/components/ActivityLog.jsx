import { Clock3, Sparkles, UserRound } from "lucide-react";

const mockActivity = [
  { id: 1, user: "Asha", action: "joined the room", time: "2m ago" },
  { id: 2, user: "Mina", action: "updated the editor", time: "7m ago" },
  { id: 3, user: "Arun", action: "shared the room link", time: "10m ago" },
];

function ActivityLog() {
  return (
    <section className="rounded-3xl border border-slate-700 bg-[#111827] p-6 shadow-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Activity history</h2>
          <p className="text-sm text-slate-400">Recent actions from the room timeline.</p>
        </div>
        <div className="rounded-full border border-[#57F287]/20 bg-[#57F287]/10 p-2 text-[#57F287]">
          <Sparkles className="h-4 w-4" />
        </div>
      </div>
      <div className="space-y-4">
        {mockActivity.map((item) => (
          <div key={item.id} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
            <div className="rounded-full border border-slate-700 bg-slate-900 p-2 text-slate-300">
              <UserRound className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">
                <span className="font-semibold">{item.user}</span> {item.action}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                <Clock3 className="h-3.5 w-3.5" />
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ActivityLog;
