import { useNavigate } from "react-router-dom";
import { axiosInstace } from "../../../services/axios";
import { useEditorApi } from "../../editor/services/editor.api";



export const useRoomApi = () => {

    const navigate = useNavigate();
    const { getDocumentData } = useEditorApi()

    const createRoomApi = async (data) => {
        let resp = await axiosInstace.post("/room/createroom", data)
        return resp
    };

    const joinRoomApi = async (data) => {
        let resp = await axiosInstace.post("/room/joinroom", data)
        navigate(`/editor/${resp.data.data.room._id}`);
        getDocumentData(resp.data.data.room._id)
        console.log(resp)
        return resp
    }


    return {
        createRoomApi, joinRoomApi
    }

}