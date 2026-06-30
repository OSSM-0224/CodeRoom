import { useForm } from "react-hook-form";
import { useRoomApi } from "../services/room.api";
import { useNavigate } from "react-router";



export const useCreateRoomHook = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { createRoomApi } = useRoomApi();

    const createRoomData = async (data) => {
        const room = await createRoomApi(data);
        reset();
        return room;
    };

    return {
        register,
        handleSubmit,
        errors,
        createRoomData,
    };
};

export const useJoinRoomHook = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { joinRoomApi } = useRoomApi()

    const joinRoomData = (data) => {
        joinRoomApi(data)
        reset();
    };

    return {
        register, handleSubmit, errors, joinRoomData
    }
}