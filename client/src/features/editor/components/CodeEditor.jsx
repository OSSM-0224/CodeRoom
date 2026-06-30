import { Editor } from "@monaco-editor/react";
import { FileCode2, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";

function CodeEditor({ code, setCode }) {
    const [language, setLanguage] = useState("javascript");



    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden rounded-xl border border-slate-700 bg-[#111827]">

            {/* Top Tabs */}

            <div className="flex items-center justify-between border-b border-slate-700 bg-[#1B2433] px-4 py-2">

                <div className="flex items-center gap-2">

                    <button className="flex items-center gap-2 rounded-lg border-b-2 border-[#57F287] bg-[#111827] px-4 py-2 text-sm text-white">

                        <FileCode2 className="h-4 w-4 text-[#57F287]" />

                        index.js

                    </button>

                    <button className="rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-slate-700">
                        app.js
                    </button>

                    <button className="rounded-lg px-3 py-2 text-sm text-gray-400 hover:bg-slate-700">
                        styles.css
                    </button>

                    <button className="rounded-lg p-2 hover:bg-slate-700">

                        <Plus className="h-4 w-4 text-gray-400" />

                    </button>

                </div>

                {/* Right */}

                <div className="flex items-center gap-3">

                    <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-[#0F172A] px-3 py-1">

                        <span className="text-xs uppercase text-gray-400">
                            Language
                        </span>

                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-transparent text-sm text-white outline-none"
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="typescript">TypeScript</option>
                            <option value="python">Python</option>
                            <option value="cpp">C++</option>
                            <option value="java">Java</option>
                        </select>

                        <ChevronDown className="h-4 w-4 text-gray-400" />

                    </div>

                    <div className="flex items-center gap-2">

                        <span className="text-sm text-gray-400">

                            Auto Save

                        </span>

                        <div className="h-5 w-10 rounded-full bg-green-500">

                            <div className="ml-auto mt-[2px] mr-[2px] h-4 w-4 rounded-full bg-white" />

                        </div>

                    </div>

                </div>

            </div>

            {/* Monaco */}

            <div className="flex-1 overflow-hidden">

                <Editor
                    height="100%"
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    theme="vs-dark"
                    options={{
                        fontSize: 15,
                        minimap: {
                            enabled: false,
                        },
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        roundedSelection: true,
                        cursorBlinking: "smooth",
                        wordWrap: "on",
                        padding: {
                            top: 20,
                        },
                    }}
                />

            </div>

        </div>
    );
}

export default CodeEditor;