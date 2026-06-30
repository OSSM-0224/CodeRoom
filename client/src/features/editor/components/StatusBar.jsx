import {
    Users,
    Wifi,
    Clock3,
    Save,
    Pencil,
} from "lucide-react";

function StatusBar({
    handleSave,
    participants,
    connected,
    typingUser,
}) {

    return (
        <footer className="flex h-12 items-center justify-between border-t border-slate-700 bg-[#0F172A] px-4 text-xs text-gray-300">
            <div className="flex items-center gap-6">
                <button onClick={handleSave} className="flex items-center gap-2 rounded-md bg-[#57F287] px-3 py-1 text-black transition hover:bg-[#45df72]">
                    <Save className="h-4 w-4" />
                    Save
                </button>

                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span>{participants.length} Participants</span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-yellow-400" />
                    <span>120 ms</span>
                </div>

                <div className="flex items-center gap-2">
                    <Wifi
                        className={`h-4 w-4 ${connected
                            ? "text-green-400"
                            : "text-red-400"
                            }`}
                    />

                    <span
                        className={`font-medium ${connected
                            ? "text-green-400"
                            : "text-red-400"
                            }`}
                    >
                        {connected ? "Connected" : "Offline"}
                    </span>
                </div>

            </div>

            {/* Right */}
            <div className="flex items-center gap-6">

                {typingUser && (
                    <div className="flex items-center gap-2 text-[#57F287]">
                        <Pencil className="h-4 w-4" />
                        <span>{typingUser} is typing...</span>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span>{participants.length} participants</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-yellow-400" />
                    <span>{lineCount} lines</span>
                </div>
                <div className="flex items-center gap-2">
                    <Wifi
                        className={`h-4 w-4 ${connected
                            ? "text-green-400"
                            : "text-red-400"
                            }`}
                    />

                    <span
                        className={`font-medium ${connected
                            ? "text-green-400"
                            : "text-red-400"
                            }`}
                    >
                        {connected ? "Connected" : "Offline"}
                    </span>
                </div>
            </div>
            <div className="text-slate-400">Live collaboration ready</div>
        </footer>
    );
}

export default StatusBar;