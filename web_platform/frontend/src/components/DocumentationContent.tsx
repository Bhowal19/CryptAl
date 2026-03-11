"use client";

import React, { useState } from "react";

export default function DocumentationContent() {
    const [copied, setCopied] = useState(false);

    const apiCode = `import { encrypt } from "cryptal"\n\nconst result = encrypt("Hello World", {\n  algorithm: "AES-GCM"\n})\n\nconsole.log(result)`;

    const handleCopy = () => {
        navigator.clipboard.writeText(apiCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col space-y-16 text-text-secondary">
            {/* Intro Section */}
            <section id="docs-overview" className="flex flex-col space-y-4 scroll-mt-28">
                <h1 className="text-h3 font-semibold text-text-primary tracking-tight">
                    Cryptal Documentation
                </h1>
                <p className="text-body leading-relaxed">
                    Cryptal is an enterprise-grade, zero-trust cryptographic platform that operates entirely within your browser environment. It enables seamless, secure encryption and decryption of sensitive data without transmitting any plaintext information to a centralized server.
                </p>
                <hr className="border-white/10 mt-8" />
            </section>

            {/* Architecture Section */}
            <section id="architecture" className="flex flex-col space-y-4 pt-4 scroll-mt-28">
                <h2 className="text-h5 font-medium text-text-primary">
                    Architecture
                </h2>
                <p className="text-body leading-relaxed">
                    Unlike traditional platforms that send payloads to backend servers for processing, Cryptal performs all cryptographic operations—including key generation, encryption, and decryption—locally inside the browser using native WebCrypto APIs. This architecture ensures absolute zero-knowledge compliance, meaning our servers never see, store, or have the capability to expose your sensitive data or encryption keys.
                </p>

                {/* Architecture Diagram */}
                <div className="flex flex-col items-center space-y-4 py-8">
                    {/* User Browser Box */}
                    <div className="w-full max-w-sm rounded-lg border border-white/10 bg-white/[0.03] p-6 text-center">
                        <h3 className="text-text-primary font-medium mb-1">User Browser</h3>
                        <p className="text-text-secondary text-xs">Plaintext data is securely loaded into memory</p>
                    </div>

                    {/* Arrow Down */}
                    <span className="material-symbols-outlined text-white/20">arrow_downward</span>

                    {/* WebCrypto Engine Box */}
                    <div className="w-full max-w-sm rounded-lg border border-white/10 bg-white/[0.03] p-6 text-center">
                        <h3 className="text-text-primary font-medium mb-1">WebCrypto Engine</h3>
                        <p className="text-text-secondary text-xs">Native cryptographic primitives process the payload</p>
                    </div>

                    {/* Arrow Down */}
                    <span className="material-symbols-outlined text-white/20">arrow_downward</span>

                    {/* Encrypted Output Box */}
                    <div className="w-full max-w-sm rounded-lg border border-white/10 bg-white/[0.03] p-6 text-center">
                        <h3 className="text-text-primary font-medium mb-1">Encrypted Output</h3>
                        <p className="text-text-secondary text-xs">Ciphertext is rendered directly back to UI</p>
                    </div>
                </div>

                <hr className="border-white/10 mt-8" />
            </section>

            {/* Client-side Encryption Flow Section */}
            <section id="encryption-flow" className="flex flex-col space-y-6 pt-4 scroll-mt-28">
                <h2 className="text-h5 font-medium text-text-primary">
                    Client-side Encryption Flow
                </h2>
                <div className="flex flex-col space-y-3">
                    <p className="text-body leading-relaxed mb-2">
                        The entire cryptographic pipeline is executed sequentially without network transmission:
                    </p>
                    <ol className="list-decimal list-outside ml-5 space-y-3 text-body">
                        <li className="pl-2">
                            <span className="text-text-primary font-medium">User input received</span> - The plaintext payload is captured directly in the secure UI context.
                        </li>
                        <li className="pl-2">
                            <span className="text-text-primary font-medium">Algorithm selection</span> - Cryptographic primitives are initialized based on user preferences.
                        </li>
                        <li className="pl-2">
                            <span className="text-text-primary font-medium">Key generation</span> - A cryptographically secure random key is derived or generated using WebCrypto.
                        </li>
                        <li className="pl-2">
                            <span className="text-text-primary font-medium">Encryption execution</span> - The plaintext is transformed into ciphertext locally using the selected cipher.
                        </li>
                        <li className="pl-2">
                            <span className="text-text-primary font-medium">Encrypted output generated</span> - The resulting encrypted blob or string is rendered back to the user interface.
                        </li>
                    </ol>
                </div>
                <hr className="border-white/10 mt-8" />
            </section>

            {/* Supported Algorithms Section */}
            <section id="algorithms" className="flex flex-col space-y-6 pt-4 scroll-mt-28">
                <h2 className="text-h5 font-medium text-text-primary">
                    Supported Cryptographic Algorithms
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
                    <div className="flex flex-col space-y-3 bg-surface-elevated/20 p-5 rounded-xl border border-white/5">
                        <h3 className="text-base font-medium text-text-primary mb-1">Symmetric</h3>
                        <ul className="flex flex-col space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent/70"></div>
                                AES-256-GCM
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent/70"></div>
                                AES-CBC
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-3 bg-surface-elevated/20 p-5 rounded-xl border border-white/5">
                        <h3 className="text-base font-medium text-text-primary mb-1">Asymmetric</h3>
                        <ul className="flex flex-col space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent/70"></div>
                                RSA-OAEP
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent/70"></div>
                                ECDSA
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-3 bg-surface-elevated/20 p-5 rounded-xl border border-white/5">
                        <h3 className="text-base font-medium text-text-primary mb-1">Hashing</h3>
                        <ul className="flex flex-col space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent/70"></div>
                                SHA-256
                            </li>
                            <li className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent/70"></div>
                                SHA-512
                            </li>
                        </ul>
                    </div>
                </div>

                <p className="text-body leading-relaxed mt-4">
                    <span className="text-text-primary font-medium">When to use:</span> Symmetric encryption (AES-256-GCM) is widely considered the industry standard for securing resting data blocks. Asymmetric (RSA/ECDSA) should be reserved for secure key exchange or digital signatures due to its lower processing throughput. Hashing ensures data integrity and is fundamental for password stretching or data verification.
                </p>
                <hr className="border-white/10 mt-8" />
            </section>

            {/* API Section */}
            <section id="encrypt-api" className="flex flex-col space-y-6 pt-4 pb-8 scroll-mt-28">
                <h2 className="text-h5 font-medium text-text-primary">
                    Encrypt API
                </h2>
                <div className="flex flex-col space-y-3">
                    <p className="text-body leading-relaxed mb-2">
                        Integrating Cryptal into your workflow is highly streamlined.
                    </p>

                    <div className="relative group overflow-hidden rounded-lg bg-background-secondary border border-white/10 p-4 font-mono text-sm shadow-xl">
                        <button
                            onClick={handleCopy}
                            className="absolute top-3 right-3 p-2 rounded-md bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 transition-colors duration-200 z-10"
                            aria-label="Copy code snippet"
                        >
                            {copied ? (
                                <span className="material-symbols-outlined text-sm">check</span>
                            ) : (
                                <span className="material-symbols-outlined text-sm">content_copy</span>
                            )}

                            {/* Tooltip */}
                            <span
                                className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded shadow-lg transition-opacity duration-200 pointer-events-none ${copied ? 'opacity-100' : 'opacity-0'}`}
                            >
                                Copied!
                            </span>
                        </button>

                        <pre className="!bg-transparent !m-0 !p-0 overflow-x-auto text-text-secondary">
                            <code>
                                <span className="text-[#c678dd]">import</span> {"{"} encrypt {"}"} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">"cryptal"</span>{"\n\n"}
                                <span className="text-[#c678dd]">const</span> result <span className="text-[#56b6c2]">=</span> <span className="text-[#61afef]">encrypt</span>(<span className="text-[#98c379]">"Hello World"</span>, {"{"}{"\n"}
                                algorithm: <span className="text-[#98c379]">"AES-GCM"</span>{"\n"}
                                {"}"}){"\n\n"}
                                <span className="text-[#e5c07b]">console</span>.<span className="text-[#61afef]">log</span>(result)
                            </code>
                        </pre>
                    </div>
                </div>
                <hr className="border-white/10 mt-8" />
            </section>

            {/* Decrypt API Section */}
            <section id="decrypt-api" className="flex flex-col space-y-6 pt-4 scroll-mt-28">
                <h2 className="text-h5 font-medium text-text-primary">Decrypt API</h2>
                <div className="flex flex-col space-y-3">
                    <p className="text-body leading-relaxed">
                        The Decrypt API allows encrypted payloads generated by Cryptal to be restored to their original plaintext form directly inside the browser.
                    </p>
                    <p className="text-body leading-relaxed">
                        This operation never transmits encrypted data to any external server. All cryptographic execution occurs within the user's runtime environment using WebCrypto APIs.
                    </p>

                    <h3 className="text-base font-medium text-text-primary mt-4">Example</h3>
                    <div className="relative group overflow-hidden rounded-lg bg-background-secondary border border-white/10 p-4 font-mono text-sm shadow-xl">
                        <pre className="!bg-transparent !m-0 !p-0 overflow-x-auto text-text-secondary">
                            <code>
                                <span className="text-[#c678dd]">import</span> {"{"} decrypt {"}"} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">"cryptal"</span>{"\n\n"}
                                <span className="text-[#c678dd]">const</span> plaintext <span className="text-[#56b6c2]">=</span> <span className="text-[#61afef]">decrypt</span>(encryptedPayload, {"{"}{"\n"}
                                {"  "}algorithm: <span className="text-[#98c379]">"AES-GCM"</span>,{"\n"}
                                {"  "}key: userKey{"\n"}
                                {"}"}){"\n\n"}
                                <span className="text-[#e5c07b]">console</span>.<span className="text-[#61afef]">log</span>(plaintext)
                            </code>
                        </pre>
                    </div>

                    <h3 className="text-base font-medium text-text-primary mt-4">Parameters</h3>
                    <ul className="flex flex-col space-y-3 text-body">
                        <li>
                            <span className="text-text-primary font-medium">encryptedPayload</span>
                            <br />
                            The ciphertext generated from the Encrypt API.
                        </li>
                        <li>
                            <span className="text-text-primary font-medium">algorithm</span>
                            <br />
                            The cryptographic algorithm used for encryption.
                        </li>
                        <li>
                            <span className="text-text-primary font-medium">key</span>
                            <br />
                            The decryption key generated or supplied during encryption.
                        </li>
                    </ul>

                    <h3 className="text-base font-medium text-text-primary mt-4">Output</h3>
                    <p className="text-body leading-relaxed">
                        The API returns the decrypted plaintext string.
                    </p>
                </div>
            </section>

            {/* Response Format Section */}
            <section id="response-format" className="flex flex-col space-y-6 pt-4 scroll-mt-28">
                <h2 className="text-h5 font-medium text-text-primary">Response Format</h2>
                <div className="flex flex-col space-y-3">
                    <p className="text-body leading-relaxed">
                        All Cryptal encryption operations return structured response objects to maintain consistency across cryptographic workflows.
                    </p>

                    <h3 className="text-base font-medium text-text-primary mt-4">Example Response</h3>
                    <div className="relative group overflow-hidden rounded-lg bg-background-secondary border border-white/10 p-4 font-mono text-sm shadow-xl">
                        <pre className="!bg-transparent !m-0 !p-0 overflow-x-auto text-text-secondary">
                            <code>
                                {"{"}{"\n"}
                                <span className="text-[#e06c75]">"algorithm"</span>: <span className="text-[#98c379]">"AES-GCM"</span>,{"\n"}
                                <span className="text-[#e06c75]">"ciphertext"</span>: <span className="text-[#98c379]">"3f9a7d12ab09..."</span>,{"\n"}
                                <span className="text-[#e06c75]">"iv"</span>: <span className="text-[#98c379]">"8af12bc912..."</span>,{"\n"}
                                <span className="text-[#e06c75]">"timestamp"</span>: <span className="text-[#d19a66]">1712472123</span>{"\n"}
                                {"}"}
                            </code>
                        </pre>
                    </div>

                    <h3 className="text-base font-medium text-text-primary mt-4">Fields</h3>
                    <ul className="flex flex-col space-y-3 text-body">
                        <li>
                            <span className="text-text-primary font-medium">algorithm</span>
                            <br />
                            Specifies which encryption algorithm was used.
                        </li>
                        <li>
                            <span className="text-text-primary font-medium">ciphertext</span>
                            <br />
                            The encrypted output generated by the cryptographic engine.
                        </li>
                        <li>
                            <span className="text-text-primary font-medium">iv</span>
                            <br />
                            Initialization vector used for secure encryption operations.
                        </li>
                        <li>
                            <span className="text-text-primary font-medium">timestamp</span>
                            <br />
                            Execution timestamp used for debugging or auditing purposes.
                        </li>
                    </ul>
                </div>
                <hr className="border-white/10 mt-8" />
            </section>

            {/* Best Practices Section */}
            <section id="best-practices" className="flex flex-col space-y-6 pt-4 scroll-mt-28">
                <h2 className="text-h5 font-medium text-text-primary">Best Practices</h2>
                <div className="flex flex-col space-y-3">
                    <p className="text-body leading-relaxed">
                        When implementing Cryptal into production environments, it is important to follow secure cryptographic practices.
                    </p>

                    <h3 className="text-base font-medium text-text-primary mt-4">Recommendations</h3>
                    <ul className="list-disc list-outside ml-5 space-y-2 text-body">
                        <li className="pl-2">Always use modern encryption algorithms such as AES-256-GCM.</li>
                        <li className="pl-2">Never store encryption keys alongside encrypted data.</li>
                        <li className="pl-2">Rotate cryptographic keys periodically.</li>
                        <li className="pl-2">Avoid logging plaintext sensitive data.</li>
                        <li className="pl-2">Ensure secure transport layers when transmitting encrypted payloads.</li>
                    </ul>

                    <p className="text-body leading-relaxed mt-2">
                        Following these guidelines ensures strong security guarantees and reduces the risk of operational vulnerabilities.
                    </p>
                </div>
            </section>

            {/* Secure Usage Section */}
            <section id="secure-usage" className="flex flex-col space-y-6 pt-4 scroll-mt-28">
                <h2 className="text-h5 font-medium text-text-primary">Secure Usage</h2>
                <div className="flex flex-col space-y-3">
                    <p className="text-body leading-relaxed">
                        Cryptal is designed with a client-side encryption model, which means encryption is performed directly inside the user’s browser environment.
                    </p>
                    <p className="text-body leading-relaxed">
                        This architecture eliminates the need to transmit plaintext to a remote server.
                    </p>

                    <h3 className="text-base font-medium text-text-primary mt-4">Security Guarantees</h3>
                    <ul className="list-disc list-outside ml-5 space-y-2 text-body">
                        <li className="pl-2">Encryption executed entirely in browser runtime</li>
                        <li className="pl-2">No server-side plaintext exposure</li>
                        <li className="pl-2">Session-bound memory execution</li>
                        <li className="pl-2">Automatic data cleanup after execution</li>
                    </ul>

                    <p className="text-body leading-relaxed mt-2">
                        Developers should ensure that applications using Cryptal do not store sensitive plaintext unnecessarily.
                    </p>
                </div>
            </section>

            {/* Key Handling Section */}
            <section id="key-handling" className="flex flex-col space-y-6 pt-4 scroll-mt-28">
                <h2 className="text-h5 font-medium text-text-primary">Key Handling</h2>
                <div className="flex flex-col space-y-3">
                    <p className="text-body leading-relaxed">
                        Proper key management is critical for secure cryptographic operations.
                    </p>
                    <p className="text-body leading-relaxed">
                        Cryptal does not store keys or maintain persistent key storage.
                    </p>

                    <h3 className="text-base font-medium text-text-primary mt-4">Recommended Key Practices</h3>
                    <ul className="list-disc list-outside ml-5 space-y-2 text-body">
                        <li className="pl-2">Generate keys using secure random sources</li>
                        <li className="pl-2">Store keys in secure browser storage if persistence is required</li>
                        <li className="pl-2">Avoid exposing keys in application logs</li>
                        <li className="pl-2">Use environment-isolated key management where possible</li>
                    </ul>

                    <p className="text-body leading-relaxed mt-2">
                        Keys should always remain under the control of the end user or application owner.
                    </p>
                </div>
            </section>

            {/* Data Protection Section */}
            <section id="data-protection" className="flex flex-col space-y-6 pt-4 scroll-mt-28">
                <h2 className="text-h5 font-medium text-text-primary">Data Protection</h2>
                <div className="flex flex-col space-y-3">
                    <p className="text-body leading-relaxed">
                        Cryptal follows a strict data protection philosophy.
                    </p>
                    <p className="text-body leading-relaxed">
                        Sensitive information is processed entirely within the browser and is never transmitted to external infrastructure.
                    </p>

                    <h3 className="text-base font-medium text-text-primary mt-4">Core Data Principles</h3>
                    <ul className="list-disc list-outside ml-5 space-y-2 text-body">
                        <li className="pl-2">Zero data retention</li>
                        <li className="pl-2">No plaintext storage</li>
                        <li className="pl-2">No server processing</li>
                        <li className="pl-2">Local cryptographic execution</li>
                    </ul>

                    <p className="text-body leading-relaxed mt-2">
                        This architecture ensures user data remains under complete local control.
                    </p>
                </div>
                <hr className="border-white/10 mt-8" />
            </section>

            {/* Security Section */}
            <section id="security-section" className="flex flex-col space-y-6 pt-4 scroll-mt-28">
                <h2 className="text-h5 font-medium text-text-primary">Security</h2>
                <div className="flex flex-col space-y-3">
                    <p className="text-body leading-relaxed">
                        Cryptal is engineered with a security-first architecture.
                    </p>
                    <p className="text-body leading-relaxed">
                        All encryption operations rely on hardened browser cryptographic primitives provided by the WebCrypto API.
                    </p>

                    <h3 className="text-base font-medium text-text-primary mt-4">Security Layers</h3>
                    <ul className="list-disc list-outside ml-5 space-y-2 text-body">
                        <li className="pl-2">Browser-native cryptographic primitives</li>
                        <li className="pl-2">Secure random number generation</li>
                        <li className="pl-2">Strong encryption algorithms</li>
                        <li className="pl-2">Memory-safe execution models</li>
                    </ul>

                    <p className="text-body leading-relaxed mt-2">
                        These layers combine to deliver strong cryptographic guarantees without relying on centralized infrastructure.
                    </p>
                </div>
            </section>

            {/* SOC 2 Model Section */}
            <section id="soc2-model" className="flex flex-col space-y-6 pt-4 scroll-mt-28">
                <h2 className="text-h5 font-medium text-text-primary">SOC 2 Model</h2>
                <div className="flex flex-col space-y-3">
                    <p className="text-body leading-relaxed">
                        Cryptal aligns with several SOC 2 Trust Service Criteria principles.
                    </p>
                    <p className="text-body leading-relaxed">
                        Although Cryptal operates as a client-side encryption platform, its architecture reflects industry security standards.
                    </p>

                    <ul className="flex flex-col space-y-4 mt-4 text-body">
                        <li>
                            <span className="text-text-primary font-medium">Security</span>
                            <br />
                            Client-side encryption prevents exposure of plaintext to backend infrastructure.
                        </li>
                        <li>
                            <span className="text-text-primary font-medium">Availability</span>
                            <br />
                            Because encryption occurs locally in the browser, system availability does not depend on server uptime.
                        </li>
                        <li>
                            <span className="text-text-primary font-medium">Confidentiality</span>
                            <br />
                            Sensitive information is encrypted before leaving the user's control.
                        </li>
                        <li>
                            <span className="text-text-primary font-medium">Processing Integrity</span>
                            <br />
                            Cryptographic operations produce deterministic outputs using verified algorithms.
                        </li>
                    </ul>
                </div>
            </section>

            {/* Responsible Disclosure Section */}
            <section id="responsible-disclosure" className="flex flex-col space-y-6 pt-4 pb-16 scroll-mt-28">
                <h2 className="text-h5 font-medium text-text-primary">Responsible Disclosure</h2>
                <div className="flex flex-col space-y-3">
                    <p className="text-body leading-relaxed">
                        Cryptal encourages responsible security research.
                    </p>
                    <p className="text-body leading-relaxed">
                        If a vulnerability or security issue is discovered, please report it privately so it can be investigated and resolved.
                    </p>

                    <h3 className="text-base font-medium text-text-primary mt-4">Contact</h3>
                    <p className="text-body leading-relaxed">
                        <a href="mailto:security@cryptal.io" className="text-accent hover:underline">security@cryptal.io</a>
                    </p>

                    <p className="text-body leading-relaxed mt-2">
                        All vulnerability reports are handled with strict confidentiality.
                    </p>
                    <p className="text-body leading-relaxed">
                        The Cryptal team is committed to transparent remediation and coordinated disclosure practices.
                    </p>
                </div>
            </section>
        </div>
    );
}
