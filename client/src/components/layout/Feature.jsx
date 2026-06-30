import {
    Monitor,
    Users,
    Shield,
    RefreshCw,
} from "lucide-react";

function Features() {

    const features = [
        {
            icon: <Monitor className="h-6 w-6 text-[#57F287]" />,
            title: "Real-time Collab",
            description: "Sync edits in milliseconds.",
        },
        {
            icon: <Users className="h-6 w-6 text-[#A5C8FF]" />,
            title: "Live Presence",
            description: "See who is coding where.",
        },
        {
            icon: <Shield className="h-6 w-6 text-[#FCA5A5]" />,
            title: "Secure Rooms",
            description: "E2E encrypted workspace.",
        },
        {
            icon: <RefreshCw className="h-6 w-6 text-[#57F287]" />,
            title: "Instant Sync",
            description: "Always on the latest commit.",
        },
    ];

    return (
        <section className="mx-auto mt-24 w-full max-w-5xl px-3">

            <div className="mb-12 text-center">

                <h2 className="text-4xl font-bold text-white">
                    Engineered for Flow
                </h2>

                <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-[#57F287]" />

            </div>

            <div className="grid gap-6 md:grid-cols-2">

                {features.map((feature, index) => (

                    <div
                        key={index}
                        className="rounded-2xl border border-slate-700 bg-[#1B2433] p-6 transition-all duration-300 hover:border-[#57F287] hover:-translate-y-1"
                    >

                        <div className="mb-5">
                            {feature.icon}
                        </div>

                        <h3 className="mb-2 text-lg font-semibold text-white">
                            {feature.title}
                        </h3>

                        <p className="text-gray-400">
                            {feature.description}
                        </p>

                    </div>

                ))}

            </div>

        </section>
    );
}

export default Features;