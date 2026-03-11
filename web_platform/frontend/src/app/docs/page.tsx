import React from "react";
import Navbar from "../../components/Navbar";
import ContactSection from "../../components/ContactSection";
import SidebarDocs from "../../components/SidebarDocs";
import DocumentationContent from "../../components/DocumentationContent";

export default function DocsPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen flex flex-col w-full bg-background-primary font-sans">
                <section className="max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-24">
                    <div className="grid grid-cols-[260px_1fr] gap-16">

                        {/* Left sidebar navigation */}
                        <div className="sticky top-24 h-max">
                            <SidebarDocs />
                        </div>

                        {/* Right documentation content */}
                        <div>
                            <DocumentationContent />
                        </div>

                    </div>
                </section>

                <ContactSection />
            </main>
        </>
    );
}
