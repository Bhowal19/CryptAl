import React from "react";

export default function PricingSection() {
    const plans = [
        {
            name: "Personal",
            price: "$0",
            period: "/month",
            description: "For individual experimentation",
            features: [
                "Basic text encryption",
                "Standard 256-bit AES",
                "Local storage only",
                "Community support"
            ],
            isMiddle: false,
            ctaText: "Start Free",
        },
        {
            name: "Business",
            price: "$39",
            period: "/month",
            description: "For teams handling client data",
            features: [
                "Everything in Personal, plus:",
                "Document & file encryption",
                "Zero-trust API access",
                "Automated data lifecycle",
                "Priority email support"
            ],
            isMiddle: true,
            ctaText: "Start 14-Day Trial",
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "For regulated, high-scale environments",
            features: [
                "Everything in Business, plus:",
                "Custom compliance reporting",
                "SSO & strict key management",
                "Dedicated instance deployment",
                "24/7 designated support team"
            ],
            isMiddle: false,
            ctaText: "Contact Sales",
        }
    ];

    return (
        <section id="pricing" className="relative overflow-hidden w-full bg-background-primary py-20 md:py-28 flex flex-col items-center">
            {/* Background Lighting Layers */}
            <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[150px] md:h-[300px] bg-accent/10 blur-[160px] opacity-40 pointer-events-none z-0" />
            <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[400px] h-[150px] md:h-[250px] bg-accent/10 blur-[140px] opacity-30 pointer-events-none z-0" />

            <div className="max-w-6xl mx-auto w-full px-6 flex flex-col items-center gap-12 z-10 relative">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="text-tiny text-text-primary bg-background-secondary px-4 py-1 rounded-full border border-border">
                        Pricing
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-h3 text-text-primary font-semibold">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-small text-text-secondary">
                            Scale securely — from individual developers to enterprise teams.
                        </p>
                    </div>
                </div>

                {/* Plan Toggle */}
                <div className="flex items-center p-1 bg-background-secondary rounded-full border border-border">
                    <button className="px-6 py-2 text-small font-medium text-text-secondary rounded-full transition-colors focus:outline-none">
                        Personal
                    </button>
                    <button className="px-6 py-2 text-small font-medium bg-accent text-text-inverse rounded-full shadow-sm focus:outline-none">
                        Business
                    </button>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full relative pt-4 md:pt-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-background-secondary/60 rounded-2xl border backdrop-blur-md p-8 flex flex-col transition-all duration-300 ease-out hover:-translate-y-[4px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] before:absolute before:inset-0 before:rounded-2xl before:bg-white/[0.02] before:pointer-events-none ${plan.isMiddle
                                ? 'md:-translate-y-4 border-accent z-10 hover:border-accent/80'
                                : 'border-white/5 z-0 hover:border-accent/40'
                                }`}
                        >
                            {plan.isMiddle && (
                                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[250px] md:w-[400px] h-[150px] md:h-[200px] bg-accent/20 blur-[120px] pointer-events-none -z-10" />
                            )}

                            <div className="flex flex-col gap-2 mb-6">
                                <h3 className="text-h6 font-semibold text-text-primary">
                                    {plan.name}
                                </h3>
                                <p className="text-small text-text-secondary h-10">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-[2rem] md:text-[2.5rem] font-bold tracking-tight text-text-primary leading-none">
                                    {plan.price}
                                </span>
                                {plan.period && (
                                    <span className="text-small text-text-secondary">
                                        {plan.period}
                                    </span>
                                )}
                            </div>

                            <ul className="flex flex-col space-y-3 flex-grow mb-8">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-text-secondary" style={{ fontSize: '20px', width: '20px', height: '20px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }} aria-hidden="true">
                                            check
                                        </span>
                                        <span className="text-small text-text-secondary leading-tight mt-0.5">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-3 rounded-lg text-medium font-bold transition-all duration-200 ease-out shadow-md hover:-translate-y-[2px] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${plan.isMiddle
                                        ? 'bg-accent text-text-inverse hover:brightness-105 active:translate-y-[0px] active:shadow-md'
                                        : 'bg-background-primary border border-border text-text-primary hover:border-accent/50 active:translate-y-[0px] active:shadow-md'
                                    }`}
                                aria-label={`Select the ${plan.name} plan`}
                            >
                                {plan.ctaText}
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
