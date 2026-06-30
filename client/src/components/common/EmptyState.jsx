import { Sparkles } from "lucide-react";

function EmptyState({ title, description }) {
  return (
    <div className="rounded-3xl border border-slate-700 bg-[#111827] p-8 text-center shadow-2xl">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full border border-[#57F287]/20 bg-[#57F287]/10 p-3 text-[#57F287]">
          <Sparkles className="h-6 w-6" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}

export default EmptyState;
