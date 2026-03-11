"use client";

import { useState } from "react";

export default function QuickEncrypt() {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEncrypt = () => {
        if (!input.trim()) return;
        setIsLoading(true);
        setTimeout(() => {
            // Mock interaction finish
            setIsLoading(false);
            setInput("");
        }, 600);
    };

    return (
        <div className="flex flex-col items-center gap-3 w-full max-w-[640px] mx-auto z-20 relative">
            <div className="flex items-center w-full h-[56px] bg-background-secondary border border-accent/30 rounded-xl shadow-md p-1.5 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter sensitive string to instantly encrypt..."
                    aria-label="Quick encrypt input"
                    className="flex-grow bg-transparent border-none outline-none text-regular text-text-primary px-4 placeholder:text-text-secondary/60 h-full"
                    onKeyDown={(e) => e.key === 'Enter' && handleEncrypt()}
                />
                <button
                    onClick={handleEncrypt}
                    disabled={isLoading || !input.trim()}
                    aria-label="Quick Encrypt"
                    className="h-full px-6 bg-accent text-text-inverse rounded-lg text-small font-bold transition-all duration-150 ease-out hover:opacity-90 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center min-w-[120px]"
                >
                    {isLoading ? (
                        <span className="material-symbols-outlined animate-spin" style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">sync</span>
                    ) : (
                        "Encrypt"
                    )}
                </button>
            </div>

            <p className="text-small text-text-secondary font-medium">
                Runs entirely in your browser.
            </p>
        </div>
    );
}
