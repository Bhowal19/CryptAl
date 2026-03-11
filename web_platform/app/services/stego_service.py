from ...engine.stego import lsb_image, lsb_audio
from ...engine.exceptions import EngineError

def process_stego_encode(algorithm: str, file_bytes: bytes, message: str) -> bytes:
    algo = algorithm.lower()
    try:
        if algo == "image":
            return lsb_image.encode_image(file_bytes, message)
        elif algo == "audio":
            return lsb_audio.encode_audio(file_bytes, message)
        else:
            raise EngineError(f"Unsupported stego algorithm: {algo}")
    except EngineError as e:
        raise e
    except Exception as e:
        # Sanitize exception
        raise EngineError("An unexpected error occurred during steganography encoding.")
        
def process_stego_decode(algorithm: str, file_bytes: bytes) -> str:
    algo = algorithm.lower()
    try:
        if algo == "image":
            return lsb_image.decode_image(file_bytes)
        elif algo == "audio":
            return lsb_audio.decode_audio(file_bytes)
        else:
            raise EngineError(f"Unsupported stego algorithm: {algo}")
    except EngineError as e:
        raise e
    except Exception as e:
        # Sanitize exception
        raise EngineError("An unexpected error occurred during steganography decoding.")
