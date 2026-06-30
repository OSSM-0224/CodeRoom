import { Code2, Feather, Menu } from "lucide-react";
import CreateRoom from "../features/room/components/CreateRoom";
import JoinRoom from "../features/room/components/JoinRoom";
import Features from "../components/layout/Feature";

function Home() {
    return (
        <div className="min-h-screen bg-linear-to-br from-[#071223] via-[#0B1428] to-[#10244A] text-white">

            {/* Navbar */}
            <nav className="flex items-center justify-between border-b border-slate-800 px-8 py-5">

                <div className="flex items-center gap-2">
                    <Code2 className="h-7 w-7 text-[#57F287]" />

                    <h1 className="text-3xl font-bold text-[#57F287]">
                        CodeRoom
                    </h1>
                </div>

                <Menu className="h-8 w-8 cursor-pointer text-gray-300" />

            </nav>

            {/* Hero */}

            <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-14">

                <h1 className="text-center text-6xl font-extrabold leading-tight">

                    Code Together.

                    <br />

                    <span className="text-[#57F287]">
                        Build Together.
                    </span>

                </h1>

                <p className="mt-6 max-w-2xl text-center text-xl text-gray-300">

                    Create or join coding rooms and collaborate with your team
                    in real time.

                </p>

                {/* Cards */}

                <div className="mt-16 flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:items-start">

                    <CreateRoom />

                    <JoinRoom />

                </div>

                <Features />

            </section>

        </div>
    );
}

export default Home;