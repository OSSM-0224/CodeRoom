import { Code2, Compass, History, LayoutGrid, LogOut, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", icon: LayoutGrid },
  { to: "/editor/demo", label: "Editor", icon: Code2 },
  { to: "/history", label: "History", icon: History },
  { to: "/participants", label: "Participants", icon: Users },
];

function Sidebar({ compact = false }) {
  return (
    <aside className="hidden h-full w-64 flex-col border-r border-slate-800 bg-[#0B1428] px-4 py-6 lg:flex">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="rounded-2xl border border-[#57F287]/20 bg-[#57F287]/10 p-2 text-[#57F287]">
          <Compass className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Workspace</p>
          <p className="text-xs text-slate-400">Realtime coding</p>
        </div>
      </div>
      <nav className="space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition ${isActive ? "bg-[#57F287]/15 text-[#57F287]" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`
            }
          >
            <Icon className="h-4 w-4" />
            {!compact ? <span>{label}</span> : null}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
        <p className="text-sm font-semibold text-white">Need a quick handoff?</p>
        <p className="mt-1 text-sm text-slate-400">Share your room code and keep building.</p>
        <button className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:border-[#57F287] hover:text-[#57F287]">
          <LogOut className="h-4 w-4" />
          Leave workspace
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
