import { Code2, Menu } from "lucide-react";

function Navbar({ title = "CodeRoom", subtitle = "Collaborative Editor", rightContent }) {
  return (
    <nav className="flex items-center justify-between border-b border-slate-800 bg-[#071223]/80 px-6 py-5 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl border border-[#57F287]/20 bg-[#57F287]/10 p-2 text-[#57F287]">
          <Code2 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-[#57F287]">{title}</h1>
          <p className="text-sm text-slate-400">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {rightContent}
        <button className="rounded-2xl border border-slate-700 bg-slate-900/70 p-2 text-slate-300 transition hover:border-[#57F287] hover:text-[#57F287]">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
