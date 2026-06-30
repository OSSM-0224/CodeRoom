const variantClasses = {
  default: "border border-slate-700 bg-slate-900/80 text-slate-200",
  success: "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  warning: "border border-amber-500/30 bg-amber-500/10 text-amber-300",
  danger: "border border-rose-500/30 bg-rose-500/10 text-rose-300",
  info: "border border-sky-500/30 bg-sky-500/10 text-sky-300",
};

function Badge({ children, variant = "default", className = "" }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
