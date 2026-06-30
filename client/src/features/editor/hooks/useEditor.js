import { axiosInstace } from "../../../services/axios";

export const getDocument = async (roomId) => {
  const { data } = await axiosInstace.get(/document/);
  return data?.data ?? null;
};

export const saveDocument = async (roomId, code, language) => {
  const { data } = await axiosInstace.patch(/document/, {
    content: code,
    language,
  });
  return data?.data ?? null;
};

export const getParticipants = async (roomId) => {
  const { data } = await axiosInstace.get(/room/);
  return data?.data ?? [];
};

export const getRoomData = async (roomId) => {
  const { data } = await axiosInstace.get(/room/user/);
  return data?.data ?? null;
};

export const leaveRoomApi = async (username) => {
  const resp = await axiosInstace.post("/room/leave", {
    username,
  });

  return resp.data;
};
