from typing import Dict, Any, Tuple
from ..models.crypto_models import CryptoRequest, CryptoResponse
from ...engine.crypto import aes, des, twofish, elgamal, playfair, hill
from ...engine.exceptions import EngineError

def process_crypto_request(request: CryptoRequest) -> CryptoResponse:
    algo = request.algorithm.lower()
    mode = request.mode.lower()
    
    try:
        if algo == "aes":
            if mode == "encrypt":
                if not request.key: raise EngineError("AES requires a key")
                res = aes.encrypt(request.data, request.key)
                return CryptoResponse(success=True, result=res["ciphertext"], state=res["decryption_state"])
            elif mode == "decrypt":
                res = aes.decrypt(request.data, request.state or {})
                return CryptoResponse(success=True, result=res)
                
        elif algo == "des":
            if mode == "encrypt":
                if not request.key: raise EngineError("DES requires a key")
                res = des.encrypt(request.data, request.key)
                return CryptoResponse(success=True, result=res["ciphertext"], state=res["decryption_state"])
            elif mode == "decrypt":
                res = des.decrypt(request.data, request.state or {})
                return CryptoResponse(success=True, result=res)
                
        elif algo == "twofish":
            if mode == "encrypt":
                if not request.key: raise EngineError("Twofish requires a key")
                res = twofish.encrypt(request.data, request.key)
                return CryptoResponse(success=True, result=res["ciphertext"], state=res["decryption_state"])
            elif mode == "decrypt":
                res = twofish.decrypt(request.data, request.state or {})
                return CryptoResponse(success=True, result=res)
                
        elif algo == "elgamal":
            if mode == "encrypt":
                res = elgamal.encrypt(request.data)
                return CryptoResponse(success=True, result=res["ciphertext"], state=res["decryption_state"])
            elif mode == "decrypt":
                res = elgamal.decrypt(request.data, request.state or {})
                return CryptoResponse(success=True, result=res)
                
        elif algo == "playfair":
            if mode == "encrypt":
                if not request.key: raise EngineError("Playfair requires a key")
                res = playfair.encrypt(request.data, request.key)
                return CryptoResponse(success=True, result=res["ciphertext"], state=res["decryption_state"])
            elif mode == "decrypt":
                res = playfair.decrypt(request.data, request.state or {})
                return CryptoResponse(success=True, result=res)
                
        elif algo == "hill":
            if mode == "encrypt":
                res = hill.encrypt(request.data)
                return CryptoResponse(success=True, result=res["ciphertext"], state=res["decryption_state"])
            elif mode == "decrypt":
                res = hill.decrypt(request.data, request.state or {})
                return CryptoResponse(success=True, result=res)
                
        else:
            return CryptoResponse(success=False, error=f"Unsupported algorithm: {algo}")
            
    except EngineError as e:
        return CryptoResponse(success=False, error=str(e))
    except Exception as e:
        # Sanitize unexpected exceptions
        return CryptoResponse(success=False, error="An unexpected error occurred during execution.")
