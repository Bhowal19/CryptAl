"use client";

import React, { useRef, useState } from "react";

interface PhilosophyCardProps {
    title: string;
    description: string;
    detail: string;
    isActive: boolean;
    isDimmed: boolean;
    onClick: () => void;
}

export default function PhilosophyCard({
    title,
    description,
    detail,
    isActive,
    isDimmed,
    onClick
}: PhilosophyCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isActive) return; // Disable hover tilt when active
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setRotation({
            x: (0.5 - y) * 6,
            y: (x - 0.5) * 6,
        });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    const renderIcon = () => {
        switch (title) {
            case "Integrity":
                return (
                    <svg className="w-8 h-8 text-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path className="shield-path" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <rect x="9" y="11" width="6" height="6" rx="1" />
                        <path className="shackle" d="M9 11V8a3 3 0 0 1 6 0v3" />
                    </svg>
                );
            case "Accessibility":
                return (
                    <svg className="w-8 h-8 text-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <path className="network-line opacity-50 transition-opacity duration-300 group-hover:opacity-100" d="M8.59 13.51l6.83 3.98" />
                        <path className="network-line opacity-50 transition-opacity duration-300 group-hover:opacity-100" d="M15.41 6.51l-6.82 3.98" style={{ animationDelay: '0.1s' }} />
                    </svg>
                );
            case "Innovation":
                return (
                    <svg className="w-8 h-8 text-accent shrink-0 cube-rotate" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div
            ref={cardRef}
            className="relative group [perspective:1000px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <style>{`
                .shield-path {
                    stroke-dasharray: 100;
                    stroke-dashoffset: 0;
                }
                .group:hover .shield-path {
                    animation: drawStroke 0.8s ease-out forwards;
                }
                @keyframes drawStroke {
                    0% { stroke-dashoffset: 100; }
                    100% { stroke-dashoffset: 0; }
                }

                .shackle {
                    transform-origin: center 11px;
                    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .group:hover .shackle {
                    transform: scaleY(0.7) translateY(1px);
                }

                .network-line {
                    stroke-dasharray: 20;
                    stroke-dashoffset: 0;
                }
                .group:hover .network-line {
                    animation: drawNetwork 0.6s ease-out forwards;
                }
                @keyframes drawNetwork {
                    0% { stroke-dashoffset: 20; }
                    100% { stroke-dashoffset: 0; }
                }

                .cube-rotate {
                    transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
                }
                .group:hover .cube-rotate {
                    transform: rotate(15deg);
                }
            `}</style>

            <div
                className={`absolute inset-0 rounded-xl bg-cyan-500/5 blur-xl transition duration-400 pointer-events-none
                           ${isActive ? "opacity-100 bg-cyan-400/10" : "opacity-0 group-hover:opacity-60"}`}
            />
            <div
                className={`cursor-pointer relative rounded-xl border bg-white/[0.03] backdrop-blur-xl p-8 transform-gpu transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] 
                           ${isActive
                        ? "scale-105 border-cyan-500/30 shadow-[0_30px_80px_rgba(0,255,255,0.15)] z-20"
                        : isDimmed
                            ? "opacity-60 blur-[2px] border-white/5 scale-[0.98]"
                            : "border-white/10 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,255,255,0.08)] z-10"}`}
                style={{
                    background: 'linear-gradient(to bottom right, rgba(0,255,255,0.03), transparent), rgba(255,255,255,0.03)',
                    transform: isActive ? 'rotateX(0deg) rotateY(0deg) scale(1.02)' : `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                }}
                onClick={onClick}
            >
                <div className="flex items-center gap-4 mb-4">
                    {renderIcon()}
                    <h3 className={`text-large font-semibold m-0 transition-colors duration-400 ${isActive ? "text-cyan-400" : "text-text-primary"}`}>
                        {title}
                    </h3>
                </div>
                <p className="text-small text-text-secondary leading-relaxed">
                    {description}
                </p>

                {/* Expanded Detail Panel */}
                <div
                    className={`grid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden
                               ${isActive ? "grid-rows-[1fr] mt-6 opacity-100" : "grid-rows-[0fr] mt-0 opacity-0"}`}
                >
                    <div className="min-h-0">
                        <div className="pt-4 border-t border-white/10 text-small text-text-secondary/80 leading-relaxed italic">
                            {detail}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
