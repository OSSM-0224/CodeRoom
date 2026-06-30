import { UserRound } from "lucide-react";
import { generateAvatar } from "../../utils/generateAvatar";

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

function Avatar({ name = "User", src, size = "md", className = "" }) {
  const initials = generateAvatar(name).initials;
  const background = generateAvatar(name).background;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover ring-1 ring-white/10 ${sizeClasses[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full font-semibold text-white ${sizeClasses[size]} ${className}`}
      style={{ background }}
    >
      {initials || <UserRound className="h-4 w-4" />}
    </div>
  );
}

export default Avatar;
