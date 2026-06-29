import { useCreateRoomHook } from "../hooks/useRoom";


function CreateRoom() {

    const {
        register,
        handleSubmit,
        errors,
        createRoomData, } = useCreateRoomHook()

    return (
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
                Create Room
            </h2>
            <form onSubmit={handleSubmit(createRoomData)}>

                <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Room Name
                    </label>

                    <input
                        {...register("name", {
                            required: "Room name is required",
                            minLength: {
                                value: 3,
                                message: "Minimum 3 characters required",
                            },
                        })}
                        type="text"
                        placeholder="Enter room name"
                        className={`w-full rounded-lg border px-4 py-3 outline-none transition-all duration-300 ${errors.name
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                            }`}
                    />

                    <p
                        className={`overflow-hidden text-sm text-red-500 transition-all duration-300 ${errors.name ? "mt-2 max-h-10 opacity-100" : "max-h-0 opacity-0"
                            }`}
                    >
                        {errors.name?.message}
                    </p>
                </div>
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Host Name
                    </label>

                    <input
                        {...register("hostname", {
                            required: "Host name is required",
                            minLength: {
                                value: 3,
                                message: "Minimum 3 characters required",
                            },
                        })}
                        type="text"
                        placeholder="Enter your name"
                        className={`w-full rounded-lg border px-4 py-3 outline-none transition-all duration-300 ${errors.hostname
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                            }`}
                    />

                    <p
                        className={`overflow-hidden text-sm text-red-500 transition-all duration-300 ${errors.hostname ? "mt-2 max-h-10 opacity-100" : "max-h-0 opacity-0"
                            }`}
                    >
                        {errors.hostname?.message}
                    </p>
                </div>

                <button className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
                    Create Room
                </button>
            </form>

        </div>
    );
}

export default CreateRoom;