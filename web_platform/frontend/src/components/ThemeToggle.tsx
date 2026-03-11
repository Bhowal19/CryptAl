"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="fixed top-6 left-6 z-50 h-10 w-10 pointer-events-none" aria-hidden="true" />;
    }

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="fixed top-6 left-6 z-50 h-10 w-10 flex items-center justify-center rounded-full backdrop-blur-md bg-background-primary/60 border border-white/10 shadow-md focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 ease-out hover:scale-105 active:scale-95"
        >
            <span
                className={`material-symbols-outlined transition-transform duration-500 ${theme === 'dark' ? 'rotate-0' : '-rotate-180'}`}
                style={{ fontSize: '20px' }}
                aria-hidden="true"
            >
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
    );
}
