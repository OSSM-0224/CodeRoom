import { useLocation, useNavigate, useParams } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import StatusBar from "../components/StatusBar";
import Toolbar from "../components/Toolbar";
import { useEffect, useState } from "react";
import { getDocument, getParticipants, getRoomData, leaveRoomApi } from "../hooks/useEditor";
import editorApi from "../api/editorApi";
import { socket } from "../../../app/socket";

function EditorPage() {
    const { roomId } = useParams();

    const [code, setCode] = useState("");
    const [participants, setParticipants] = useState([]);
    const [roomCode, setroomCode] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const [typingUser, setTypingUser] = useState("");

    const navigate = useNavigate()

    const { state } = useLocation();

    const username = state?.username;
    useEffect(() => {
        getDocument(roomId, setCode);

        const fetchInitialData = async () => {
            try {
                const [participantsData, room] = await Promise.all([
                    getParticipants(roomId),
                    getRoomData(roomId),
                ]);

                setParticipants(participantsData);
                setroomCode(room.roomCode);

                if (!socket.connected) {
                    socket.connect();
                }

                const joinRoom = () => {
                    socket.emit(
                        "room:join",
                        {
                            roomCode: room.roomCode,
                            username,
                        },
                        (response) => {
                            console.log("JOIN ACK:", response);
                        }
                    );
                };

                if (socket.connected) {
                    joinRoom();
                } else {
                    socket.once("connect", joinRoom);
                }

            } catch (error) {
                console.error(error);
            }
        };

        fetchInitialData();

        // ======================
        // Socket Events
        // ======================

        const handleConnect = () => {
            console.log("🟢 Socket Connected:", socket.id);
            setIsConnected(true);
        };

        const handleDisconnect = () => {
            console.log("🔴 Socket Disconnected");
            setIsConnected(false);
        };

        const handleConnectError = (err) => {
            console.log("❌ Socket Error:", err.message);
        };

        const handleUserJoined = (user) => {
            console.log("USER_JOINED", user);
        };

        const handleUserLeft = (user) => {
            console.log("USER_LEFT", user);
        };

        const handleParticipantsUpdated = (list) => {
            console.log("Participants Updated", list);
            setParticipants(list);
        };

        const handleUserTyping = ({ username }) => {
            setTypingUser(username);
        };

        const handleUserStoppedTyping = () => {
            setTypingUser("");
        };

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);

        socket.on("connect_error", handleConnectError);

        socket.on("USER_JOINED", handleUserJoined);
        socket.on("USER_LEFT", handleUserLeft);

        socket.on("PARTICIPANTS_UPDATED", handleParticipantsUpdated);

        socket.on("USER_TYPING", handleUserTyping);
        socket.on("USER_STOPPED_TYPING", handleUserStoppedTyping);

        return () => {

            socket.emit("room:leave", {
                roomId,
                username,
            });

            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);

            socket.off("connect_error", handleConnectError);

            socket.off("USER_JOINED", handleUserJoined);
            socket.off("USER_LEFT", handleUserLeft);

            socket.off("PARTICIPANTS_UPDATED", handleParticipantsUpdated);

            socket.off("USER_TYPING", handleUserTyping);
            socket.off("USER_STOPPED_TYPING", handleUserStoppedTyping);

            socket.disconnect();
        };

    }, [roomId, username]);


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
                participants={participants}
                connected={isConnected}
            />

            {/* Main Content */}
            <main className="flex flex-1 overflow-hidden">


                {/* Center Editor */}
                <section className="flex flex-1 flex-col overflow-hidden">
                    <CodeEditor code={code}

                        setCode={setCode} />
                    roomId={roomId}
                    username={username}


                </section>


            </main>

            {/* Bottom Status Bar */}
            <StatusBar
                participants={participants}
                connected={isConnected}
                typingUser={typingUser}
            />

        </div>
    );
}

export default EditorPage;