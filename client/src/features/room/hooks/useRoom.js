import { useForm } from "react-hook-form";
import { roomApi } from "../services/room.api";



export const useCreateRoomHook = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { createRoomApi } = roomApi();

    const createRoomData = async (data) => {
        await createRoomApi(data);
        reset();
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

    const { joinRoomApi } = roomApi()

    const joinRoomData = (data) => {
        joinRoomApi(data)
        reset();
    };

    return {
        register, handleSubmit, errors, joinRoomData
    }
}