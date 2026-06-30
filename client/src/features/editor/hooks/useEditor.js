import { axiosInstace } from "../../../services/axios";



export const getDocument = async (roomId, setCode) => {

    try {

        const response = await axiosInstace.get(`/document/${roomId}`);

        console.log(response.data);

        setCode(response.data.data.content);

    } catch (error) {

        console.log(error);

    }


};
