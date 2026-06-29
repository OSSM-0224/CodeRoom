import ApiResponse from "./ApiResponse.js";

const sendResponse = (
  res,
  statusCode = 200,
  message = "Success",
  data = null
) => {
  return res.status(statusCode).json(
    new ApiResponse(statusCode, message, data)
  );
};

export default sendResponse;