import documentModel from "../models/Document.js";

const createDocument = async ({ roomId, language = "javascript" }) => {
    return await documentModel.create({
        roomId,
        language,
        content: "",
    });
};

const findByRoomId = async (roomId) => {
    return await documentModel.findOne({ roomId });
};

const replaceDocument = async (roomId, { content, language }) => {
    return await documentModel.findOneAndUpdate(
        { roomId },
        {
            content,
            language,
        },
        {
            new: true,
        }
    );
};

export default {
    createDocument,
    findByRoomId,
    replaceDocument,
};