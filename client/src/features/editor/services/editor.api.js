import { axiosInstace } from "../../../services/axios";


export const useEditorApi = () => {

    const getDocumentData = async (roomId, roomCode) => {

        const resp = await axiosInstace(`/document/${roomId}`);

        return { resp, roomCode }
    };


    return {
        getDocumentData
    }
}