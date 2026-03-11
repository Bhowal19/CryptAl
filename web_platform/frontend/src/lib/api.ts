const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8001/api/v1";

export async function fetchAlgorithms() {
  const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/crypto/algorithms`);
  if (!res.ok) {
    throw new Error("Failed to fetch algorithms");
  }
  return res.json();
}

export async function processCrypto(requestData: any) {
  const endpoint = requestData.mode === "encrypt" ? "/crypto/encrypt" : "/crypto/decrypt";
  const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || data.error || "An error occurred");
  }
  return data;
}

export async function encodeStego(algorithm: string, file: File, message: string) {
  const formData = new FormData();
  formData.append("algorithm", algorithm);
  formData.append("message", message);
  formData.append("file", file);

  const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/stego/encode`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || "An error occurred during encoding");
  }

  // Response is a binary file (PNG or WAV)
  const blob = await res.blob();
  return blob;
}

export async function decodeStego(algorithm: string, file: File) {
  const formData = new FormData();
  formData.append("algorithm", algorithm);
  formData.append("file", file);

  const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/stego/decode`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.detail || data.error || "An error occurred during decoding");
  }

  return data;
}
