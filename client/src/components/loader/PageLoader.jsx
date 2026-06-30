import Spinner from "./Spinner";

function PageLoader({ label = "Loading workspace..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#071223] via-[#0B1428] to-[#10244A] text-white">
      <div className="rounded-3xl border border-slate-700 bg-[#111827]/90 px-8 py-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <Spinner className="h-6 w-6" />
          <span className="text-sm text-slate-300">{label}</span>
        </div>
      </div>
    </div>
  );
}

export default PageLoader;
