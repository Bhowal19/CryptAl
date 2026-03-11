"use client";

import { useState } from "react";
import { encodeStego, decodeStego } from "@/lib/api";
import Link from "next/link";

export default function StegoPage() {
    const [algo, setAlgo] = useState<string>("image");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [messageInput, setMessageInput] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [decodeResult, setDecodeResult] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.size > 1048576) {
                setError("File must be smaller than 1MB");
                setFile(null);
                return;
            }
            setFile(selectedFile);
            setError(null);
        }
    };

    const handleExecute = async () => {
        if (!file) {
            setError("Please select a file");
            return;
        }

        setLoading(true);
        setError(null);
        setDecodeResult("");

        try {
            if (mode === "encode") {
                if (!messageInput) throw new Error("Message required for encoding");

                const blob = await encodeStego(algo, file, messageInput);

                // Auto-download file
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = algo === "image" ? "stego_encoded.png" : "stego_encoded.wav";

                // Append to body, click, and clean up
                document.body.appendChild(a);
                a.click();

                // Cleanup to prevent memory leaks and stale URLs
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } else {
                const res = await decodeStego(algo, file);
                setDecodeResult(res.result || "");
            }
        } catch (err: any) {
            setError(err.message || "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Steganography Interface</h1>
                    <Link href="/" className="text-blue-400 hover:text-blue-300">← Back Home</Link>
                </div>

                {error && (
                    <div className="p-4 bg-red-900 border border-red-500 rounded-md">
                        {error}
                    </div>
                )}

                <div className="grid gap-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col w-1/2">
                            <label className="mb-1 text-sm text-gray-400">Media Type</label>
                            <select
                                title="algorithm"
                                value={algo}
                                onChange={e => setAlgo(e.target.value)}
                                className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                            >
                                <option value="image">Image (PNG)</option>
                                <option value="audio">Audio (WAV)</option>
                            </select>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label className="mb-1 text-sm text-gray-400">Mode</label>
                            <select
                                title="mode"
                                value={mode}
                                onChange={e => setMode(e.target.value as any)}
                                className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                            >
                                <option value="encode">Encode</option>
                                <option value="decode">Decode</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-sm text-gray-400">Carrier File (Max 1MB)</label>
                        <input
                            title="file picker"
                            type="file"
                            accept={algo === "image" ? "image/png, image/jpeg" : "audio/wav"}
                            onChange={handleFileChange}
                            className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                        />
                    </div>

                    {mode === "encode" && (
                        <div className="flex flex-col">
                            <label className="mb-1 text-sm text-gray-400">Ciphertext Message to Embed</label>
                            <textarea
                                title="message"
                                value={messageInput}
                                onChange={e => setMessageInput(e.target.value)}
                                className="p-2 bg-gray-800 border border-gray-700 rounded-md min-h-32 text-white"
                            />
                        </div>
                    )}

                    <button
                        onClick={handleExecute}
                        disabled={loading || !file || (mode === "encode" && !messageInput)}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-3 rounded-md transition-colors mt-4 font-semibold"
                    >
                        {loading ? "Processing..." : (mode === "encode" ? "Encode & Download" : "Extract Data")}
                    </button>
                </div>

                {decodeResult && (
                    <div className="mt-8 p-6 bg-gray-800 border border-gray-700 rounded-md space-y-4">
                        <h2 className="text-xl font-bold border-b border-gray-700 pb-2">Extracted Payload</h2>

                        <div>
                            <div className="p-3 bg-gray-900 border border-gray-700 rounded break-all whitespace-pre-wrap font-mono text-sm text-green-400">
                                {decodeResult}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
