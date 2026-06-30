export const generateAvatar = (name = "User") => {
  const safeName = String(name || "User").trim();
  const initials = safeName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

  const palette = [
    "linear-gradient(135deg, #57F287, #0ea5e9)",
    "linear-gradient(135deg, #60a5fa, #8b5cf6)",
    "linear-gradient(135deg, #f59e0b, #ef4444)",
    "linear-gradient(135deg, #fb923c, #f43f5e)",
  ];

  const index = safeName.length % palette.length;

  return {
    initials: initials || "U",
    background: palette[index],
  };
};
