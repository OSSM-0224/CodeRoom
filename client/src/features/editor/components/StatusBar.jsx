import {
    Code2,
    Users,
    Wifi,
    Clock3,
    CheckCircle2,
    Save,
} from "lucide-react";

function StatusBar({ handleSave, participants }) {
    return (
        <footer className="flex h-10 items-center justify-between border-t border-slate-700 bg-[#0F172A] px-4 text-xs text-gray-300">

            {/* Left */}
            <div className="flex items-center gap-6">

                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-md bg-[#57F287] px-3 py-1 text-black"
                >
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
                    <Wifi className="h-4 w-4 text-green-400" />
                    <span className="font-medium text-green-400">
                        Connected
                    </span>
                </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-6">

                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span>{participants.length} Participants</span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-yellow-400" />
                    <span>120 ms</span>
                </div>

                <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-green-400" />
                    <span className="font-medium text-green-400">
                        Connected
                    </span>
                </div>

            </div>

        </footer>
    );
}

export default StatusBar;