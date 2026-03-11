"use client";

import { useState } from "react";

export default function HeroTool({ isBentoContext = false }: { isBentoContext?: boolean }) {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEncrypt = async () => {
        if (!input.trim()) return;

        setIsLoading(true);

        // Mock encryption (reverse string) logic
        setTimeout(() => {
            const reversed = input.split('').reverse().join('');
            // mock a base64 look to feel like encryption visually
            const mockEncrypted = btoa(reversed).substring(0, 128);
            setOutput(mockEncrypted);
            setIsLoading(false);
        }, 600);
    };

    return (
        <div className={`flex flex-col gap-3 w-full mx-auto relative z-20 ${isBentoContext ? 'max-w-full px-0' : 'max-w-[720px] px-4 md:px-0'}`}>
            <div className={`bg-background-secondary border border-accent/20 rounded-[var(--radius-lg)] shadow-md hover:shadow-lg transition-all duration-300 ease-out flex flex-col ${isBentoContext ? 'p-3 gap-2 shadow-none hover:shadow-none hover:-translate-y-0 border-white/5 bg-transparent' : 'md:shadow-xl shadow-[0_0_40px_rgba(14,165,233,0.04)] md:shadow-[0_0_60px_rgba(14,165,233,0.06)] hover:shadow-[0_0_60px_rgba(14,165,233,0.08)] md:hover:shadow-[0_0_80px_rgba(14,165,233,0.12)] hover:-translate-y-[2px] p-4 md:p-5 gap-2 md:gap-2.5'}`}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter text to encrypt..."
                    aria-label="Text to encrypt"
                    className={`w-full bg-background-primary border border-border rounded-md text-regular text-text-primary focus:outline-none focus:border-accent transition-colors resize-none ${isBentoContext ? 'p-2' : 'p-2.5'}`}
                    rows={isBentoContext ? 1 : 2}
                />

                <button
                    onClick={handleEncrypt}
                    disabled={isLoading || !input.trim()}
                    aria-label="Encrypt text"
                    className={`w-full bg-accent text-text-inverse rounded-md text-medium font-semibold hover:opacity-90 disabled:opacity-50 transition-all duration-150 ease-out flex justify-center items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent ${isBentoContext ? 'py-2 hover:-translate-y-0 active:translate-y-0 shadow-none hover:shadow-none' : 'py-2.5 hover:-translate-y-[1px] hover:shadow-md active:translate-y-0 disabled:hover:translate-y-0 disabled:hover:shadow-none'}`}
                >
                    {isLoading ? (
                        <span className="material-symbols-outlined animate-spin" style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">sync</span>
                    ) : (
                        "Encrypt"
                    )}
                </button>

                {output && (
                    <div className="mt-2 flex flex-col gap-2">
                        <span className="text-small text-text-secondary font-medium text-left">Encrypted Result:</span>
                        <div className="w-full bg-background-primary border border-border rounded-md p-3 text-regular text-text-secondary break-all text-left">
                            {output}
                        </div>
                    </div>
                )}
            </div>

            {!isBentoContext && (
                <p className="text-small text-text-secondary text-center px-4">
                    Runs entirely in your browser. Nothing is stored.
                </p>
            )}
        </div >
    );
}
