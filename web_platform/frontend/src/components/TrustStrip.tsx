import React from "react";

export default function TrustStrip() {
    const defaultLogos = [
        "FinTech Corp",
        "HealthSecure",
        "DataDefend",
        "CloudVault",
        "CyberNet"
    ];

    return (
        <section className="relative w-full bg-background-primary py-20">
            <div className="max-w-6xl mx-auto px-6 text-center">

                {/* Top Pill */}
                <div className="text-tiny px-4 py-1 bg-background-secondary border border-white/10 rounded-full text-text-secondary inline-block mb-6">
                    Trusted
                </div>

                {/* Heading */}
                <h2 className="text-h4 font-semibold text-text-primary mb-12">
                    Trusted by 300+ businesses
                </h2>

                {/* Logo Row */}
                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-70">
                    {defaultLogos.map((logo, index) => (
                        <div
                            key={index}
                            className="text-text-secondary text-small font-medium hover:opacity-100 transition-opacity duration-300 select-none"
                        >
                            {logo}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
