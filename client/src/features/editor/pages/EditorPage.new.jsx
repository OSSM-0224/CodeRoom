import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { applyLocalContent, hydrateDocument, setLanguage, setStatus } from "../slice/editorSlice";
import CodeEditor from "../components/CodeEditor";
import StatusBar from "../components/StatusBar";
import Toolbar from "../components/Toolbar";
import { getDocument, getParticipants, getRoomData, leaveRoomApi } from "../hooks/useEditor";
import { useEditorApi } from "../services/editor.api";
import { useSocket } from "../../../hooks/useSocket";
import { countLines } from "../utils/editorUtils";
import { showError, showSuccess } from "../../../utils/toast";

function EditorPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const username = state?.username || "Guest";
  const { content, language, status } = useSelector((store) => store.editor);
  const [participants, setParticipants] = useState([]);
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("Shared Room");
  const { updateDocument } = useEditorApi();
  const { socket, connected } = useSocket(roomId, username);

  useEffect(() => {
    const loadRoom = async () => {
      try {
        const document = await getDocument(roomId);
        if (document) {
          dispatch(hydrateDocument({ roomId, content: document.content || "", language: document.language, version: document.version || 0 }));
        }
        const participantData = await getParticipants(roomId);
        setParticipants(Array.isArray(participantData) ? participantData : []);
        const room = await getRoomData(roomId);
        setRoomCode(room?.roomCode || roomId);
        setRoomName(room?.name || "Shared Room");
      } catch {
        showError("Unable to load the room right now.");
      }
    };

    if (roomId) loadRoom();
  }, [dispatch, roomId]);

  useEffect(() => {
    if (!socket || !roomId) return;

    const handleRemoteDelta = ({ deltas }) => {
      if (!Array.isArray(deltas) || !deltas.length) return;
      const nextContent = deltas.reduce((accumulator, delta) => {
        if (delta.type === "insert") {
          return accumulator.slice(0, delta.position) + delta.text + accumulator.slice(delta.position);
        }
        if (delta.type === "delete") {
          return accumulator.slice(0, delta.position) + accumulator.slice(delta.position + (delta.length || 0));
        }
        return accumulator;
      }, content);
      dispatch(hydrateDocument({ roomId, content: nextContent, version: 0, language }));
    };

    socket.on("editor:delta", handleRemoteDelta);
    return () => socket.off("editor:delta", handleRemoteDelta);
  }, [content, dispatch, language, roomId, socket]);

  const handleLeaveRoom = async () => {
    try {
      await leaveRoomApi(username);
      navigate("/");
      showSuccess("You left the room");
    } catch {
      showError("Unable to leave the room.");
    }
  };

  const handleSave = async () => {
    try {
      await updateDocument(roomId, { content, language });
      dispatch(setStatus("saved"));
      showSuccess("Document saved");
    } catch {
      dispatch(setStatus("unsaved"));
      showError("Unable to save document");
    }
  };

  const handleEditorChange = (value) => {
    dispatch(applyLocalContent(value || ""));
    dispatch(setStatus("typing"));
  };

  const handleLanguageChange = (nextLanguage) => {
    dispatch(setLanguage(nextLanguage));
  };

  const computedLineCount = useMemo(() => countLines(content), [content]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0B1220] text-white">
      <Toolbar roomCode={roomCode} handleLeaveRoom={handleLeaveRoom} connected={connected} roomName={roomName} />
      <main className="flex flex-1 overflow-hidden">
        <section className="flex flex-1 flex-col overflow-hidden">
          <CodeEditor code={content} setCode={handleEditorChange} language={language} onLanguageChange={handleLanguageChange} />
        </section>
      </main>
      <StatusBar handleSave={handleSave} participants={participants} status={status} lineCount={computedLineCount} />
    </div>
  );
}

export default EditorPage;
