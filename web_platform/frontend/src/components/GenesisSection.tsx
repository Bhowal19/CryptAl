"use client";

import React, { useEffect, useRef, useState } from 'react';

const clamp = (min: number, max: number, val: number) => Math.min(Math.max(val, min), max);

export default function GenesisSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isLocked, setIsLocked] = useState(false);
    const [progress, setProgress] = useState(0);
    const [manualStage, setManualStage] = useState<null | "threat" | "architecture">(null);

    // STEP 3 — Detect When Section Reaches Viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsLocked(true);
                    document.body.style.overflow = "hidden";
                }
            },
            { threshold: 0.6 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // STEP 4 — Handle Scroll Progress When Locked
    useEffect(() => {
        if (!isLocked) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            setProgress(prev => {
                const next = prev + e.deltaY * 0.0008;

                if (next >= 1) {
                    document.body.style.overflow = "auto";
                    setIsLocked(false);
                    return 1;
                }

                // Added to allow unlocking when scrolling backwards
                if (next <= 0 && e.deltaY < 0) {
                    document.body.style.overflow = "auto";
                    setIsLocked(false);
                    return 0;
                }

                if (next <= 0) return 0;

                // Clear manual stage if user forces a scroll
                if (next !== prev) {
                    setManualStage(null);
                }

                return next;
            });
        };

        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [isLocked]);

    // Determine Stage
    let activeStage;
    if (manualStage === "threat") {
        activeStage = 2;
    } else if (manualStage === "architecture") {
        activeStage = 3;
    } else {
        activeStage =
            progress < 0.33 ? 1 :
                progress < 0.66 ? 2 :
                    3;
    }

    return (
        <section id="genesis" ref={sectionRef} className="relative h-screen">
            <div className="flex h-full items-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-16">

                    {/* Left Side: Large Title */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-bold leading-none tracking-tighter text-text-primary transition-all duration-700">
                            GENESIS<br />
                            OF<br />
                            CRYPTAL
                        </h2>
                        <div className="mt-8 w-1 absolute left-0 top-1/2 -translate-y-1/2 h-32 bg-accent/50 blur-[2px]" />

                        {/* Temporary Debug Display */}
                        <div className="mt-8 font-mono text-accent text-xl">
                            Progress: {progress.toFixed(2)} | Stage: {activeStage}
                        </div>
                    </div>

                    {/* Right Side: Dynamic Story Block */}
                    <div className="relative flex flex-col justify-center h-[500px] w-full max-w-[500px]">

                        {/* Interactive Toggles */}
                        <div className="flex gap-4 mb-16 z-50">
                            <button
                                onClick={() => setManualStage("threat")}
                                className={`px-4 py-2 rounded-full border border-white/10 text-sm transition-all hover:bg-white/5 ${manualStage === "threat" ? "bg-white/5 text-text-primary" : "text-text-secondary"}`}
                            >
                                See the Threat
                            </button>
                            <button
                                onClick={() => setManualStage("architecture")}
                                className={`px-4 py-2 rounded-full border border-white/10 text-sm transition-all hover:bg-white/5 ${manualStage === "architecture" ? "bg-white/5 text-text-primary" : "text-text-secondary"}`}
                            >
                                See the Architecture
                            </button>
                        </div>

                        {/* Stages Container */}
                        <div className="relative w-full h-[400px]">

                            {/* Stage 1: The Problem */}
                            <div
                                className={`absolute inset-0 flex flex-col justify-center space-y-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                                        ${activeStage === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12 pointer-events-none'}`}
                            >
                                <p className={`text-2xl text-text-primary leading-relaxed transition-all duration-700 font-medium
                                        ${progress > 0.05 ? 'opacity-100 translate-y-0 animate-[textPulse_1.5s_ease-out_1]' : 'opacity-0 translate-y-8'}`}>
                                    Most encryption tools require trust.
                                </p>
                                <p className={`text-2xl text-text-secondary leading-relaxed transition-all duration-700
                                        ${progress > 0.15 ? 'opacity-70 translate-y-0 animate-[textPulse_1.5s_ease-out_1]' : 'opacity-0 translate-y-8'}`}>
                                    Trust requires surrender.
                                </p>
                                <p className={`text-2xl text-accent/80 font-medium leading-relaxed transition-all duration-700
                                        ${progress > 0.25 ? 'opacity-100 translate-y-0 animate-[textPulse_1.5s_ease-out_1]' : 'opacity-0 translate-y-8'}`}>
                                    Surrender breaks privacy.
                                </p>

                                <style jsx>{`
                                        @keyframes textPulse {
                                            0% { opacity: 0; filter: brightness(1); }
                                            50% { opacity: 0.5; filter: brightness(1.5); }
                                            100% { opacity: 1; filter: brightness(1); }
                                        }
                                    `}</style>
                            </div>

                            {/* Stage 2: The Realization */}
                            <div
                                className={`absolute inset-0 flex flex-col justify-center space-y-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                                            ${activeStage === 2 ? 'opacity-100 translate-y-0' : activeStage < 2 ? 'opacity-0 translate-y-12 pointer-events-none' : 'opacity-0 -translate-y-12 pointer-events-none'}`}
                            >
                                <p className="text-2xl text-text-secondary leading-relaxed">
                                    We realized that an invisible chain of custody is created every time data leaves your device.
                                </p>

                                <div className="mt-8 p-6 border border-white/5 rounded-xl bg-background-secondary/30 relative">
                                    {/* The Glow based on progress or manual Stage 2*/}
                                    <div
                                        className="absolute inset-0 bg-red-500/10 blur-xl transition-opacity duration-500 rounded-xl"
                                        style={{ opacity: progress > 0.5 || manualStage === 'threat' ? 1 : 0 }}
                                    />

                                    <div className="relative z-10 flex items-center justify-between">
                                        <div className="px-6 py-3 border border-white/20 rounded-md text-text-primary bg-background-primary z-20">
                                            Client
                                        </div>

                                        {/* The Connecting Line Container */}
                                        <div className="flex-1 relative flex items-center justify-center mx-4 h-full">
                                            {/* Intact Line (Fades out) */}
                                            <div
                                                className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[1px] bg-accent/60 transition-all duration-500"
                                                style={{
                                                    opacity: progress > 0.45 || manualStage === 'threat' ? 0 : 1,
                                                    transform: `translateY(-50%) scaleX(${progress > 0.45 || manualStage === 'threat' ? 0 : 1})`
                                                }}
                                            />

                                            {/* Broken Status Text (Scales in) */}
                                            <div
                                                className="absolute px-3 py-1 bg-background-primary border border-red-500/30 text-red-400 text-xs rounded-full uppercase tracking-widest transition-all duration-500"
                                                style={{
                                                    opacity: progress > 0.5 || manualStage === 'threat' ? 1 : 0,
                                                    transform: `scale(${progress > 0.5 || manualStage === 'threat' ? 1 : 0.8})`
                                                }}
                                            >
                                                Trust Model Failed
                                            </div>
                                        </div>

                                        <div className="px-6 py-3 border border-red-500/20 rounded-md text-text-primary bg-background-primary z-20 transition-colors duration-500"
                                            style={{ borderColor: progress > 0.5 || manualStage === 'threat' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.2)' }}>
                                            Server
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stage 3: The Architecture Solution */}
                            <div
                                className={`absolute inset-0 flex flex-col justify-center space-y-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                                            ${activeStage === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
                            >
                                <p className="text-2xl text-text-primary font-medium tracking-wide">
                                    The solution is isolation.
                                </p>

                                <div className="mt-4 p-8 border border-accent/20 rounded-xl bg-background-secondary/50 relative overflow-hidden group">
                                    {/* Subtle Blue Glow */}
                                    <div className="absolute inset-0 bg-accent/5 blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-1000" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="flex gap-1.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                                                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                                            </div>
                                            <div className="text-xs tracking-widest text-text-secondary uppercase">Browser Runtime</div>
                                        </div>

                                        {/* Flow Diagram */}
                                        <div className="flex items-center justify-between gap-4 w-full relative">

                                            {/* Background Flow Track */}
                                            <div className="absolute top-1/2 left-16 right-16 -translate-y-1/2 h-[1px] bg-white/5 z-0" />

                                            {/* Animated Particles container */}
                                            <div className="absolute top-1/2 left-20 right-20 -translate-y-1/2 overflow-hidden h-4 z-0 flex items-center">
                                                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-[particleFlow_2s_linear_infinite]" style={{ animationDelay: '0s' }} />
                                                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-[particleFlow_2s_linear_infinite]" style={{ animationDelay: '1s' }} />
                                            </div>

                                            <div className="px-4 py-2 border border-white/10 rounded-lg text-text-primary bg-background-primary z-10 text-sm shadow-xl">
                                                User
                                            </div>

                                            <div className="px-5 py-3 border border-accent/40 bg-accent/10 rounded-lg text-text-primary z-10 text-center shadow-[0_0_15px_rgba(var(--color-accent),0.1)]">
                                                <span className="text-sm font-medium">Encryption Engine</span>
                                            </div>

                                            <div className="px-4 py-2 border border-white/10 rounded-lg text-text-primary bg-background-primary z-10 text-sm shadow-xl flex items-center gap-2">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                                Output
                                            </div>
                                        </div>

                                        {/* Labels */}
                                        <div className="flex justify-between items-center mt-8 border-t border-white/5 pt-4">
                                            <div className="text-xs tracking-widest text-accent uppercase flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                                                Encrypted Locally
                                            </div>
                                            <div className="text-xs tracking-widest text-text-secondary/70 uppercase">
                                                Zero Server Involvement
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xl text-text-secondary leading-relaxed opacity-70">
                                    Cryptal builds a local fortress. Your data is locked before it ever hits the network.
                                </p>

                                <style jsx>{`
                                        @keyframes particleFlow {
                                            0% { transform: translateX(0); opacity: 0; }
                                            10% { opacity: 1; }
                                            90% { opacity: 1; }
                                            100% { transform: translateX(250px); opacity: 0; }
                                        }
                                        
                                        @keyframes driftUp {
                                            0% { transform: translateY(0); }
                                            100% { transform: translateY(-100%); }
                                        }
                                        
                                        .drift-bg {
                                            background-image: radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
                                            background-size: 60px 60px;
                                            opacity: 0.15;
                                        }
                                    `}</style>
                            </div>

                        </div> {/* END Stages Container */}
                    </div>

                </div>

                {/* Animated Constellation Background Layer */}
                <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden">
                    <div
                        className="drift-bg absolute top-0 left-0 right-0 h-[200%] animate-[driftUp_60s_linear_infinite]"
                    />
                </div>
            </div>
        </section>
    );
}
