const OnlineStatus = ({ online }) => {
    return (
        <span>
            {online ? "🟢 Online" : "⚪ Offline"}
        </span>
    );
};

export default OnlineStatus;