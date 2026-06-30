import { useNavigate } from "react-router-dom";
import { axiosInstace } from "../../../services/axios";
import { useEditorApi } from "../../editor/services/editor.api";



export const useRoomApi = () => {

    const navigate = useNavigate();
    const { getDocumentData } = useEditorApi()

    const createRoomApi = async (data) => {
        let resp = await axiosInstace.post("/room/createRoom", data)
        return resp
    };

    const joinRoomApi = async (data) => {
        let resp = await axiosInstace.post("/room/joinRoom", data)
        navigate(`/editor/${resp.data.data.room._id}`,
            {
                state: {
                    username: data.username,
                    roomId: resp.data.data.room._id,
                    roomCode: resp.data.data.room.roomCode,
                },
            }
        );
        getDocumentData(resp.data.data.room._id)

        return resp
    }


    return {
        createRoomApi, joinRoomApi
    }

}