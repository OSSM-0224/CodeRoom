import { axiosInstace } from "../../../services/axios";



export const roomApi = () => {

    const createRoomApi = async (data) => {
        let resp = await axiosInstace.post("/room/createroom", data)
        return resp
    };

    const joinRoomApi = async (data) => {
        let resp = await axiosInstace.post("/room/joinroom", data)
        return resp
    }


    return {
        createRoomApi, joinRoomApi
    }

}