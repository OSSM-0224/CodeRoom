
import { getDocument, patchDocument } from "../repositories/document.repository.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getDocumentController = asyncHandler(async (req, res) => {

    const { roomId } = req.params;

    const document = await getDocument(roomId);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Document fetched successfully",
            document
        )
    );

});


export const patchDocumentController = asyncHandler(async (req, res) => {

    const { content } = req.body;
    const { roomId } = req.params;

    const document = await patchDocument({
        roomId,
        content,
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            "Document updated successfully",
            document
        )
    );
});