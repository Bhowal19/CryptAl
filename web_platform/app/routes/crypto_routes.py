from fastapi import APIRouter, Depends, HTTPException
from ..models.crypto_models import CryptoRequest, CryptoResponse
from ..services.crypto_service import process_crypto_request
from ..security.rate_limit import check_rate_limit

router = APIRouter(prefix="/crypto", tags=["Cryptography"])

@router.post("/encrypt", response_model=CryptoResponse, dependencies=[Depends(check_rate_limit)])
async def encrypt_route(request: CryptoRequest):
    if request.mode.lower() != "encrypt":
        raise HTTPException(status_code=400, detail="Mode must be 'encrypt' for this endpoint.")
        
    response = process_crypto_request(request)
    if not response.success:
        raise HTTPException(status_code=400, detail=response.error)
    return response

@router.post("/decrypt", response_model=CryptoResponse, dependencies=[Depends(check_rate_limit)])
async def decrypt_route(request: CryptoRequest):
    if request.mode.lower() != "decrypt":
        raise HTTPException(status_code=400, detail="Mode must be 'decrypt' for this endpoint.")
        
    if not request.state:
        raise HTTPException(status_code=400, detail="Decryption requires a state dictionary.")
        
    response = process_crypto_request(request)
    if not response.success:
        raise HTTPException(status_code=400, detail=response.error)
    return response

@router.get("/algorithms", dependencies=[Depends(check_rate_limit)])
async def get_algorithms():
    return {
        "success": True, 
        "algorithms": ["aes", "des", "twofish", "elgamal", "playfair", "hill"]
    }
