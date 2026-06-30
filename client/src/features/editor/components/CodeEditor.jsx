import { Editor } from "@monaco-editor/react";
import { ChevronDown, FileCode2, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

function CodeEditor({ code, setCode, language = "javascript", onLanguageChange }) {
  const [files, setFiles] = useState([
    { id: "file-1", name: "index.js", language, content: code || "" },
  ]);
  const [activeFile, setActiveFile] = useState("file-1");

  const currentFile = useMemo(() => files.find((file) => file.id === activeFile) || files[0], [activeFile, files]);

  const addFile = () => {
    const newFile = { id: `file-${files.length + 1}`, name: `file${files.length + 1}.js`, language: "javascript", content: "" };
    setFiles((prev) => [...prev, newFile]);
    setActiveFile(newFile.id);
    setCode("");
  };

  const removeFile = (id) => {
    if (files.length === 1) return;
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    if (activeFile === id) {
      setActiveFile(updatedFiles[0].id);
      setCode(updatedFiles[0].content);
    }
  };

  const changeFile = (file) => {
    setActiveFile(file.id);
    setCode(file.content);
  };

  const updateContent = (value) => {
    const nextValue = value || "";
    setCode(nextValue);
    setFiles((prev) => prev.map((file) => (file.id === activeFile ? { ...file, content: nextValue } : file)));
  };

  const changeLanguage = (lang) => {
    setFiles((prev) => prev.map((file) => (file.id === activeFile ? { ...file, language: lang } : file)));
    if (onLanguageChange) onLanguageChange(lang);
  };

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden rounded-xl border border-slate-700 bg-[#111827]">
      <div className="flex items-center justify-between border-b border-slate-700 bg-[#1B2433] px-4 py-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          {files.map((file) => (
            <button
              key={file.id}
              onClick={() => changeFile(file)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition ${activeFile === file.id ? "border-b-2 border-[#57F287] bg-[#111827] text-white" : "text-gray-400 hover:bg-slate-700"}`}
            >
              <FileCode2 className="h-4 w-4 text-[#57F287]" />
              {file.name}
              {files.length > 1 ? (
                <X
                  className="h-4 w-4 text-red-400 hover:text-red-500"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeFile(file.id);
                  }}
                />
              ) : null}
            </button>
          ))}
          <button onClick={addFile} className="rounded-lg p-2 hover:bg-slate-700">
            <Plus className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0F172A] px-3 py-1">
            <span className="text-xs uppercase text-gray-400">Language</span>
            <select value={currentFile?.language || language} onChange={(event) => changeLanguage(event.target.value)} className="bg-transparent text-sm text-white outline-none">
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          theme="vs-dark"
          language={currentFile?.language || language}
          value={currentFile?.content ?? ""}
          onChange={updateContent}
          options={{
            fontSize: 15,
            minimap: { enabled: false },
            automaticLayout: true,
            scrollBeyondLastLine: false,
            roundedSelection: true,
            cursorBlinking: "smooth",
            wordWrap: "on",
            padding: { top: 20 },
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;