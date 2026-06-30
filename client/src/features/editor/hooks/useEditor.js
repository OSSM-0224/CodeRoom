import { axiosInstace } from "../../../services/axios";

import editorApi from "../api/editorApi.js";



export const getDocument = async (roomId, setCode) => {

    try {

        const response = await axiosInstace.get(`/document/${roomId}`);


        setCode(response.data.data.content);

    } catch (error) {

        console.log(error);

    }


};


export const saveDocument = async (roomId, code, language) => {

    try {

        await editorApi.updateDocument(roomId, {
            content: code,
            language,
        });

        console.log("Saved");

    } catch (error) {

        console.log(error);

    }

};

export const getParticipants = async (roomId) => {

    const { data } = await axiosInstace.get(`/room/${roomId}`);

    return data.data;
};

export const getRoomData = async (roomId) => {

    const { data } = await axiosInstace.get(`/room/user/${roomId}`);

    return data.data;
};


export const leaveRoomApi = async (username) => {

    const resp = await axiosInstace.post("/room/leave", {
        username,
    });

    return resp.data;
};