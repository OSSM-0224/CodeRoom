import { axiosInstace } from "../../../services/axios";

export const useEditorApi = () => {
  const getDocumentData = async (roomId) => {
    const { data } = await axiosInstace.get(`/document/${roomId}`);
    return data?.data ?? null;
  };

  const updateDocument = async (roomId, payload) => {
    const { data } = await axiosInstace.patch(`/document/${roomId}`, payload);
    return data?.data ?? null;
  };

  return {
    getDocumentData,
    updateDocument,
  };
};

export default useEditorApi;
