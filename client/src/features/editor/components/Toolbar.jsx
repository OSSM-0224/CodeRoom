import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Copy, Check, Save } from "lucide-react";
import { setLanguage } from "../slice/editorSlice";

/**
 * Toolbar
 * --------
 * Top bar above the editor surface.
 * - Copy Room Code: clipboard helper so participants can invite others.
 * - Language Dropdown: UI-only per spec (does not run a linter/compiler,
 *   just tags the document's language for syntax-highlighting purposes —
 *   actual highlighting can be layered on later if a code-editor library
 *   is swapped in).
 * - Save Indicator: reflects the same `status` driven by useEditor.
 *
 * Undo is intentionally NOT implemented here (marked optional in spec) —
 * left as a clearly scoped future addition so it doesn't block delivery.
 */
const LANGUAGES = ["javascript", "python", "java", "cpp", "typescript", "go"];

const Toolbar = ({ roomCode, language, status }) => {
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      // Clipboard API can fail in insecure contexts (non-HTTPS); fail silently
      // in UI, this is non-critical functionality.
    }
  };

  const handleLanguageChange = (event) => {
    dispatch(setLanguage(event.target.value));
  };

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-zinc-800 border-b border-zinc-700 text-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-700 hover:bg-zinc-600 transition-colors"
          title="Copy room code"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          <span>{copied ? "Copied" : roomCode}</span>
        </button>

        <select
          value={language}
          onChange={handleLanguageChange}
          className="bg-zinc-700 hover:bg-zinc-600 rounded-md px-2 py-1 outline-none cursor-pointer"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1.5 text-zinc-400">
        <Save size={14} />
        <span>{status === "saved" ? "Saved" : "Saving..."}</span>
      </div>
    </div>
  );
};

export default Toolbar;