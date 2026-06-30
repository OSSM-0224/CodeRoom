

/**
 * Editor API
 * -----------
 * Thin wrapper functions around the Document/Editor REST endpoints.
 * Used for the initial fetch on join, and the explicit "Save" action —
 * NOT for live keystroke sync, which goes through the socket layer.
 */

import { axiosInstace } from "../../../services/axios";

const getDocument = async (roomId) => {
  const { data } = await axiosInstace.get(`/document/${roomId}`);
  return data.data; // ApiResponse wraps payload in `data`
};

const updateDocument = async (roomId, payload) => {
  const { data } = await axiosInstace.patch(
    `/document/${roomId}`,
    payload,
  );
  return data.data;
};

// Fallback HTTP path for submitting a single delta if the socket is unavailable.
const submitDeltaFallback = async (delta) => {
  const { data } = await axiosInstace.post(`/editor/delta`, delta);
  return data.data;
};

// Fallback HTTP path for submitting an atomic batch (delete+insert pair).
const submitDeltaBatchFallback = async (deltas) => {
  const { data } = await axiosInstace.post(`/editor/delta-batch`, deltas);
  return data.data;
};

export default {
  getDocument,
  updateDocument,
  submitDeltaFallback,
  submitDeltaBatchFallback,
};
