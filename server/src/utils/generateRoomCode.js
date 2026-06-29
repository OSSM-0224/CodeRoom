const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const generateRooCode = (length = 6) => {
    let roomCode = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        roomCode += characters[randomIndex]
    }
    return roomCode
}

export default generateRooCode