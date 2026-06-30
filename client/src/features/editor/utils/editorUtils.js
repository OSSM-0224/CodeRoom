export const buildDelta = ({ roomId, userId, timestamp, type, position, text = "", length }) => ({
  type,
  position,
  text,
  length,
  timestamp,
  userId,
  roomId,
});

export const countLines = (content = "") => {
  if (!content) return 1;
  return content.split(/\r?\n/).length;
};

export const getLanguageLabel = (language = "javascript") => {
  const map = {
    javascript: "JavaScript",
    typescript: "TypeScript",
    python: "Python",
    cpp: "C++",
    java: "Java",
  };

  return map[language] || language;
};
