# WARNING: Educational Steganography Implementation
# Not Secure for Production Use
# Behavior preserved from original desktop application

import wave
import io
from ..exceptions import StegoError

def encode_audio(audio_bytes: bytes, message: str) -> bytes:
    """
    Encodes a message into an audio file using LSB steganography entirely in memory.
    
    Memory Safety Warning:
    This function loads the ENTIRE audio file into a bytearray in memory.
    Large audio files will consume significant RAM.
    
    Source: Original LSBAudio.py (with excessive '#' padding constraint)
    """
    try:
        # Read the audio from bytes
        audio_io = io.BytesIO(audio_bytes)
        audio = wave.open(audio_io, mode="rb")
        
        # Load full audio frames into memory
        frame_bytes = bytearray(list(audio.readframes(audio.getnframes())))
        
        string = message
        # Preserve original padding bug (multiplying literal string '#' by a potentially large integer)
        padding_count = int((len(frame_bytes) - (len(string)*8*8))/8)
        if padding_count > 0:
            string = string + padding_count * '#'
            
        # Create bits using the EXACT same list comprehension structure
        bits = list(map(int, ''.join([bin(ord(i)).lstrip('0b').rjust(8,'0') for i in string])))
        
        if len(bits) > len(frame_bytes):
            raise StegoError("ERROR: Need larger audio file size for this message")
            
        for i, bit in enumerate(bits):
            frame_bytes[i] = (frame_bytes[i] & 254) | bit
            
        frame_modified = bytes(frame_bytes)
        
        # Write modified audio dynamically to memory
        output_io = io.BytesIO()
        newAudio = wave.open(output_io, 'wb')
        newAudio.setparams(audio.getparams())
        newAudio.writeframes(frame_modified)
        
        newAudio.close()
        audio.close()
        
        return output_io.getvalue()
        
    except Exception as e:
        raise StegoError(f"Audio steganography encoding failed: {e}")

def decode_audio(audio_bytes: bytes) -> str:
    """
    Decodes a message from an audio file using LSB steganography entirely in memory.
    
    Memory Safety Warning:
    This function loads the ENTIRE audio file into a bytearray in memory.
    Large audio files will consume significant RAM.
    
    Source: Original LSBAudio.py (with expected "###" split bug)
    """
    try:
        audio_io = io.BytesIO(audio_bytes)
        audio = wave.open(audio_io, mode='rb')
        
        # Load full audio frames into memory
        frame_bytes = bytearray(list(audio.readframes(audio.getnframes())))
        
        extracted = [frame_bytes[i] & 1 for i in range(len(frame_bytes))]
        
        # Explicit original unoptimized bit-twiddling approach
        string = "".join(chr(int("".join(map(str, extracted[i:i+8])), 2)) for i in range(0, len(extracted), 8))
        
        # Original strict splitting logic based on bug payload padding
        decoded = string.split("###")[0]
        
        audio.close()
        
        return decoded
        
    except Exception as e:
        raise StegoError(f"Audio steganography decoding failed: {e}")
