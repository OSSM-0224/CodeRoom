import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, error, className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      {label ? (
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[3px] text-gray-400">
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        className={`w-full rounded-xl border bg-[#111827] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 ${error ? "border-red-500" : "border-[#2D3748] focus:border-[#57F287]"} ${className}`}
        {...props}
      />
      {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
    </div>
  );
});

export default Input;
