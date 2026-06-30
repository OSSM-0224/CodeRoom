import { z } from "zod";
import logger from "../logger/logger.js";
import participantModel from "../models/Participant.js";
import { joinRoomService } from "../services/room.service.js";

const joinRoomSchema = z.object({
    roomCode: z.string(),
    username: z.string(),
});

const leaveRoomSchema = z.object({
    roomId: z.string(),
    username: z.string(),
});

const closeRoomSchema = z.object({
    roomId: z.string(),
});

const registerRoomSocketHandlers = (io, socket) => {

    // =======================
    // JOIN ROOM
    // =======================

    socket.on("room:join", async (payload, ackCallback) => {

        try {

            const parsed = joinRoomSchema.safeParse(payload);
            console.log("ROOM JOIN EVENT:", payload);


            if (!parsed.success) {
                return ackCallback?.({
                    success: false,
                    error: "Invalid join payload",
                });
            }

            const { roomCode, username } = parsed.data;

            const { room } = await joinRoomService({
                roomCode,
                username,
                socketId: socket.id,
            });

            socket.join(room._id.toString());

            logger.info(`${username} joined ${room.roomCode}`);

            ackCallback?.({
                success: true,
                roomId: room._id,
            });

        } catch (error) {

            logger.error(error.message);

            ackCallback?.({
                success: false,
                error: error.message,
            });

        }

    });

    // =======================
    // LEAVE ROOM
    // =======================

    socket.on("room:leave", async (payload, ackCallback) => {

        try {

            const parsed = leaveRoomSchema.safeParse(payload);

            if (!parsed.success) {
                return ackCallback?.({
                    success: false,
                    error: "Invalid leave payload",
                });
            }

            const { roomId, username } = parsed.data;

            socket.leave(roomId);

            await participantModel.findOneAndDelete({
                socketId: socket.id,
            });

            const participants = await participantModel.find({
                roomId,
            });

            io.to(roomId).emit("PARTICIPANTS_UPDATED", participants);

            logger.info(`${username} left ${roomId}`);

            ackCallback?.({
                success: true,
            });

        } catch (error) {

            logger.error(error.message);

            ackCallback?.({
                success: false,
                error: error.message,
            });

        }

    });

    // =======================
    // CLOSE ROOM
    // =======================

    socket.on("room:close", (payload, ackCallback) => {

        try {

            const parsed = closeRoomSchema.safeParse(payload);

            if (!parsed.success) {
                return ackCallback?.({
                    success: false,
                    error: "Invalid close payload",
                });
            }

            const { roomId } = parsed.data;

            io.to(roomId).emit("room:closed", {
                roomId,
            });

            logger.info(`Room Closed ${roomId}`);

            ackCallback?.({
                success: true,
            });

        } catch (error) {

            logger.error(error.message);

            ackCallback?.({
                success: false,
                error: error.message,
            });

        }

    });

};

export default registerRoomSocketHandlers;