import { useNavigate } from "react-router";
import { useCreateRoomHook } from "../hooks/useRoom";


function CreateRoom() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        errors,
        createRoomData, } = useCreateRoomHook();

    const handleSubmitRoom = async (data)=>{
        const room = await createRoomData(data);
        console.log(room)
        navigate(`editor/${room._id}`);
    }

    return (
        <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-[#1B2433] p-8 shadow-2xl">

            <div className="mb-8 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <div className="text-3xl">🚀</div>

                    <h2 className="text-3xl font-bold text-[#57F287]">
                        Create a Room
                    </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2D3748] bg-[#222D3F] text-2xl text-[#57F287]">
                    +
                </div>

            </div>

            <form
                onSubmit={handleSubmit(handleSubmitRoom)}
                className="space-y-6"
            >

                {/* Room Name */}

                <div>

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[3px] text-gray-400">
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
                        placeholder="e.g. Frontend-Squad"
                        className={`w-full rounded-xl border bg-[#111827] px-4 py-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300
                    ${errors.name
                                ? "border-red-500"
                                : "border-[#2D3748] focus:border-[#57F287]"
                            }`}
                    />

                    {errors.name && (
                        <p className="mt-2 text-sm text-red-400">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Host Name */}

                <div>

                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[3px] text-gray-400">
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
                        placeholder="your_dev_handle"
                        className={`w-full rounded-xl border bg-[#111827] px-4 py-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300
                    ${errors.hostname
                                ? "border-red-500"
                                : "border-[#2D3748] focus:border-[#57F287]"
                            }`}
                    />

                    {errors.hostname && (
                        <p className="mt-2 text-sm text-red-400">
                            {errors.hostname.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full rounded-full bg-[#57F287] py-4 text-lg font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-[#45df72]"
                >
                    Create New Room
                </button>

                <p className="text-center text-sm italic text-gray-400">
                    Generate a secure link to share with your team.
                </p>

            </form>

        </div>
    );

}

export default CreateRoom;