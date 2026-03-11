"use client";

import React, { useRef, useState, useEffect } from "react";

export default function AboutClosingSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [progress, setProgress] = useState(0);

    const closingText = "Cryptal isn’t just encryption. It’s a commitment to privacy by design.";
    const closingWords = closingText.split(' ');

    useEffect(() => {
        let ticking = false;

        const updateProgress = () => {
            if (!sectionRef.current) return;

            const rect = sectionRef.current.getBoundingClientRect();

            // Animation starts ONLY when section top reaches top of viewport
            const start = rect.top <= 0;

            if (!start) {
                setProgress(0);
                ticking = false;
                return;
            }

            const total = rect.height - window.innerHeight;

            const newProgress = Math.min(
                1,
                Math.max(
                    0,
                    Math.abs(rect.top) / total
                )
            );

            setProgress(newProgress);
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateProgress);
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        // Initial setup
        updateProgress();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section ref={sectionRef} id="closing" className="relative h-[300vh] bg-background-primary">
            <div className="sticky top-0 h-screen flex items-center justify-center">

                {/* Content Wrapper */}
                <div className="relative w-full h-full flex items-center justify-center">

                    {/* Background Circle */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                            className="absolute w-[800px] h-[800px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 60%)',
                                transform: `scale(${0.8 + progress * 0.4})`,
                                opacity: 0.3 + progress * 0.4
                            }}
                        />
                    </div>

                    {/* Text Wrapper */}
                    <div className="relative max-w-[900px] px-6 text-center">
                        <h2 className="text-[clamp(2rem,5vw,4rem)] font-semibold leading-tight tracking-tight text-text-primary flex flex-wrap justify-center gap-x-[0.25em]">
                            {closingWords.map((word, index) => {
                                const animationRange = 0.85;
                                const adjustedProgress = Math.min(1, progress * 1.05);
                                const threshold = (index / closingWords.length) * animationRange;
                                const isVisible = adjustedProgress > threshold;

                                return (
                                    <span key={index} className="inline-block overflow-hidden">
                                        <span
                                            className={`word-inner inline-block transition-all duration-500 ease-out ${isVisible
                                                    ? 'opacity-100 translate-y-0'
                                                    : 'opacity-0 translate-y-[40px]'
                                                }`}
                                        >
                                            {word}&nbsp;
                                        </span>
                                    </span>
                                );
                            })}
                        </h2>
                    </div>

                </div>

            </div>
        </section>
    );
}
