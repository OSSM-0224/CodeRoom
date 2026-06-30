import axiosInstance from "../../../api/axiosInstance";

/**
 * Editor API
 * -----------
 * Thin wrapper functions around the Document/Editor REST endpoints.
 * Used for the initial fetch on join, and the explicit "Save" action —
 * NOT for live keystroke sync, which goes through the socket layer.
 */

const getDocument = async (roomId) => {
  const { data } = await axiosInstance.get(`/api/document/${roomId}`);
  return data.data; // ApiResponse wraps payload in `data`
};

const updateDocument = async (roomId, payload) => {
  const { data } = await axiosInstance.patch(
    `/api/document/${roomId}`,
    payload,
  );
  return data.data;
};

// Fallback HTTP path for submitting a single delta if the socket is unavailable.
const submitDeltaFallback = async (delta) => {
  const { data } = await axiosInstance.post(`/api/editor/delta`, delta);
  return data.data;
};

// Fallback HTTP path for submitting an atomic batch (delete+insert pair).
const submitDeltaBatchFallback = async (deltas) => {
  const { data } = await axiosInstance.post(`/api/editor/delta-batch`, deltas);
  return data.data;
};

export default {
  getDocument,
  updateDocument,
  submitDeltaFallback,
  submitDeltaBatchFallback,
};
