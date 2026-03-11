import React from 'react';
import type { Metadata } from 'next';
import ContactSection from '../../components/ContactSection';

export const metadata: Metadata = {
    title: 'Security | CryptAl',
    description: 'Enterprise documentation and security architecture for CryptAl.',
};

export default function SecurityPage() {
    return (
        <main className="min-h-screen bg-background-primary pt-24">
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-6 md:px-12">

                    {/* Header Structure */}
                    <div className="mb-16">
                        <div className="text-sm tracking-widest text-accent uppercase mb-4 font-medium">
                            Architecture
                        </div>
                        <h1 className="text-h2 font-semibold text-text-primary mb-6">
                            Security Documentation
                        </h1>
                        <p className="text-large text-text-secondary leading-relaxed max-w-3xl">
                            A comprehensive overview of CryptAl's encryption implementation, threat models, and architectural guarantees.
                        </p>
                    </div>

                    {/* Content Structure Placeholder */}
                    <article className="prose prose-invert max-w-none text-text-secondary leading-relaxed">
                        <section className="mb-16">
                            <h2 className="text-h4 text-text-primary mt-12 mb-6 border-b border-border/50 pb-4">
                                SOC 2 Compliance Framework
                            </h2>
                            <p className="mb-8">
                                Cryptal aligns with the foundational principles of the SOC 2 Trust Services Criteria. Our architecture is deliberately designed to mathematically enforce these principles rather than relying solely on policy.
                            </p>

                            <div className="space-y-8">
                                {/* Security */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8">
                                    <h3 className="text-large font-semibold text-accent mb-4">Security</h3>
                                    <ul className="space-y-3 list-none p-0 m-0">
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>Client-side encryption:</strong> All cryptographic operations occur exclusively within the volatile memory of the user's local browser runtime.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>Zero server plaintext exposure:</strong> Our backend architecture never receives, processes, or stores unencrypted payloads or cryptographic keys.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>Strict session boundaries:</strong> Cryptographic contexts are immediately destroyed upon tab closure, guaranteeing forward secrecy for local operations.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Availability */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8">
                                    <h3 className="text-large font-semibold text-accent mb-4">Availability</h3>
                                    <ul className="space-y-3 list-none p-0 m-0">
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>High-performance browser execution:</strong> Leveraging native WebCrypto APIs and Web Workers for non-blocking, multi-threaded cipher processing.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>No backend dependency:</strong> The encryption application functions as a standalone client architecture, eliminating server downtime risks for core operations.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>No central bottlenecks:</strong> Distributed, edge-delivered static assets ensure instantaneous load times regardless of geographic location or concurrent user volume.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Confidentiality */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8">
                                    <h3 className="text-large font-semibold text-accent mb-4">Confidentiality</h3>
                                    <ul className="space-y-3 list-none p-0 m-0">
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>AES-256 encryption:</strong> Utilizing the industry-standard Advanced Encryption Standard with 256-bit keys for maximum secure payload generation.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>Secure key handling:</strong> Keys are deterministically derived using PBKDF2 with unique, cryptographically secure random salts.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>No persistent storage:</strong> Neither keys, salts, nor plaintext data are ever committed to `localStorage`, `IndexedDB`, or any persistent state mechanisms.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Processing Integrity */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8">
                                    <h3 className="text-large font-semibold text-accent mb-4">Processing Integrity</h3>
                                    <ul className="space-y-3 list-none p-0 m-0">
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>Deterministic encryption routines:</strong> Strictly typed and bounded cryptographic pipelines ensure absolute consistency across all supported environments.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>Validated algorithm outputs:</strong> Built-in integrity checks (Galois/Counter Mode authentication tags) verify that ciphertexts have not been tampered with.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>No silent transformations:</strong> The system enforces strict encoding boundaries (UTF-8, Base64) to prevent data corruption during transit or storage.</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Privacy */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8">
                                    <h3 className="text-large font-semibold text-accent mb-4">Privacy</h3>
                                    <ul className="space-y-3 list-none p-0 m-0">
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>No data retention:</strong> The architectural absence of a database strictly enforces the impossibility of retaining user files or text.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>No telemetry on encrypted payloads:</strong> We do not log, track, or analyze the volume, frequency, or metadata of local encryption requests.</span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="text-accent/50">✦</span>
                                            <span><strong>User-first data control:</strong> The user retains absolute, exclusive sovereignty over their keys and derived ciphertexts at all times.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="mb-16">
                            <h2 className="text-h4 text-text-primary mt-12 mb-6 border-b border-border/50 pb-4">
                                Security Architecture
                            </h2>
                            <p className="mb-8">
                                Cryptal operates on a zero-trust model where all cryptographic processing is strictly constrained to the user's execution environment. The application acts essentially as a delivery mechanism for a static, self-contained encryption engine.
                            </p>

                            {/* Minimal Visual Diagram */}
                            <div className="bg-white/[0.02] border border-border/50 rounded-xl p-8 mb-8 my-8 flex flex-col md:flex-row items-center justify-between gap-4 w-full overflow-x-auto text-sm">
                                {/* User Browser Box */}
                                <div className="border border-white/20 rounded-lg p-6 bg-background-secondary min-w-[200px] text-center shrink-0">
                                    <h4 className="font-semibold text-text-primary mb-2 m-0 text-base">User Browser</h4>
                                    <p className="text-text-secondary m-0 text-xs text-balance">Input Data & Master Keys</p>
                                </div>

                                {/* Flow Arrow */}
                                <div className="text-accent flex flex-col items-center opacity-70 px-4 md:rotate-0 rotate-90">
                                    <div className="h-4 md:h-px md:w-8 bg-accent/50"></div>
                                    <div className="-mt-1.5 md:-mt-[5px] md:-mr-[5px] md:ml-[50%] transform md:-translate-y-1/2">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </div>
                                </div>

                                {/* WebCrypto Engine Box */}
                                <div className="border border-accent/30 rounded-lg p-6 bg-accent/5 shadow-[0_0_20px_rgba(0,255,255,0.05)] min-w-[200px] text-center shrink-0 relative">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 uppercase text-[10px] tracking-widest text-accent bg-background-primary px-2 font-semibold">Local</div>
                                    <h4 className="font-semibold text-accent mb-2 m-0 text-base">WebCrypto Engine</h4>
                                    <p className="text-accent/70 m-0 text-xs text-balance">In-Memory Sandboxed Execution</p>
                                </div>

                                {/* Flow Arrow */}
                                <div className="text-white/40 flex flex-col items-center px-4 md:rotate-0 rotate-90">
                                    <div className="h-4 md:h-px md:w-8 bg-white/20"></div>
                                    <div className="-mt-1.5 md:-mt-[5px] md:-mr-[5px] md:ml-[50%] transform md:-translate-y-1/2">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </div>
                                </div>

                                {/* Output Box */}
                                <div className="border border-white/20 rounded-lg p-6 bg-background-secondary min-w-[200px] text-center shrink-0">
                                    <h4 className="font-semibold text-text-primary mb-2 m-0 text-base">Encrypted Output</h4>
                                    <p className="text-text-secondary m-0 text-xs text-balance">Safe Ciphertext</p>
                                </div>
                            </div>

                            <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4 mb-10 text-center">
                                <p className="text-red-400 font-semibold m-0 text-sm tracking-wide uppercase">No Server Processing. Zero Plaintext Transit.</p>
                            </div>

                            <ul className="space-y-4 list-disc pl-6">
                                <li>
                                    <strong className="text-text-primary">WebCrypto API usage:</strong> We rely exclusively on the browser's native, highly audited `<a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">window.crypto.subtle</a>` implementation, ensuring that low-level C++ cryptographic subroutines handle the heavy lifting safely.
                                </li>
                                <li>
                                    <strong className="text-text-primary">In-memory execution:</strong> Operational data buffers (such as ArrayBuffers holding derived key material) exist only in volatile heap memory, specifically isolated to the executing thread.
                                </li>
                                <li>
                                    <strong className="text-text-primary">Session-bound state:</strong> Cryptographic contexts are tied strictly to the React component lifecycle. Reversing a route or reloading the page deterministically annihilates the operational bounds.
                                </li>
                                <li>
                                    <strong className="text-text-primary">Automatic memory purge:</strong> When cipher pipelines finalize, JavaScript's Garbage Collector automatically marks the volatile context buffers for destruction, mathematically preventing memory extraction post-operation.
                                </li>
                            </ul>
                        </section>

                        <section className="mb-16">
                            <h2 className="text-h4 text-text-primary mt-12 mb-6 border-b border-border/50 pb-4">
                                Operational Security Controls
                            </h2>
                            <p className="mb-8">
                                Beyond our architectural guarantees, CryptAl enforces rigorous, verifiable operational processes across the entire software development lifecycle to prevent supply chain attacks and mitigate human error.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Role-based workflows */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-accent/30 transition-colors duration-300">
                                    <div className="text-accent mb-3">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>
                                    </div>
                                    <h4 className="font-semibold text-text-primary mb-2 m-0">Role-Based Workflows</h4>
                                    <p className="text-sm text-text-secondary m-0">
                                        Principle of least privilege governs all internal access. Production deployments require strictly separated authentication protocols independent from standard development zones.
                                    </p>
                                </div>

                                {/* Code Review */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-accent/30 transition-colors duration-300">
                                    <div className="text-accent mb-3">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    </div>
                                    <h4 className="font-semibold text-text-primary mb-2 m-0">Mandatory Code Review</h4>
                                    <p className="text-sm text-text-secondary m-0">
                                        Zero-exception policy requiring dual peer authorization on all pull requests impacting core cryptographic pipelines or foundational routing logic.
                                    </p>
                                </div>

                                {/* Vulnerability Scanning */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-accent/30 transition-colors duration-300">
                                    <div className="text-accent mb-3">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                    </div>
                                    <h4 className="font-semibold text-text-primary mb-2 m-0">Dependency Scanning</h4>
                                    <p className="text-sm text-text-secondary m-0">
                                        Automated, pre-commit Static Application Security Testing (SAST) and real-time NPM registry vulnerability monitoring to neutralize supply chain threats.
                                    </p>
                                </div>

                                {/* Secure CI/CD */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-accent/30 transition-colors duration-300">
                                    <div className="text-accent mb-3">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                                    </div>
                                    <h4 className="font-semibold text-text-primary mb-2 m-0">Secure CI/CD Pipelines</h4>
                                    <p className="text-sm text-text-secondary m-0">
                                        Deterministic build environments executed exclusively on secure, ephemeral runner instances. Artifacts are cryptographically hashed prior to deployment.
                                    </p>
                                </div>

                                {/* Periodic Audits */}
                                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-6 hover:border-accent/30 transition-colors duration-300 md:col-span-2">
                                    <div className="text-accent mb-3">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                    </div>
                                    <h4 className="font-semibold text-text-primary mb-2 m-0">Periodic Algorithm Audits</h4>
                                    <p className="text-sm text-text-secondary m-0">
                                        Structured review cadences against the NIST cryptographic standards lifecycle to ensure the WebCrypto primitive implementations (`AES-GCM`, `PBKDF2`) remain resilient against evolving brute-force or side-channel theoretical models.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-16">
                            <h2 className="text-h4 text-text-primary mt-12 mb-6 border-b border-border/50 pb-4">
                                Responsible Disclosure
                            </h2>
                            <p className="mb-8">
                                Cryptal encourages responsible security research. If you discover a vulnerability, please report it confidentially. We pledge to treat all legitimate inquiries seriously and professionally.
                            </p>

                            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8 max-w-2xl">
                                <h3 className="text-large text-text-primary mb-4 m-0 font-semibold">Report a Vulnerability</h3>
                                <p className="text-text-secondary text-sm mb-6 m-0">
                                    Please send encrypted or unencrypted vulnerability details directly to our security response team:
                                </p>

                                <div className="border border-accent/20 bg-accent/5 rounded-lg p-4 inline-flex items-center gap-3 mb-8 hover:bg-accent/10 transition-colors duration-300">
                                    <svg className="text-accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                    <a href="mailto:security@cryptal.io" className="text-accent font-medium tracking-wide hover:underline text-lg m-0 decoration-accent/30 underline-offset-4">
                                        security@cryptal.io
                                    </a>
                                </div>

                                <h4 className="font-semibold text-text-primary mb-4 m-0">Our Commitment</h4>
                                <ul className="space-y-3 list-none p-0 m-0">
                                    <li className="flex gap-3">
                                        <span className="text-accent/50">✦</span>
                                        <span><strong>Prompt acknowledgement:</strong> Triage and initial response within 48 hours.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-accent/50">✦</span>
                                        <span><strong>Transparent remediation:</strong> Direct lines of communication throughout the patching timeline.</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-accent/50">✦</span>
                                        <span><strong>Coordinated disclosure:</strong> We act in good faith to resolve and publicly attribute your findings upon deployment.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </article>

                </div>
            </section>
            <ContactSection />
        </main>
    );
}
