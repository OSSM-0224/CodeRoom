import React from "react";
import useEditor from "../hooks/useEditor";
import Toolbar from "./Toolbar";
import StatusBar from "./StatusBar";

/**
 * CodeEditor
 * -----------
 * Top-level editor component for a room. Composes Toolbar + the editable
 * surface + StatusBar, all driven by the useEditor hook.
 *
 * We use a plain <textarea> rather than a heavier code-editor library
 * (Monaco/CodeMirror) to keep this hackathon build dependency-light and
 * fully under our control for delta/position logic — swapping in Monaco
 * later only requires changing this component, since all sync logic lives
 * in the hook.
 */
const CodeEditor = ({ roomId, userId, roomCode }) => {
  const { content, status, language, lineCount, onLocalChange } = useEditor(
    roomId,
    userId
  );

  const handleChange = (event) => {
    onLocalChange(event.target.value);
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-900 text-zinc-100 rounded-lg overflow-hidden border border-zinc-700">
      <Toolbar roomCode={roomCode} language={language} status={status} />

      <textarea
        className="flex-1 w-full resize-none bg-zinc-900 text-zinc-100 font-mono text-sm p-4 outline-none leading-6"
        spellCheck={false}
        value={content}
        onChange={handleChange}
        placeholder="// Start typing... everyone in the room sees this live"
      />

      <StatusBar status={status} lineCount={lineCount} />
    </div>
  );
};

export default CodeEditor;