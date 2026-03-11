"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function EnterpriseDifferentiators() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);
    const [isDesktop, setIsDesktop] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [cardHeight, setCardHeight] = useState(0);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
            if (cardRef.current) {
                setCardHeight(cardRef.current.offsetHeight);
            }
        };
        handleResize(); // Init
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!isDesktop) return;

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (sectionRef.current) {
                        const rect = sectionRef.current.getBoundingClientRect();
                        // Progress calculation: 0 when element top hits viewport, 1 when element bottom hits viewport bottom
                        const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
                        let p = -rect.top / scrollableDistance;
                        p = Math.max(0, Math.min(1, p));
                        setProgress(p);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial calculation
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDesktop]);

    const getCard1Style = () => {
        if (!mounted || !isDesktop) return {};
        const segment = progress * 3;
        const maxOffset = cardHeight + 32;
        let y = 0;
        let opacity = 1;
        if (segment >= 1) {
            const t = Math.min(1, segment - 1);
            y = 0; // Prevent negative overflow entirely
            opacity = 1 - t;
        }
        y = Math.max(0, Math.min(maxOffset, y));
        return { transform: `translateY(${y}px)`, opacity };
    };

    const getCard2Style = () => {
        if (!mounted || !isDesktop) return {};
        const segment = progress * 3;
        const startY = cardHeight + 32;
        const maxOffset = cardHeight + 32;
        let y = startY;
        let opacity = 1;

        if (segment < 1) {
            y = startY;
        } else if (segment < 2) {
            const t = segment - 1;
            y = startY - (startY * t);
        } else {
            const t = Math.min(1, segment - 2);
            y = 0; // Prevent negative overflow
            opacity = 1 - t;
        }
        y = Math.max(0, Math.min(maxOffset, y));
        return { transform: `translateY(${y}px)`, opacity };
    };

    const getCard3Style = () => {
        if (!mounted || !isDesktop) return {};
        const segment = progress * 3;
        const startY = cardHeight + 32;
        const maxOffset = cardHeight + 32;
        let y = startY;

        if (segment < 2) {
            y = startY;
        } else {
            const t = Math.min(1, segment - 2);
            y = startY - (startY * t);
        }
        y = Math.max(0, Math.min(maxOffset, y));
        return { transform: `translateY(${y}px)`, opacity: 1 };
    };

    const cardBaseClass = "rounded-xl bg-gradient-to-b from-background-secondary/90 to-background-secondary/80 backdrop-blur-md border border-white/5 p-6 md:p-7 transition-transform duration-300 ease-out will-change-transform md:absolute md:inset-0 relative md:shadow-[0_10px_40px_rgba(0,0,0,0.25)]";

    return (
        <section ref={sectionRef} className="w-full bg-background-primary py-32 relative">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">

                {/* Left Column Container */}
                <div className="md:sticky md:top-32 h-fit">
                    <div className="text-tiny text-accent uppercase tracking-wider mb-6">
                        Enterprise Architecture
                    </div>
                    <h2 className="text-h2 font-semibold text-text-primary leading-tight">
                        Enterprise-grade encryption built for zero-trust environments.
                    </h2>
                    <p className="text-small text-text-secondary mt-6 max-w-md">
                        CryptAl executes all encryption client-side using hardened algorithms, ephemeral memory control, and strict state isolation. Designed for regulated, high-security workflows.
                    </p>
                    <button className="mt-8 px-6 py-3 rounded-full border border-white/10 text-text-primary hover:bg-white/5 transition-colors font-semibold text-small">
                        Explore Security Whitepaper
                    </button>
                </div>

                {/* Right Column Container */}
                <div className="md:relative h-[140vh] md:h-[160vh] h-auto px-6 md:px-0">
                    <div className="md:sticky md:top-32 md:h-[60vh] flex flex-col items-start mt-12 md:mt-0">
                        <div className="relative w-[90%] md:w-[85%] max-w-[720px] mx-auto h-[75%] flex flex-col md:block gap-12 md:gap-0">

                            {/* Card 01 */}
                            <div
                                ref={cardRef}
                                style={getCard1Style()}
                                className={`${cardBaseClass} z-10`}
                            >
                                <div className="text-[3rem] font-bold text-accent/30 absolute top-8 right-8 pointer-events-none select-none">
                                    01
                                </div>
                                <h3 className="text-h5 font-semibold text-text-primary mb-4 relative z-10 w-4/5 leading-tight">
                                    Multi-Algorithm Security Model
                                </h3>
                                <p className="text-small text-text-secondary leading-relaxed relative z-10 max-w-[520px]">
                                    Supports six symmetric and asymmetric cryptographic engines including AES, DES, Twofish, ElGamal, Playfair, and Hill. Each algorithm operates in complete isolation without shared state leakage.
                                </p>
                                <ul className="mt-6 flex flex-col space-y-2 relative z-10">
                                    <li className="flex items-center gap-2 text-small text-text-primary">
                                        <span className="material-symbols-outlined text-accent text-[18px]">check_circle</span>
                                        Independent state control
                                    </li>
                                    <li className="flex items-center gap-2 text-small text-text-primary">
                                        <span className="material-symbols-outlined text-accent text-[18px]">check_circle</span>
                                        Deterministic verification
                                    </li>
                                    <li className="flex items-center gap-2 text-small text-text-primary">
                                        <span className="material-symbols-outlined text-accent text-[18px]">check_circle</span>
                                        Stateless execution
                                    </li>
                                </ul>
                            </div>

                            {/* Card 02 */}
                            <div
                                style={getCard2Style()}
                                className={`${cardBaseClass} z-20`}
                            >
                                <div className="text-[3rem] font-bold text-accent/30 absolute top-8 right-8 pointer-events-none select-none">
                                    02
                                </div>
                                <h3 className="text-h5 font-semibold text-text-primary mb-4 relative z-10 w-4/5 leading-tight">
                                    Real-Time Processing & Performance
                                </h3>
                                <p className="text-small text-text-secondary leading-relaxed relative z-10 max-w-[520px]">
                                    Encryption and decryption execute instantly within the browser using optimized WebCrypto routines. No server dependency. No network roundtrips.
                                </p>
                                <ul className="mt-6 flex flex-col space-y-2 relative z-10">
                                    <li className="flex items-center gap-2 text-small text-text-primary">
                                        <span className="material-symbols-outlined text-accent text-[18px]">check_circle</span>
                                        Sub-20ms encryption latency
                                    </li>
                                    <li className="flex items-center gap-2 text-small text-text-primary">
                                        <span className="material-symbols-outlined text-accent text-[18px]">check_circle</span>
                                        Hardware-accelerated processing
                                    </li>
                                    <li className="flex items-center gap-2 text-small text-text-primary">
                                        <span className="material-symbols-outlined text-accent text-[18px]">check_circle</span>
                                        Deterministic output validation
                                    </li>
                                </ul>
                            </div>

                            {/* Card 03 */}
                            <div
                                style={getCard3Style()}
                                className={`${cardBaseClass} z-30`}
                            >
                                <div className="text-[3rem] font-bold text-accent/30 absolute top-8 right-8 pointer-events-none select-none">
                                    03
                                </div>
                                <h3 className="text-h5 font-semibold text-text-primary mb-4 relative z-10 w-4/5 leading-tight">
                                    Session-Bound Security Controls
                                </h3>
                                <p className="text-small text-text-secondary leading-relaxed relative z-10 max-w-[520px]">
                                    Sensitive data is automatically purged using memory-safe routines. Auto-clear timers and self-destruct options ensure zero residual persistence after use.
                                </p>
                                <ul className="mt-6 flex flex-col space-y-2 relative z-10">
                                    <li className="flex items-center gap-2 text-small text-text-primary">
                                        <span className="material-symbols-outlined text-accent text-[18px]">check_circle</span>
                                        Auto-clear result engine
                                    </li>
                                    <li className="flex items-center gap-2 text-small text-text-primary">
                                        <span className="material-symbols-outlined text-accent text-[18px]">check_circle</span>
                                        Self-destruct timer
                                    </li>
                                    <li className="flex items-center gap-2 text-small text-text-primary">
                                        <span className="material-symbols-outlined text-accent text-[18px]">check_circle</span>
                                        0% server-side storage
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
