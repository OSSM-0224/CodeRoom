import {
    Code2,
    Users,
    Wifi,
    Clock3,
    CheckCircle2,
} from "lucide-react";

function StatusBar() {
    return (
        <footer className="flex h-10 items-center justify-between border-t border-slate-700 bg-[#0F172A] px-4 text-xs text-gray-300">

            {/* Left */}

            <div className="flex items-center gap-6">

                <div className="flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-[#57F287]" />
                    <span>JavaScript</span>
                </div>

                <div>
                    Ln 42, Col 12
                </div>

                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span>Saved</span>
                </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-6">

                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span>3 Participants</span>
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