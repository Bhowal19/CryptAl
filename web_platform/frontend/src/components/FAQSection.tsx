"use client";

import React, { useState } from "react";

export default function FAQSection() {
    const questions = [
        {
            q: "Is my data stored on your servers?",
            a: "No. All encryption runs client-side. We do not retain user data."
        },
        {
            q: "Is CryptAl compliant with enterprise standards?",
            a: "Built with compliance alignment in mind, including SOC 2 readiness."
        },
        {
            q: "Can we integrate CryptAl with our internal systems?",
            a: "Yes. API-based workflows are supported for enterprise plans."
        },
        {
            q: "How does auto-delete work?",
            a: "Encrypted outputs follow strict session-bound lifecycle controls."
        },
        {
            q: "Who holds the encryption keys?",
            a: "You do. The client exclusively generates and manages keys locally."
        },
        {
            q: "Does this work offline?",
            a: "Yes. Once the app loads, core encryption algorithms run offline."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="relative w-full bg-background-primary py-28 flex flex-col items-center">
            <div className="max-w-4xl mx-auto w-full px-6 flex flex-col items-center relative">

                <div className="flex flex-col items-center text-center">
                    <div className="text-tiny px-4 py-1 rounded-full bg-background-secondary border border-white/10 text-text-secondary inline-block mb-6">
                        FAQ
                    </div>
                    <h2 className="text-h3 text-text-primary font-semibold mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-small text-text-secondary max-w-2xl mx-auto mb-16">
                        Everything you need to know about CryptAl's security model, deployment, and operational details.
                    </p>
                </div>

                <div className="w-full space-y-6">
                    {questions.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="relative bg-background-secondary/60 backdrop-blur-md border border-white/10 rounded-xl transition-all duration-300 ease-out overflow-hidden hover:border-accent/40 hover:shadow-lg before:absolute before:inset-0 before:rounded-xl before:bg-white/[0.02] before:pointer-events-none"
                            >
                                <div
                                    onClick={() => toggleAccordion(index)}
                                    className="flex justify-between items-center px-6 py-5 cursor-pointer"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-h6 font-medium text-text-primary pr-4">
                                        {item.q}
                                    </span>
                                    <span
                                        className="material-symbols-outlined text-text-secondary transition-transform duration-300"
                                        style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', fontSize: '24px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                                        aria-hidden="true"
                                    >
                                        add
                                    </span>
                                </div>

                                <div
                                    className={`transition-all duration-300 ease-out overflow-hidden ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="px-6 pb-6 text-small text-text-secondary leading-relaxed">
                                        {item.a}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
