const TypingIndicator = ({ isTyping, username }) => {
    if (!isTyping) return null;

    return <p>{username} is typing...</p>;
};

export default TypingIndicator;