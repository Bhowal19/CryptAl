import Link from "next/link";

export default function FinalCTA() {
    return (
        <section className="w-full bg-background-primary py-24 px-6 lg:px-12 flex flex-col items-center">
            <div className="max-w-3xl mx-auto w-full flex flex-col items-center text-center gap-8">

                <div className="flex flex-col gap-4">
                    <h2 className="text-h3 text-text-primary font-bold tracking-tight">
                        Ready to encrypt with confidence?
                    </h2>
                    <p className="text-large text-text-secondary font-medium">
                        Enterprise-grade client-side encryption. Zero retention. Full control.
                    </p>
                </div>

                <Link
                    href="#encrypt"
                    className="inline-flex justify-center items-center bg-accent text-text-inverse px-10 py-4 rounded-md text-medium font-bold hover:opacity-90 transition-all duration-150 ease-out hover:-translate-y-[1px] hover:shadow-md active:translate-y-0"
                >
                    Start Encrypting
                </Link>

            </div>
        </section>
    );
}
