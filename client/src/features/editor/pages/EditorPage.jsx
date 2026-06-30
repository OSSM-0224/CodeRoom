import { useLocation, useNavigate, useParams } from "react-router";
import CodeEditor from "../components/CodeEditor";
import StatusBar from "../components/StatusBar";
import Toolbar from "../components/Toolbar";
import { useEffect, useState } from "react";
import { getDocument, getParticipants, getRoomData, leaveRoomApi } from "../hooks/useEditor";
import editorApi from "../api/editorApi";

function EditorPage() {
    const { roomId } = useParams();

    const [code, setCode] = useState("");
    const [participants, setParticipants] = useState([]);
    const [roomCode, setroomCode] = useState('');

    const navigate = useNavigate()

    const { state } = useLocation();

    const username = state?.username;

    useEffect(() => {

        getDocument(roomId, setCode);
        const fetchParticipants = async () => {

            const data = await getParticipants(roomId);


            setParticipants(data);

        };

        fetchParticipants();

        const fetchRoom = async () => {

            const room = await getRoomData(roomId);

            setroomCode(room.roomCode);
        };

        fetchRoom();





    }, []);


    const handleLeaveRoom = async () => {

        try {

            await leaveRoomApi(username);

            navigate("/");

        } catch (error) {

            console.log(error);

        }

    }


    const handleSave = async () => {
        try {

            await editorApi.updateDocument(roomId, {
                content: code,

            });

            console.log("Document Saved ✅");

        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div className="flex h-screen flex-col overflow-hidden bg-[#0B1220] text-white">

            {/* Top Navigation */}
            <Toolbar
                roomCode={roomCode}
                handleLeaveRoom={handleLeaveRoom}
            />

            {/* Main Content */}
            <main className="flex flex-1 overflow-hidden">


                {/* Center Editor */}
                <section className="flex flex-1 flex-col overflow-hidden">
                    <CodeEditor code={code}

                        setCode={setCode} />


                </section>


            </main>

            {/* Bottom Status Bar */}
            <StatusBar
                handleSave={handleSave}
                participants={participants}
            />

        </div>
    );
}

export default EditorPage;