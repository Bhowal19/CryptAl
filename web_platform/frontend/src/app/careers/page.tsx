import React from 'react';
import type { Metadata } from 'next';
import ContactSection from '../../components/ContactSection';
import Reveal from '../../components/Reveal';
import JobsGrid from '../../components/JobsGrid';

export const metadata: Metadata = {
    title: 'Careers | CryptAl',
    description: 'Join CryptAl to build browser-native cryptographic infrastructure for the modern web.',
};

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-background-primary pt-24">
            {/* HERO SECTION */}
            <section className="relative py-32 flex items-center justify-center overflow-hidden min-h-[60vh]">

                {/* Embedded Inline Styles for Animated Grid */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes floatGrid {
                            from { background-position: 0 0; }
                            to { background-position: 0 40px; }
                        }
                    `
                }} />

                {/* Animated Dotted Grid Background */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(0,255,255,0.2) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        animation: 'floatGrid 40s linear infinite'
                    }}
                />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <Reveal delay={0}>
                        <div className="text-sm tracking-widest text-accent uppercase mb-6 font-medium">
                            Join CryptAl
                        </div>
                    </Reveal>

                    <Reveal delay={150}>
                        <h1 className="text-h2 md:text-[64px] font-semibold text-text-primary mb-8 leading-tight">
                            Build the Future of <br className="hidden md:block" /> Client-Side Security
                        </h1>
                    </Reveal>

                    <Reveal delay={300}>
                        <p className="text-large md:text-xl text-text-secondary leading-relaxed max-w-2xl mx-auto">
                            We're building browser-native cryptographic infrastructure for the modern web. Join us in redefining privacy.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* JOBS SECTION */}
            <section className="py-24 relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                    <Reveal delay={0}>
                        <div className="text-center mb-16">
                            <h2 className="text-h3 font-semibold text-text-primary mb-4">Open Positions</h2>
                            <p className="text-text-secondary text-large">Join our mission to secure the web's foundational layers.</p>
                        </div>
                    </Reveal>

                    {/* Jobs Grid Container */}
                    <JobsGrid />
                </div>
            </section>

            <ContactSection />
        </main>
    );
}
