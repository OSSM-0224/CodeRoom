import { useJoinRoomHook } from "../hooks/useRoom";


function JoinRoom() {

    const { register, handleSubmit, errors, joinRoomData } = useJoinRoomHook()

    return (
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
                Join Room
            </h2>

            <form
                onSubmit={handleSubmit(joinRoomData)}
                className="space-y-5"
            >
                {/* Room ID */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Room ID
                    </label>

                    <input
                        {...register("roomCode", {
                            required: "Room ID is required",
                        })}
                        type="text"
                        placeholder="Enter Room ID"
                        className={`w-full rounded-lg border px-4 py-3 outline-none transition-all duration-300 ${errors.roomId
                            ? "border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                            }`}
                    />

                    {errors.roomCode && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.roomCode.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Your Name
                    </label>

                    <input
                        {...register("username", {
                            required: "Name is required",
                        })}
                        type="text"
                        placeholder="Enter your name"
                        className={`w-full rounded-lg border px-4 py-3 outline-none transition-all duration-300 ${errors.username
                            ? "border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                            }`}
                    />

                    {errors.username && (
                        <p className="mt-2 text-sm text-red-500">
                            {errors.username.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-green-700 active:scale-95"
                >
                    Join Room
                </button>
            </form>
        </div>
    );
}

export default JoinRoom;