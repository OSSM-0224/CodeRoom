import { useEffect } from "react";
import { socket } from "../../../app/socket";

const usePresence = ({ onUserJoined, onUserLeft }) => {
    useEffect(() => {
        socket.on("USER_JOINED", onUserJoined);
        socket.on("USER_LEFT", onUserLeft);

        return () => {
            socket.off("USER_JOINED", onUserJoined);
            socket.off("USER_LEFT", onUserLeft);
        };
    }, [onUserJoined, onUserLeft]);
};

export default usePresence;