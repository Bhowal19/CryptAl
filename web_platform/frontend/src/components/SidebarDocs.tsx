"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface NavItem {
    name: string;
    id: string;
}

interface NavGroup {
    title: string;
    items: NavItem[];
}

export default function SidebarDocs() {
    const [activeId, setActiveId] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState("");

    const navGroups: NavGroup[] = [
        {
            title: "Getting Started",
            items: [
                { name: "Cryptal Documentation", id: "docs-overview" },
                { name: "Installation", id: "installation" },
                { name: "Quick Start", id: "quick-start" }
            ]
        },
        {
            title: "Architecture",
            items: [
                { name: "System Architecture", id: "architecture" },
                { name: "Client-side Encryption Flow", id: "encryption-flow" },
                { name: "Security Model", id: "security-model" }
            ]
        },
        {
            title: "Cryptography",
            items: [
                { name: "Supported Algorithms", id: "algorithms" },
                { name: "Key Management", id: "key-management" },
                { name: "Encryption Pipeline", id: "encryption-pipeline" }
            ]
        },
        {
            title: "API Documentation",
            items: [
                { name: "Encrypt API", id: "encrypt-api" },
                { name: "Decrypt API", id: "decrypt-api" },
                { name: "Response Format", id: "response-format" }
            ]
        },
        {
            title: "Best Practices",
            items: [
                { name: "Best Practices", id: "best-practices" },
                { name: "Secure Usage", id: "secure-usage" },
                { name: "Key Handling", id: "key-handling" },
                { name: "Data Protection", id: "data-protection" }
            ]
        },
        {
            title: "Security",
            items: [
                { name: "Security", id: "security-section" },
                { name: "SOC 2 Model", id: "soc2-model" },
                { name: "Responsible Disclosure", id: "responsible-disclosure" }
            ]
        }
    ];

    useEffect(() => {
        // Set initial active id on load if there is a hash
        if (typeof window !== "undefined") {
            const hash = window.location.hash.replace("#", "");
            if (hash) {
                setActiveId(hash);
            }
        }

        const handleHashChange = () => {
            setActiveId(window.location.hash.replace("#", ""));
        };

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    // Filter logic
    const filteredGroups = useMemo(() => {
        if (!searchQuery.trim()) return navGroups;

        const lowerQuery = searchQuery.toLowerCase();

        return navGroups
            .map(group => ({
                ...group,
                items: group.items.filter(item =>
                    item.name.toLowerCase().includes(lowerQuery)
                )
            }))
            .filter(group => group.items.length > 0);
    }, [searchQuery]);

    return (
        <aside className="flex flex-col space-y-8 pb-12 w-full pt-1">

            {/* Search Input */}
            <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-base">
                    search
                </span>
                <input
                    type="text"
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-background-secondary border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus:border-white/30 transition-colors"
                />
            </div>

            {filteredGroups.length === 0 ? (
                <div className="text-sm text-text-secondary italic">
                    No results found for "{searchQuery}"
                </div>
            ) : (
                <div className="flex flex-col space-y-8">
                    {filteredGroups.map((group, gIndex) => (
                        <div key={gIndex} className="flex flex-col">
                            <h3 className="text-sm font-semibold text-text-primary mb-3">
                                {group.title}
                            </h3>
                            <ul className="flex flex-col space-y-1 border-l border-white/10 ml-1">
                                {group.items.map((item, iIndex) => {
                                    const isActive = activeId === item.id;

                                    return (
                                        <li key={iIndex}>
                                            <Link
                                                href={`#${item.id}`}
                                                onClick={() => setActiveId(item.id)}
                                                className={`block pl-4 py-1.5 -ml-[1px] border-l text-sm transition-colors duration-200 ${isActive
                                                    ? "border-text-primary text-text-primary font-medium"
                                                    : "border-transparent text-text-secondary hover:text-white hover:border-white/30"
                                                    }`}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </aside>
    );
}
