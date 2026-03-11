import React from "react";
import Link from "next/link";

export default function ContactSection() {
    const linkGroups = [
        {
            title: "Product",
            links: [
                { name: "Features", url: "#" },
                { name: "Integrations", url: "#" },
                { name: "Pricing", url: "#pricing" }
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About", url: "/about" },
                { name: "Careers", url: "/careers" },
                { name: "Security", url: "/security" }
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Help Center", url: "#" },
                { name: "Docs", url: "/docs" },
                { name: "Blog", url: "#" }
            ]
        }
    ];

    const socialIcons = [
        "public",     // Globe/Website
        "code",       // GitHub-ish
        "tag",        // Twitter-ish
        "business"    // LinkedIn-ish
    ];

    return (
        <section className="relative w-full bg-background-primary pt-28 pb-12 border-t border-white/10">
            <div className="max-w-7xl mx-auto w-full px-6 flex flex-col">

                {/* Top Layout Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 w-full">

                    {/* Left Column (Brand block) */}
                    <div className="flex flex-col space-y-6 md:col-span-1 items-center md:items-start text-center md:text-left">
                        <div className="text-h6 font-semibold text-text-primary">
                            CryptAl
                        </div>
                        <p className="text-small text-text-secondary max-w-xs">
                            Enterprise-grade cryptography running entirely within your browser environment.
                        </p>
                        <div className="flex gap-4">
                            {socialIcons.map((icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="material-symbols-outlined text-text-secondary hover:text-accent transition-colors duration-200"
                                    aria-label={`Link to social profile`}
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Columns (Link groups) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:col-span-3 text-center sm:text-left">
                        {linkGroups.map((group, groupIndex) => (
                            <div key={groupIndex} className="flex flex-col">
                                <h4 className="text-small font-semibold text-text-primary mb-4">
                                    {group.title}
                                </h4>
                                <ul className="flex flex-col space-y-3">
                                    {group.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                href={link.url}
                                                className="text-small text-text-secondary hover:text-text-primary transition-colors duration-200"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Divider & Bottom Row */}
                <div className="mt-16 w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="text-tiny text-text-secondary">
                        <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
                        <span className="mx-2">·</span>
                        <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
                    </div>
                    <div className="text-tiny text-text-secondary">
                        © 2025 CryptAl. All rights reserved.
                    </div>
                </div>

            </div>
        </section>
    );
}
