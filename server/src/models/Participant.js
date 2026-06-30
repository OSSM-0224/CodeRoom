import mongoose from 'mongoose';


const participantSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },

        socketId: {
            type: String,
            required: true,
        },

        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const participantModel = mongoose.model("participants", participantSchema);

export default participantModel