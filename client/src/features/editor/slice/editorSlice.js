import { createSlice } from "@reduxjs/toolkit";

/**
 * Editor Slice
 * -------------
 * Holds the local, client-side editor state. This is intentionally simple:
 * the server is the source of truth for persisted content; this slice is
 * what the React editor component renders from moment to moment.
 *
 * status values:
 *  - "connected"   socket is connected, no pending changes
 *  - "saved"       last delta was acknowledged + persisted
 *  - "unsaved"     local change made, ack not yet received
 *  - "typing"      user is actively typing (debounced separately in the hook)
 */
const initialState = {
  roomId: null,
  content: "",
  language: "javascript",
  version: 0,
  status: "connected", // connected | saved | unsaved | typing
  lineCount: 1,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    // Called once when the document is first fetched after joining a room.
    hydrateDocument: (state, action) => {
      const { roomId, content, language, version } = action.payload;
      state.roomId = roomId;
      state.content = content;
      state.language = language ?? state.language;
      state.version = version ?? 0;
      state.status = "saved";
      state.lineCount = content ? content.split("\n").length : 1;
    },

    // Called on every local keystroke, before the delta is sent to the server.
    applyLocalContent: (state, action) => {
      state.content = action.payload;
      state.status = "unsaved";
      state.lineCount = action.payload ? action.payload.split("\n").length : 1;
    },

    // Called when a remote delta arrives and is applied to local content.
    applyRemoteContent: (state, action) => {
      const { content, version } = action.payload;
      state.content = content;
      state.version = version;
      state.status = "saved";
      state.lineCount = content ? content.split("\n").length : 1;
    },

    setStatus: (state, action) => {
      state.status = action.payload;
    },

    setLanguage: (state, action) => {
      state.language = action.payload;
    },

    resetEditor: () => initialState,
  },
});

export const {
  hydrateDocument,
  applyLocalContent,
  applyRemoteContent,
  setStatus,
  setLanguage,
  resetEditor,
} = editorSlice.actions;

export default editorSlice.reducer;