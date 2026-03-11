from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

class CryptoRequest(BaseModel):
    algorithm: str = Field(..., description="The algorithm to use (e.g., aes, des, twofish, elgamal, playfair, hill)")
    mode: str = Field(..., description="Operation mode: 'encrypt' or 'decrypt'")
    data: str = Field(..., description="The text to encrypt/decrypt")
    key: Optional[str] = Field(None, description="The encryption key (some algorithms may not require it or have it generated)")
    state: Optional[Dict[str, Any]] = Field(None, description="The state dictionary required for decryption")

class CryptoResponse(BaseModel):
    success: bool
    result: Optional[str] = None
    state: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
