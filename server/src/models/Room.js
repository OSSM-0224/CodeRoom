import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        roomCode: {
            type: String,
            required: true,
            unique: true,
        },

        roomName: {
            type: String,
            required: true,
            trim: true,
        },

        host: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);


const roomModel = mongoose.model("Room", roomSchema);

export default roomModel