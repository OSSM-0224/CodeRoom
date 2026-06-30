import { Loader2 } from "lucide-react";

function Loader({ label = "Loading...", className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-sm text-slate-300 ${className}`}>
      <Loader2 className="h-5 w-5 animate-spin text-[#57F287]" />
      <span>{label}</span>
    </div>
  );
}

export default Loader;
