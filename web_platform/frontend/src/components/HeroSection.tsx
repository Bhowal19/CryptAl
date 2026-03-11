import Link from "next/link";
import HeroTool from "./HeroTool";

export default function HeroSection() {
    return (
        <section className="relative w-full bg-background-primary min-h-[75vh] md:min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden px-4 md:px-6 lg:px-12 py-16 md:py-20 border-b border-border/50">
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[600px] h-[600px] bg-accent/10 blur-3xl rounded-full opacity-30 pointer-events-none z-0" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-7xl mx-auto mt-6 md:mt-8">

                {/* Headline (Split 2-line) */}
                <h1 className="text-[3.25rem] md:text-h1 lg:text-[4.75rem] leading-[1.1] md:leading-[1.05] tracking-tighter flex flex-col items-center w-full px-2">
                    <span className="font-bold text-accent">Enterprise-grade encryption</span>
                    <span className="font-bold text-text-primary px-4 md:px-0">for sensitive data.</span>
                </h1>

                {/* Subheadline */}
                <p className="text-large text-text-secondary opacity-90 font-medium max-w-[720px] mt-3">
                    Encrypt, validate, and auto-delete confidential text and documents — entirely client-side, with zero data retention.
                </p>

                {/* HeroTool Inline Module */}
                <div className="w-full mt-9 flex flex-col items-center">
                    <HeroTool />

                    <Link
                        href="#pricing"
                        className="text-small text-text-secondary hover:text-text-primary font-medium transition-colors mt-6"
                    >
                        View pricing
                    </Link>
                </div>
            </div>
        </section>
    );
}
