import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hydrateDocument,
  applyLocalContent,
  applyRemoteContent,
  setStatus,
} from "../slice/editorSlice";
import { buildDeltaFromDiff, applyDeltaSequence } from "./deltaHelpers";
import editorApi from "../api/editorApi";
import { getSocket } from "../../../socket/socket"; // assumes existing shared socket client setup

/**
 * useEditor
 * ----------
 * Central hook powering the Code Editor component.
 * Responsibilities:
 * 1. On mount: fetch the latest document for the room (GET /api/document/:roomId)
 *    and hydrate Redux state.
 * 2. Listen for "editor:delta" socket events from other users — each event
 *    carries an ORDERED BATCH of 1-2 minimal deltas — and apply them
 *    locally in sequence via applyDeltaSequence (never overwrites the
 *    whole doc, and a delete+insert pair is applied atomically so a
 *    remote selection-replace never flickers through an intermediate state).
 * 3. Expose `onLocalChange` for the editor component to call on every
 *    keystroke — diffs old vs new content into a minimal delta batch,
 *    emits it over the socket, and updates the "saved"/"unsaved" status.
 * Why a hook instead of logic inside the component:
 * - Keeps the React component focused purely on rendering/UI.
 * - Makes the sync logic independently testable and reusable (e.g. if a
 *   future "diff view" component also needs document state).
 */
const useEditor = (roomId, userId) => {
  const dispatch = useDispatch();
  const { content, status, version, language, lineCount } = useSelector(
    (state) => state.editor,
  );

  // Ref mirrors `content` for use inside the socket callback closure,
  // avoiding stale-closure bugs without re-subscribing the listener
  // on every keystroke.
  const contentRef = useRef(content);
  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  // 1. Initial document fetch on mount / room change.
  useEffect(() => {
    if (!roomId) return;

    let isMounted = true;

    const fetchDocument = async () => {
      try {
        const document = await editorApi.getDocument(roomId);
        if (!isMounted) return;
        dispatch(
          hydrateDocument({
            roomId,
            content: document.content,
            language: document.language,
            version: document.version,
          }),
        );
      } catch (error) {
        dispatch(setStatus("unsaved"));
        // eslint-disable-next-line no-console
        console.error("Failed to load document:", error.message);
      }
    };

    fetchDocument();

    return () => {
      isMounted = false;
    };
  }, [roomId, dispatch]);

  // 2. Listen for remote delta batches.
  useEffect(() => {
    if (!roomId) return;

    const socket = getSocket();

    const handleRemoteDelta = ({ deltas, version: newVersion }) => {
      if (!Array.isArray(deltas) || deltas.length === 0) return;

      // Ignore echoes of our own edits (shouldn't normally arrive since
      // the server uses socket.to() which excludes the sender, but this
      // guard is cheap insurance).
      if (deltas[0].userId === userId) return;

      // Apply the batch IN ORDER against the current local content, so a
      // remote [delete, insert] pair lands as one atomic replace instead
      // of two separate renders.
      const updatedContent = applyDeltaSequence(contentRef.current, deltas);
      dispatch(
        applyRemoteContent({ content: updatedContent, version: newVersion }),
      );
    };

    socket.on("editor:delta", handleRemoteDelta);

    return () => {
      socket.off("editor:delta", handleRemoteDelta);
    };
  }, [roomId, userId, dispatch]);

  // 3. Called by the editor component on every change event.
  const onLocalChange = useCallback(
    (newContent) => {
      const oldContent = contentRef.current;
      dispatch(applyLocalContent(newContent));

      // Always a minimal array: [], [insert], [delete], or [delete, insert].
      const deltas = buildDeltaFromDiff(oldContent, newContent, {
        userId,
        roomId,
      });
      if (deltas.length === 0) return; // no actual change (e.g. cursor move only)

      const socket = getSocket();
      socket.emit("editor:delta", deltas, (ack) => {
        if (ack?.success) {
          dispatch(setStatus("saved"));
        } else {
          dispatch(setStatus("unsaved"));
          // Fallback to HTTP if the socket ack failed (e.g. transient drop).
          // Use the batch endpoint when there are 2 deltas so the replace
          // stays atomic even over the fallback path.
          const fallback =
            deltas.length === 2
              ? editorApi.submitDeltaBatchFallback(deltas)
              : editorApi.submitDeltaFallback(deltas[0]);

          fallback.catch(() => {
            // Both paths failed — leave status as "unsaved" so the UI
            // reflects reality; user can retry by typing again.
          });
        }
      });
    },
    [dispatch, roomId, userId],
  );

  return {
    content,
    status,
    version,
    language,
    lineCount,
    onLocalChange,
  };
};

export default useEditor;
