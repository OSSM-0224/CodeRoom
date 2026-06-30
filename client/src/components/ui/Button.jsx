import { Loader2 } from "lucide-react";

const variantClasses = {
  primary: "bg-[#57F287] text-slate-950 hover:bg-[#45df72]",
  secondary: "border border-slate-700 bg-slate-900/80 text-slate-100 hover:border-[#57F287] hover:text-[#57F287]",
  ghost: "bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white",
  danger: "bg-rose-500/90 text-white hover:bg-rose-500",
};

function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}

export default Button;
