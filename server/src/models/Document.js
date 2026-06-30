import mongoose from "mongoose";
const documentSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      unique: true, // one document per room
      index: true,
    },
    content: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "javascript",
    },
    version: {
      type: Number,
      default: 0,
    },
    lastModified: {
      type: Number, // epoch ms, NOT a Date — must compare directly with delta.timestamp
      default: () => Date.now(),
    },
  },
  {
    timestamps: true, // createdAt / updatedAt for auditing, separate from lastModified
  },
);

const Document = mongoose.model("Document", documentSchema);

export default Document;
