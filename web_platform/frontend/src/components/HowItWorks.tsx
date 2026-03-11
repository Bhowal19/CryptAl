import React from "react";
import CryptoApp from "./CryptoApp";

export default function HowItWorks() {
    return (
        <section className="relative overflow-hidden w-full bg-background-primary py-32 flex flex-col items-center">
            <div className="max-w-7xl mx-auto w-full px-6 flex flex-col items-center z-10 relative">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center">
                    <div className="text-tiny px-4 py-1 bg-background-secondary border border-white/10 rounded-full text-text-secondary mb-6 inline-block">
                        Platform
                    </div>
                    <h2 className="text-h3 font-semibold text-text-primary">
                        How CryptAl Works
                    </h2>
                    <p className="text-small text-text-secondary max-w-2xl mx-auto mt-4">
                        Secure, high-performance cryptographic processing executed entirely within your authorized client perimeter.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="w-full mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Large Card: Engine Overview */}
                    <div className="relative overflow-hidden bg-background-secondary/60 backdrop-blur-md border border-white/5 rounded-2xl p-8 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-accent/30 before:absolute before:inset-0 before:rounded-2xl before:bg-white/[0.02] before:pointer-events-none md:col-span-2 md:row-span-2 flex flex-col">
                        <h3 className="text-h6 font-semibold text-text-primary mb-2 z-10">
                            Encryption Engine Overview
                        </h3>
                        <p className="text-small text-text-secondary z-10">
                            Our core runtime intercepts data streams, fragmenting and securing them using robust, enterprise-grade AES algorithms locally before any network calls are ever instantiated.
                        </p>

                        <div className="mt-8 w-full">
                            <CryptoApp compact />
                        </div>
                    </div>

                    {/* Right Top Card: Algorithms */}
                    <div className="relative overflow-hidden bg-background-secondary/60 backdrop-blur-md border border-white/5 rounded-2xl p-8 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-accent/30 before:absolute before:inset-0 before:rounded-2xl before:bg-white/[0.02] before:pointer-events-none md:col-span-1 flex flex-col justify-between">
                        <div className="z-10 mb-6">
                            <h3 className="text-h6 font-semibold text-text-primary mb-4">
                                6 Symmetric & Asymmetric Algorithms
                            </h3>
                            <p className="text-small text-text-secondary mb-6">
                                Native support for enterprise-grade cryptographic protocols via the WebCrypto API.
                            </p>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-3 z-10">
                            {['AES', 'DES', 'Twofish', 'ElGamal', 'Playfair', 'Hill'].map((tag) => (
                                <div key={tag} className="bg-background-primary border border-white/10 rounded-lg px-3 py-2 text-tiny text-text-secondary transition-colors duration-200 hover:border-accent/40 text-center">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Middle Card: Real-Time Processing */}
                    <div className="relative overflow-hidden bg-background-secondary/60 backdrop-blur-md border border-white/5 rounded-2xl p-8 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-accent/30 before:absolute before:inset-0 before:rounded-2xl before:bg-white/[0.02] before:pointer-events-none md:col-span-1 flex flex-col justify-between">
                        <div className="z-10 mb-6">
                            <h3 className="text-h6 font-semibold text-text-primary mb-3">
                                Real-Time Cryptographic Processing
                            </h3>
                            <p className="text-small text-text-secondary mb-6">
                                Hardware-accelerated WASM & WebCrypto routines provide sub-millisecond document encryption processing speeds.
                            </p>
                        </div>

                        <div className="z-10">
                            <div className="w-8 h-1 bg-accent/50 rounded-full mb-4"></div>
                            <div className="w-full bg-background-primary border border-white/10 rounded-xl p-4 text-text-primary font-semibold text-center">
                                Encrypted in &lt; 0.02s
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: 3 Feature Blocks */}
                    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        {/* Feature 1 */}
                        <div className="relative overflow-hidden bg-background-secondary/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-accent/30 flex flex-col justify-between">
                            <div>
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6 text-accent">
                                    <span className="material-symbols-outlined text-[24px]">cleaning_services</span>
                                </div>
                                <h4 className="text-h6 font-semibold text-text-primary mb-3">Auto Clear & Reset</h4>
                                <p className="text-small text-text-secondary">The engine automatically purges decrypted memory and resets cryptographic states after each session.</p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="relative overflow-hidden bg-background-secondary/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-accent/30 flex flex-col justify-between">
                            <div>
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6 text-accent">
                                    <span className="material-symbols-outlined text-[24px]">timer</span>
                                </div>
                                <h4 className="text-h6 font-semibold text-text-primary mb-3">Self-Destruct Timer</h4>
                                <p className="text-small text-text-secondary mb-6">Encrypted payloads can expire automatically based on user-defined session timers.</p>
                            </div>
                            <div className="inline-block px-3 py-1 rounded-full border border-accent/30 text-accent text-xs font-medium w-max">
                                Session-bound
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="relative overflow-hidden bg-background-secondary/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-[4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] hover:border-accent/30 flex flex-col justify-between">
                            <div>
                                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-6 text-accent">
                                    <span className="material-symbols-outlined text-[24px]">shield_lock</span>
                                </div>
                                <h4 className="text-h6 font-semibold text-text-primary mb-3">Zero Data Retention</h4>
                                <p className="text-small text-text-secondary mb-6">No server persistence. No logs. No storage. All encryption executes client-side.</p>
                            </div>
                            <div className="text-accent font-semibold text-small">
                                0% Stored
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
