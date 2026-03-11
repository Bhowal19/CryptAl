"use client";

import { useState, useEffect } from "react";
import { fetchAlgorithms, processCrypto } from "@/lib/api";
import Link from "next/link";
import { Document, Packer, Paragraph, TextRun } from "docx";
import * as mammoth from "mammoth";
import jsPDF from "jspdf";

export default function CryptoApp({ compact = false }: { compact?: boolean }) {
    const [algorithms, setAlgorithms] = useState<string[]>([]);
    const [algo, setAlgo] = useState<string>("aes");
    const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
    const [dataInput, setDataInput] = useState("");
    const [keyInput, setKeyInput] = useState("");
    const [stateInput, setStateInput] = useState("");

    const [loading, setLoading] = useState(false);
    const [parsingFile, setParsingFile] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [resultText, setResultText] = useState("");
    const [resultState, setResultState] = useState<any>(null);
    const [autoClearTimer, setAutoClearTimer] = useState<number>(0);
    const [clearedMessage, setClearedMessage] = useState(false);

    useEffect(() => {
        fetchAlgorithms()
            .then(res => {
                if (res.algorithms && res.algorithms.length > 0) {
                    setAlgorithms(res.algorithms);
                    setAlgo(res.algorithms[0]);
                }
            })
            .catch(err => {
                setError(`Failed to load algorithms: ${err.message}`);
            });
    }, []);

    const handleReset = () => {
        setAlgo(algorithms[0] || "aes");
        setMode("encrypt");
        setDataInput("");
        setKeyInput("");
        setStateInput("");
        setResultText("");
        setResultState(null);
        setError(null);
        setLoading(false);
        setParsingFile(false);
        setClearedMessage(false);
    };

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (autoClearTimer > 0 && resultText) {
            timeoutId = setTimeout(() => {
                setResultText("");
                setResultState(null);
                setError(null);
                setClearedMessage(true);
                setTimeout(() => setClearedMessage(false), 3000);
            }, autoClearTimer * 1000);
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [resultText, autoClearTimer]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 1048576) {
            setError("File must be smaller than 1MB");
            return;
        }

        setParsingFile(true);
        setError(null);

        try {
            if (file.name.endsWith('.txt')) {
                const text = await file.text();
                setDataInput(text);

            } else if (file.name.endsWith('.docx')) {
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.extractRawText({ arrayBuffer });
                setDataInput(result.value);

            } else if (file.name.endsWith('.pdf')) {
                try {
                    const pdfjsLib = await import('pdfjs-dist');
                    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
                    const arrayBuffer = await file.arrayBuffer();
                    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
                    let fullText = "";
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const content = await page.getTextContent();
                        const pageText = content.items.map((item: any) => item.str).join(" ");
                        fullText += pageText + "\n";
                    }
                    setDataInput(fullText.trim());
                } catch (e) {
                    console.error("PDF Parsing Error:", e);
                    setError("Failed to extract text from PDF directly in the browser. Consider a simpler file format.");
                }

            } else {
                setError("Unsupported file format. Please upload .txt, .docx, or .pdf");
            }
        } catch (err) {
            setError("Failed to parse file. Ensure it is a valid document.");
        } finally {
            setParsingFile(false);
            e.target.value = "";
        }
    };

    const handleExecute = async () => {
        setLoading(true);
        setError(null);
        setResultText("");
        setResultState(null);
        setClearedMessage(false);

        try {
            let stateObj = null;
            if (mode === "decrypt" && stateInput) {
                try {
                    stateObj = JSON.parse(stateInput);
                } catch (e) {
                    throw new Error("Invalid JSON in state input");
                }
            }

            const reqData = {
                algorithm: algo,
                mode,
                data: dataInput,
                ...(keyInput && { key: keyInput }),
                ...(stateObj && { state: stateObj }),
            };

            const res = await processCrypto(reqData);

            setResultText(res.result || "");
            if (res.state) {
                setResultState(res.state);
            }

        } catch (err: any) {
            setError(err.message || "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    const downloadTxt = () => {
        if (!resultText) return;
        const blob = new Blob([resultText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "encrypted_text.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadDocx = async () => {
        if (!resultText) return;
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: resultText,
                                    font: "Courier New",
                                }),
                            ],
                        }),
                    ],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "encrypted_text.docx";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const downloadPdf = () => {
        if (!resultText) return;
        const doc = new jsPDF();
        doc.setFont("courier", "normal");
        doc.setFontSize(10);

        const splitText = doc.splitTextToSize(resultText, 180);
        let yPos = 10;

        for (let i = 0; i < splitText.length; i++) {
            if (yPos > 280) {
                doc.addPage();
                yPos = 10;
            }
            doc.text(splitText[i], 15, yPos);
            yPos += 5;
        }

        doc.save("encrypted_text.pdf");
    };

    return (
        <div className={`${compact ? 'w-full flex-1 space-y-4 max-h-[600px] overflow-y-auto pr-2' : 'max-w-2xl mx-auto space-y-6 w-full'}`}>
            {!compact && (
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Crypto Interface</h1>
                    <Link href="/" className="text-blue-400 hover:text-blue-300">← Back Home</Link>
                </div>
            )}

            {error && (
                <div className={`border border-red-500 rounded-md bg-red-900/50 ${compact ? 'p-3 text-sm' : 'p-4'}`}>
                    {error}
                </div>
            )}

            <div className={`grid ${compact ? 'gap-3' : 'gap-4'}`}>
                <div className={`flex ${compact ? 'gap-3' : 'gap-4'}`}>
                    <div className="flex flex-col w-1/2">
                        <label className="mb-1 text-sm text-gray-400">Algorithm</label>
                        <select
                            title="algorithm"
                            value={algo}
                            onChange={e => setAlgo(e.target.value)}
                            className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                        >
                            {algorithms.map(a => (
                                <option key={a} value={a}>{a.toUpperCase()}</option>
                            ))}
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
                            <option value="encrypt">Encrypt</option>
                            <option value="decrypt">Decrypt</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="flex justify-between items-end mb-1">
                        <label className="text-sm text-gray-400">Data ({mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'})</label>
                        <label className="text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded cursor-pointer transition-colors text-gray-200">
                            {parsingFile ? "Parsing..." : "Upload File"}
                            <input
                                type="file"
                                accept=".txt,.docx,.pdf"
                                onChange={handleFileUpload}
                                className="hidden"
                                disabled={parsingFile}
                            />
                        </label>
                    </div>
                    <textarea
                        title="text data"
                        value={dataInput}
                        onChange={e => setDataInput(e.target.value)}
                        className={`bg-gray-800 border border-gray-700 rounded-md text-white ${compact ? 'p-2 min-h-24 text-sm' : 'p-2 min-h-32'}`}
                        disabled={parsingFile}
                        placeholder={parsingFile ? "Extracting text..." : ""}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 text-sm text-gray-400">Key (If required)</label>
                    <input
                        title="key parameter"
                        type="text"
                        value={keyInput}
                        onChange={e => setKeyInput(e.target.value)}
                        className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    />
                </div>

                {mode === "decrypt" && (
                    <div className="flex flex-col">
                        <label className="mb-1 text-sm text-gray-400">State JSON (Required for Decrypt)</label>
                        <textarea
                            title="json decryption state"
                            value={stateInput}
                            onChange={e => setStateInput(e.target.value)}
                            className={`bg-gray-800 border border-gray-700 rounded-md font-mono text-green-400 ${compact ? 'p-2 min-h-24 text-xs' : 'p-2 min-h-32 text-sm'}`}
                        />
                    </div>
                )}

                <div className="flex flex-col items-end w-full">
                    <div className="flex items-center gap-2 mb-2">
                        <label className="text-sm text-gray-400">Auto clear result after:</label>
                        <select
                            title="auto clear timer"
                            value={autoClearTimer}
                            onChange={e => setAutoClearTimer(Number(e.target.value))}
                            className="p-1 text-sm bg-gray-800 border border-gray-700 rounded-md text-white"
                        >
                            <option value={0}>Off</option>
                            <option value={30}>30 seconds</option>
                            <option value={60}>1 minute</option>
                            <option value={300}>5 minutes</option>
                        </select>
                    </div>
                    <div className={`flex w-full ${compact ? 'gap-3' : 'gap-4'}`}>
                        <button
                            onClick={handleExecute}
                            disabled={loading || !dataInput}
                            className={`flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-md transition-colors font-semibold ${compact ? 'px-3 py-2 text-sm' : 'px-4 py-3'}`}
                        >
                            {loading ? "Executing..." : "Execute"}
                        </button>
                        <button
                            onClick={handleReset}
                            type="button"
                            className={`bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 text-white rounded-md transition-colors font-semibold ${compact ? 'px-4 py-2 text-sm' : 'px-6 py-3'}`}
                            disabled={loading}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {clearedMessage && (
                <div className="p-3 bg-green-900/50 border border-green-500 text-green-300 rounded-md text-sm text-center transition-opacity">
                    Result auto-cleared.
                </div>
            )}

            {(resultText || resultState) && (
                <div className="mt-8 p-6 bg-gray-800 border border-gray-700 rounded-md space-y-4">
                    <h2 className="text-xl font-bold border-b border-gray-700 pb-2">Results</h2>

                    {resultText && (
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-sm text-gray-400 block">Output Text</label>
                                {mode === "encrypt" && (
                                    <div className="flex gap-2">
                                        <button onClick={downloadTxt} className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">TXT</button>
                                        <button onClick={downloadDocx} className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">DOCX</button>
                                        <button onClick={downloadPdf} className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded">PDF</button>
                                    </div>
                                )}
                            </div>
                            <div className={`bg-gray-900 border border-gray-700 rounded break-all whitespace-pre-wrap ${compact ? 'p-2 text-sm' : 'p-3'}`}>
                                {resultText}
                            </div>
                        </div>
                    )}

                    {resultState && (
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Returned State (Save for Decryption)</label>
                            <pre className="p-3 bg-gray-900 border border-gray-700 rounded overflow-x-auto text-sm text-green-400">
                                {JSON.stringify(resultState, null, 2)}
                            </pre>
                        </div>
                    )}

                    <button
                        onClick={() => {
                            if (resultState && mode === 'encrypt') {
                                setStateInput(JSON.stringify(resultState, null, 2));
                                setDataInput(resultText);
                                setMode("decrypt");
                                window.scrollTo(0, 0);
                            }
                        }}
                        className="text-sm text-blue-400 hover:text-blue-300 underline"
                    >
                        Copy to Input and set to Decrypt
                    </button>
                </div>
            )}
        </div>
    );
}
