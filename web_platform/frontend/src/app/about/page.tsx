import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import ContactSection from '../../components/ContactSection';
import GenesisSection from '../../components/GenesisSection';
import AboutClosingSection from '../../components/AboutClosingSection';
import PhilosophyBentoGrid from '../../components/PhilosophyBentoGrid';

export const metadata: Metadata = {
    title: 'About | CryptAl',
    description: 'The story, philosophy, and founders behind the CryptAl enterprise encryption suite.',
};

export default function AboutPage() {
    return (
        <>
            <main className="min-h-screen bg-background-primary flex flex-col pt-24">

                {/* HERO SECTION */}
                <section id="about-hero" className="relative min-h-[90vh] flex items-center border-b border-border/50 overflow-hidden">
                    {/* Faint Grid Overlay (Subtle) */}
                    <div
                        className="absolute inset-0 pointer-events-none z-0"
                        style={{
                            backgroundImage: 'radial-gradient(var(--color-border) 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                            opacity: 0.4
                        }}
                    />

                    {/* Radial Glow Background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[600px] h-[600px] bg-accent/10 blur-3xl rounded-full opacity-20 pointer-events-none z-0" />

                    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">

                            {/* LEFT BLOCK */}
                            <div>
                                <div className="text-xs tracking-[0.3em] uppercase text-accent mb-8">
                                    ABOUT CRYPTAL
                                </div>
                                <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.1] tracking-tight text-text-primary">
                                    Where Security<br />
                                    Meets<br />
                                    Development.
                                </h1>
                                <div className="mt-12 w-16 h-[1px] bg-white/10" />
                            </div>

                            {/* RIGHT BLOCK */}
                            <div className="space-y-16 flex flex-col justify-center">
                                <p className="text-regular text-text-secondary leading-relaxed max-w-[420px]">
                                    Cryptal was born from a collision between security engineering and product design.
                                </p>

                                <div className="grid grid-cols-2 gap-8 text-sm text-text-secondary">
                                    <div>
                                        <div className="text-small uppercase tracking-wide mb-1">Founded</div>
                                        <div className="text-text-primary text-base">2023</div>
                                    </div>
                                    <div>
                                        <div className="text-small uppercase tracking-wide mb-1">Built for</div>
                                        <div className="text-text-primary text-base">Zero-trust web</div>
                                    </div>
                                </div>

                                <p className="text-regular text-text-secondary leading-relaxed max-w-[420px]">
                                    Security should not interrupt creativity.
                                    <br />
                                    It should protect it.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* GENESIS SECTION */}
                <GenesisSection />

                {/* PHILOSOPHY SECTION */}
                <section id="philosophy" className="w-full py-24 relative reveal-section overflow-hidden">
                    {/* Animated Dotted Grid */}
                    <style>{`
                        @keyframes floatGrid {
                            from { background-position: 0 0; }
                            to { background-position: 0 40px; }
                        }
                    `}</style>
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                            backgroundImage: 'radial-gradient(rgba(0,255,255,0.2) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                            animation: 'floatGrid 40s linear infinite'
                        }}
                    />

                    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

                        {/* Section Header */}
                        <div className="flex flex-col items-center text-center mb-16">
                            <div className="text-sm tracking-widest text-accent uppercase mb-4 font-medium">
                                Security + Development
                            </div>
                            <h2 className="text-h2 font-semibold text-text-primary">
                                Our Core Philosophy
                            </h2>
                        </div>

                        {/* Bento Grid */}
                        <PhilosophyBentoGrid />

                    </div>
                </section>

                {/* FOUNDERS SECTION */}
                <section id="founders" className="py-24">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">

                        {/* Section Header */}
                        <div className="text-center mb-16">
                            <h2 className="text-h3 font-semibold text-text-primary">Meet the Founders</h2>
                            <p className="text-text-secondary text-regular mt-4 max-w-[640px] mx-auto leading-relaxed">
                                The minds behind Cryptal — engineering security with precision and building privacy-first experiences.
                            </p>
                        </div>

                        {/* Founder Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                            {/* Founder Card 1 */}
                            <div className="relative bg-background-secondary/70 backdrop-blur-md border border-white/5 rounded-2xl p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-8 bg-background-primary relative">
                                    <Image
                                        src="/founder-ayan.jpg"
                                        alt="Ayan Bhowal"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-h4 font-semibold mb-2">Ayan Bhowal</h3>
                                <p className="text-small uppercase tracking-wider text-accent mb-6">Security & Frontend Architect</p>

                                <p className="text-regular text-text-secondary leading-relaxed mb-8">
                                    Specializing in zero-trust architecture and cryptographic deployment, Ayan bridges the gap between mathematically rigorous security engineering and frictionless user experiences. He ensures that complex privacy protocols operate invisibly alongside uncompromising UX precision.
                                </p>

                                <div className="flex gap-6 text-small text-text-secondary">
                                    <a href="https://bhowalcommandcenter.vercel.app/" className="hover:text-accent transition-colors">Portfolio</a>
                                    <a href="https://www.linkedin.com/in/ayan-bhowal/" className="hover:text-accent transition-colors">LinkedIn</a>
                                    <a href="https://github.com/Bhowal19" className="hover:text-accent transition-colors">Github</a>
                                </div>
                            </div>

                            {/* Founder Card 2 */}
                            <div className="relative bg-background-secondary/70 backdrop-blur-md border border-white/5 rounded-2xl p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-8 bg-background-primary relative">
                                    <Image
                                        src="/founder-varun.jpg"
                                        alt="Varun Bhattacharya"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-h4 font-semibold mb-2">Varun Bhattacharya</h3>
                                <p className="text-small uppercase tracking-wider text-accent mb-6">Head of Engineering & Systems</p>

                                <p className="text-regular text-text-secondary leading-relaxed mb-8">
                                    A systems engineer deeply focused on performance optimization and platform resilience. Varun drives the core technical strategy, constructing deterministic backend structures and memory-safe execution workflows to guarantee uncompromising enterprise stability at scale.
                                </p>

                                <div className="flex gap-6 text-small text-text-secondary">
                                    <a href="https://varun-bhattacharya.netlify.app/" className="hover:text-accent transition-colors">Portfolio</a>
                                    <a href="https://www.linkedin.com/in/varunbhattacharya/" className="hover:text-accent transition-colors">LinkedIn</a>
                                    <a href="https://github.com/VarunBhattacharya" className="hover:text-accent transition-colors">GitHub</a>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>

                {/* CLOSING SECTION */}
                <AboutClosingSection />

            </main >
            <ContactSection />
        </>
    );
}
