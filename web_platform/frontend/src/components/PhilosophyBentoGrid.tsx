"use client";

import React, { useState, useEffect, useRef } from "react";
import PhilosophyCard from "./PhilosophyCard";
import Reveal from "./Reveal";

const CARDS = [
    {
        id: "integrity",
        title: "Integrity",
        description:
            "Zero-trust defaults. We construct systems assuming environments are compromised, mathematically guaranteeing data safety natively within the browser architecture.",
        detail: "By treating the network as inherently hostile, we ensure that no plaintext ever leaves your machine. Our integrity model relies on authenticated encryption protocols (like AES-GCM) that instantly detect any tampering attempts before decryption can even begin."
    },
    {
        id: "accessibility",
        title: "Accessibility",
        description:
            "Enterprise-grade security stripped of friction. We abstract intense cryptographic complexities behind minimal, developer-centric, API-like native interfaces.",
        detail: "Security shouldn't require a Ph.D. in mathematics. Cryptal wraps the WebCrypto platform in a robust, error-proof layer that prevents common cryptography implementation mistakes while maintaining top-tier performance."
    },
    {
        id: "innovation",
        title: "Innovation",
        description:
            "Pushing the physical limits of standard WebCrypto tools to securely handle large-scale, deterministic cipher operations without backend processing.",
        detail: "We've engineered novel streaming techniques to chunk and process massive files directly in the browser's memory sandbox. This bypasses traditional RAM limits and completely neutralizes the risk of server-side data harvesting."
    },
];

export default function PhilosophyBentoGrid() {
    const [activeCard, setActiveCard] = useState<string | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    // Reset when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (gridRef.current && !gridRef.current.contains(e.target as Node)) {
                setActiveCard(null);
            }
        };

        if (activeCard) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeCard]);

    return (
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CARDS.map((card, index) => (
                <Reveal key={card.id} delay={index * 120}>
                    <PhilosophyCard
                        title={card.title}
                        description={card.description}
                        detail={card.detail}
                        isActive={activeCard === card.id}
                        isDimmed={activeCard !== null && activeCard !== card.id}
                        onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
                    />
                </Reveal>
            ))}
        </div>
    );
}
