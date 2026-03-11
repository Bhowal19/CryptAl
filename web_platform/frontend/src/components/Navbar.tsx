"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check on mount
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full px-4 md:px-6 max-w-[1100px] transition-all duration-300 ease-out`}
            aria-label="Main Navigation"
        >
            <div className={`
                h-[60px] flex items-center justify-between px-6 rounded-2xl border border-white/10 transition-all duration-300 ease-out
                ${isScrolled
                    ? 'bg-background-primary/70 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.3)]'
                    : 'bg-background-primary/60 backdrop-blur-lg shadow-[0_10px_40px_rgba(0,0,0,0.25)]'}
            `}>

                {/* Logo */}
                <Link
                    href="/" // Changed from #home
                    className="text-text-primary text-h6 font-semibold tracking-tight uppercase hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-accent rounded-sm" // Updated className
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    CryptAl
                </Link>

                {/* Center Navigation (Desktop Only) */}
                <nav className="hidden lg:flex items-center gap-8">
                    <Link href="#how-it-works" className="relative group text-small font-semibold text-text-secondary hover:text-text-primary transition-colors py-1">
                        Features
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-text-primary group-hover:w-full transition-all duration-150 ease-out"></span>
                    </Link>
                    <Link href="#pricing" className="relative group text-small font-semibold text-text-secondary hover:text-text-primary transition-colors py-1">
                        Pricing
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-text-primary group-hover:w-full transition-all duration-150 ease-out"></span>
                    </Link>
                    <Link href="#enterprise" className="relative group text-small font-semibold text-text-secondary hover:text-text-primary transition-colors py-1">
                        Security
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-text-primary group-hover:w-full transition-all duration-150 ease-out"></span>
                    </Link>
                    <Link href="/docs" className="relative group text-small font-semibold text-text-secondary hover:text-text-primary transition-colors py-1">
                        Docs
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-text-primary group-hover:w-full transition-all duration-150 ease-out"></span>
                    </Link>
                </nav>

                {/* Right Area (Desktop CTA + Mobile Toggle) */}
                <div className="flex items-center gap-4 z-50">
                    <Link
                        href="#encrypt"
                        className="hidden lg:flex bg-accent text-text-inverse px-6 py-2.5 rounded-xl text-regular font-bold transition-all duration-200 ease-out shadow-md hover:-translate-y-[2px] hover:shadow-lg hover:brightness-105 active:translate-y-[0px] active:shadow-md"
                    >
                        Start Encrypting
                    </Link>

                    <button
                        onClick={toggleMenu}
                        className="lg:hidden text-text-primary focus:outline-none flex items-center justify-center p-2 rounded-md hover:bg-background-secondary transition-colors focus-visible:ring-2 focus-visible:ring-accent"
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Toggle mobile menu"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '24px', width: '24px', height: '24px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}
                            aria-hidden="true"
                        >
                            {isMobileMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */} {/* Updated comment */}
            <div
                className={`md:hidden absolute top-[72px] left-4 right-4 bg-background-primary/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300 ease-in-out ${ // Updated className
                    isMobileMenuOpen ? 'max-h-[400px] opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
            >
                <nav className="flex flex-col items-center gap-6 px-6 w-full">
                    <Link href="#how-it-works" className="text-medium font-bold text-text-secondary hover:text-text-primary transition-colors" onClick={toggleMenu}>
                        Features
                    </Link>
                    <Link href="#pricing" className="text-medium font-bold text-text-secondary hover:text-text-primary transition-colors" onClick={toggleMenu}>
                        Pricing
                    </Link>
                    <Link href="#enterprise" className="text-medium font-bold text-text-secondary hover:text-text-primary transition-colors" onClick={toggleMenu}>
                        Security
                    </Link>
                    <Link href="/docs" className="text-medium font-bold text-text-secondary hover:text-text-primary transition-colors" onClick={toggleMenu}>
                        Docs
                    </Link>

                    <div className="w-full pt-2 flex justify-center mt-2">
                        <Link
                            href="#encrypt"
                            className="w-full max-w-[200px] text-center bg-accent text-text-inverse px-6 py-3 rounded-xl text-medium font-bold transition-all duration-200 ease-out shadow-md hover:-translate-y-[2px] hover:shadow-lg hover:brightness-105 active:translate-y-[0px] active:shadow-md"
                            onClick={toggleMenu}
                        >
                            Start Encrypting
                        </Link>
                    </div>
                </nav>
            </div>
        </nav>
    );
}
