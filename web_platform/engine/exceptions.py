class EngineError(Exception):
    """Base class for all engine-related exceptions."""
    pass

class EncryptionError(EngineError):
    """Raised when an error occurs during encryption."""
    pass

class DecryptionError(EngineError):
    """Raised when an error occurs during decryption."""
    pass

class StegoError(EngineError):
    """Raised when an error occurs during steganography encoding or decoding."""
    pass
