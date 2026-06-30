import documentModel from "../models/Document.js";
import ApiError from "../utils/ApiError.js";

export const createDocument = async (roomId) => {

    if (!roomId) {
        throw new ApiError(400, "Room id is required");
    }

    const document = await documentModel.create({
        roomId,
        content: "",
    });

    return document;
}

export const getDocument = async (roomId) => {

    const document = await documentModel.findOne({ roomId });

    if (!document) {
        throw new ApiError(404, "Document not found");
    }

    return document;
}

export const patchDocument = async ({ roomId, content }) => {

    const document = await documentModel.findOneAndUpdate(
        { roomId },
        { content },
        { new: true }
    );

    if (!document) {
        throw new ApiError(404, "Document not found");
    }

    return document;
};
