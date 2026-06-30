import { useParams } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import StatusBar from "../components/StatusBar";
import Toolbar from "../components/Toolbar";
import { useEffect, useState } from "react";
import { getDocument } from "../hooks/useEditor";

function EditorPage() {
    const { roomId } = useParams();

    const [code, setCode] = useState("");


    useEffect(() => {

        getDocument(roomId, setCode);

    }, []);


    return (
        <div className="flex h-screen flex-col overflow-hidden bg-[#0B1220] text-white">

            {/* Top Navigation */}
            <Toolbar />

            {/* Main Content */}
            <main className="flex flex-1 overflow-hidden">


                {/* Center Editor */}
                <section className="flex flex-1 flex-col overflow-hidden">
                    <CodeEditor code={code}

                        setCode={setCode} />
                </section>


            </main>

            {/* Bottom Status Bar */}
            <StatusBar />

        </div>
    );
}

export default EditorPage;