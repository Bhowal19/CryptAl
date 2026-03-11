"use client";

import React, { useState } from 'react';
import Reveal from './Reveal';

const jobsData = [
    {
        id: 1,
        title: "Frontend Developer",
        icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
        summary: "Architect zero-knowledge encryption interfaces using React and the native WebCrypto API.",
        details: [
            "React / Next.js expertise",
            "Web performance optimization",
            "Animation systems experience",
            "Security-focused UI thinking"
        ]
    },
    {
        id: 2,
        title: "Backend Developer",
        icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>,
        summary: "Build resilient, strictly verifiable API delivery pipelines supporting static asset routing constraints.",
        details: [
            "Python / Node.js",
            "Cryptography knowledge",
            "API design",
            "Secure architecture patterns"
        ]
    },
    {
        id: 3,
        title: "UI/UX Designer",
        icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path></svg>,
        summary: "Craft beautiful, high-trust interfaces masking complex cryptographic primitives for everyday users.",
        details: [
            "System thinking",
            "Motion design",
            "Product storytelling",
            "Design systems mastery"
        ]
    }
];

export default function JobsGrid() {
    const [activeJob, setActiveJob] = useState<number | null>(null);
    const [selectedJobForModal, setSelectedJobForModal] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleApplyClick = (e: React.MouseEvent, jobId: number) => {
        e.stopPropagation();
        setSelectedJobForModal(jobId);
        setIsSuccess(false);
    };

    const handleCloseModal = () => {
        setSelectedJobForModal(null);
        setIsSuccess(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const formData = new FormData(e.currentTarget);
            console.log("Application Submitted:", {
                jobId: selectedJobForModal,
                name: formData.get("name"),
                email: formData.get("email"),
                portfolio: formData.get("portfolio"),
                resume: (formData.get("resume") as File)?.name || "No file",
                reason: formData.get("reason")
            });
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 800);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobsData.map((job, index) => {
                const isActive = activeJob === job.id;
                const isDimmed = activeJob !== null && activeJob !== job.id;

                return (
                    <div
                        key={job.id}
                        className={`transition-[grid-column] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'md:col-span-3' : 'md:col-span-1'}`}
                    >
                        <Reveal delay={index * 120}>
                            <div
                                className={`
                                    group h-full rounded-xl border backdrop-blur-xl p-8 transform-gpu transition-all duration-500 cursor-pointer overflow-hidden relative
                                    ${isActive ? 'border-accent/60 bg-white/[0.06] shadow-[0_20px_60px_rgba(0,255,255,0.08)] scale-[1.01]' : 'border-white/10 bg-white/[0.03] hover:-translate-y-2 hover:border-white/30 hover:bg-white/[0.05]'}
                                    ${isDimmed ? 'opacity-50 blur-sm scale-95 pointer-events-none' : 'opacity-100'}
                                `}
                                onClick={() => setActiveJob(isActive ? null : job.id)}
                            >
                                {/* Light Sweep Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg transition-colors duration-300 ${isActive ? 'bg-accent/20 text-accent' : 'bg-white/5 text-text-secondary group-hover:text-accent group-hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]'}`}>
                                        {job.icon}
                                    </div>
                                    <h3 className={`text-xl font-semibold m-0 transition-colors duration-300 ${isActive ? 'text-accent' : 'text-text-primary'}`}>
                                        {job.title}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-6">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-background-secondary border border-border/50 text-text-secondary">
                                        <svg className="w-3 h-3 mr-1.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                        Remote
                                    </span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-background-secondary border border-border/50 text-text-secondary">
                                        <svg className="w-3 h-3 mr-1.5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                                        Full-time
                                    </span>
                                </div>

                                <p className="text-sm text-text-secondary m-0 leading-relaxed">
                                    {job.summary}
                                </p>

                                {/* Expandable Details */}
                                <div className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isActive ? 'grid-rows-[1fr] opacity-100 mt-8' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                                    <div className="overflow-hidden">
                                        <div className="pt-6 border-t border-white/10">
                                            <h4 className="text-sm font-semibold text-text-primary mb-4 m-0 uppercase tracking-wider">Key Requirements</h4>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-0 p-0 list-none mb-8">
                                                {job.details.map((detail, idx) => (
                                                    <li key={idx} className="flex gap-3 text-sm text-text-secondary items-center">
                                                        <span className="text-accent/50 text-lg leading-none">✦</span>
                                                        <span>{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button
                                                onClick={(e) => handleApplyClick(e, job.id)}
                                                className="bg-accent hover:bg-accent/90 text-background-primary font-semibold py-3 px-8 rounded-lg transition-colors duration-200 transform active:scale-95"
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                );
            })}

            {/* Application Modal */}
            {selectedJobForModal !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-primary/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div
                        className="bg-background-secondary border border-white/10 rounded-xl p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-6 right-6 text-text-secondary hover:text-text-primary transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        {isSuccess ? (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 text-accent mb-6">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                <h3 className="text-h4 text-text-primary mb-2 font-semibold">Application Submitted Successfully</h3>
                                <p className="text-text-secondary mb-8 text-balance">Thank you for your interest in Cryptal. Our engineering team will review your application closely.</p>
                                <button
                                    onClick={handleCloseModal}
                                    className="bg-white/10 hover:bg-white/20 text-text-primary font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                                >
                                    Close Window
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-h5 text-text-primary mb-2 font-semibold">
                                    Apply for {jobsData.find(j => j.id === selectedJobForModal)?.title}
                                </h3>
                                <p className="text-text-secondary text-sm mb-8">Join the mission to build browser-native cryptographic infrastructure.</p>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">Full Name <span className="text-red-400">*</span></label>
                                        <input required type="text" id="name" name="name" className="w-full bg-background-primary border border-white/10 rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-secondary/50" placeholder="Jane Doe" />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">Email Address <span className="text-red-400">*</span></label>
                                        <input required type="email" id="email" name="email" className="w-full bg-background-primary border border-white/10 rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-secondary/50" placeholder="jane@example.com" />
                                    </div>

                                    <div>
                                        <label htmlFor="portfolio" className="block text-sm font-medium text-text-primary mb-1">Portfolio / GitHub Profile</label>
                                        <input type="url" id="portfolio" name="portfolio" className="w-full bg-background-primary border border-white/10 rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-secondary/50" placeholder="https://github.com/..." />
                                    </div>

                                    <div>
                                        <label htmlFor="resume" className="block text-sm font-medium text-text-primary mb-1">Resume Upload <span className="text-red-400">*</span></label>
                                        <input required type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" className="w-full bg-background-primary border border-white/10 rounded-lg px-4 py-2 text-sm text-text-secondary file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-text-primary hover:file:bg-white/20 transition-all cursor-pointer" />
                                    </div>

                                    <div>
                                        <label htmlFor="reason" className="block text-sm font-medium text-text-primary mb-1">Why do you want to join Cryptal? <span className="text-red-400">*</span></label>
                                        <textarea required id="reason" name="reason" rows={4} className="w-full bg-background-primary border border-white/10 rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all placeholder:text-text-secondary/50 resize-y" placeholder="Tell us about your interest in security..." />
                                    </div>

                                    <div className="pt-4 flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="px-6 py-2.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="bg-accent hover:bg-accent/90 text-background-primary font-semibold py-2.5 px-8 rounded-lg transition-colors duration-200 transform active:scale-95 disabled:opacity-70 disabled:pointer-events-none flex items-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-background-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                    Submitting...
                                                </>
                                            ) : (
                                                "Submit Application"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
