import { Users, LogIn } from "lucide-react";
import { useJoinRoomHook } from "../hooks/useRoom";

function JoinRoom() {
    const { register, handleSubmit, errors, joinRoomData } = useJoinRoomHook();

    return (
        <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-[#1B2433] p-8 shadow-2xl">

            {/* Header */}
            <div className="mb-8 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <LogIn className="h-7 w-7 text-blue-300" />

                    <h2 className="text-3xl font-bold text-white">
                        Join a Room
                    </h2>
                </div>

                <Users className="h-10 w-10 text-slate-600" />

            </div>

            <form
                onSubmit={handleSubmit(joinRoomData)}
                className="space-y-6"
            >

                {/* Room Code */}

                <div>

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[3px] text-gray-400">
                        Room Code
                    </label>

                    <input
                        {...register("roomCode", {
                            required: "Room Code is required",
                        })}
                        type="text"
                        placeholder="XXX-XXX-XXX"
                        className={`w-full rounded-xl border bg-[#111827] px-4 py-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 ${errors.roomCode
                            ? "border-red-500"
                            : "border-[#2D3748] focus:border-blue-400"
                            }`}
                    />

                    {errors.roomCode && (
                        <p className="mt-2 text-sm text-red-400">
                            {errors.roomCode.message}
                        </p>
                    )}

                </div>

                {/* Username */}

                <div>

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[3px] text-gray-400">
                        Username
                    </label>

                    <input
                        {...register("username", {
                            required: "Username is required",
                        })}
                        type="text"
                        placeholder="anonymous_coder"
                        className={`w-full rounded-xl border bg-[#111827] px-4 py-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 ${errors.username
                            ? "border-red-500"
                            : "border-[#2D3748] focus:border-blue-400"
                            }`}
                    />

                    {errors.username && (
                        <p className="mt-2 text-sm text-red-400">
                            {errors.username.message}
                        </p>
                    )}

                </div>

                <button
                    type="submit"
                    className="w-full rounded-full bg-linear-to-r from-blue-300 to-blue-600 py-4 text-lg font-bold text-slate-900 transition-all duration-300 hover:scale-[1.02]"
                >
                    Join Session
                </button>

                <p className="text-center text-sm italic text-gray-400">
                    Enter the secret code shared by your host.
                </p>

            </form>

        </div>
    );
}

export default JoinRoom;