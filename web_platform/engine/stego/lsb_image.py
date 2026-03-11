# WARNING: Educational Steganography Implementation
# Not Secure for Production Use
# Behavior preserved from original desktop application

import io
from PIL import Image
import numpy as np
from ..exceptions import StegoError

def encode_image(image_bytes: bytes, message: str) -> bytes:
    """
    Encodes a message into an image using LSB steganography entirely in memory.
    
    Memory Safety Warning:
    This function loads the ENTIRE image into a numpy array in memory.
    Large images will consume significant RAM.
    
    Source: Original LSBImage.py (with forced "$t3g0" delimiter)
    """
    try:
        # Read the image from bytes
        img = Image.open(io.BytesIO(image_bytes))
        width, height = img.size
        
        # Load the full image into memory
        array = np.array(list(img.getdata()))

        if img.mode == 'RGB':
            n = 3
        elif img.mode == 'RGBA':
            n = 4
        else:
            raise StegoError("Unsupported image mode. Must be RGB or RGBA.")
            
        total_pixels = array.size // n

        # Preserve the original bug: it appends "$t3g0" but later checks for "Stego"
        message += "$t3g0"
        b_message = ''.join([format(ord(i), "08b") for i in message])
        req_pixels = len(b_message)

        if req_pixels > total_pixels:
            raise StegoError("ERROR: Need larger file size for this message")

        index = 0
        for p in range(total_pixels):
            for q in range(0, 3):
                if index < req_pixels:
                    # Modify the LSB correctly as per original script
                    array[p][q] = int(bin(array[p][q])[2:9] + b_message[index], 2)
                    index += 1

        array = array.reshape(height, width, n)
        enc_img = Image.fromarray(array.astype('uint8'), img.mode)
        
        # Save to memory instead of fixed dest = "encrypt.png"
        output_io = io.BytesIO()
        enc_img.save(output_io, format="PNG")
        return output_io.getvalue()
        
    except Exception as e:
        raise StegoError(f"Image steganography encoding failed: {e}")

def decode_image(image_bytes: bytes) -> str:
    """
    Decodes a message from an image using LSB steganography entirely in memory.
    
    Memory Safety Warning:
    This function loads the ENTIRE image into a numpy array in memory.
    Large images will consume significant RAM.
    
    Source: Original LSBImage.py (with expected "Stego" mismatched delimiter and slice bug)
    """
    try:
        img = Image.open(io.BytesIO(image_bytes))
        
        # Load the full image into memory
        array = np.array(list(img.getdata()))

        if img.mode == 'RGB':
            n = 3
        elif img.mode == 'RGBA':
            n = 4
        else:
            raise StegoError("Unsupported image mode. Must be RGB or RGBA.")
            
        total_pixels = array.size // n

        hidden_bits = ""
        for p in range(total_pixels):
            for q in range(0, 3):
                hidden_bits += (bin(array[p][q])[2:][-1])

        hidden_bits = [hidden_bits[i:i+8] for i in range(0, len(hidden_bits), 8)]

        message = ""
        for i in range(len(hidden_bits)):
            # Preserve the original mismatching bug exactly
            if message[-5:] == "Stego":
                break
            else:
                message += chr(int(hidden_bits[i], 2))
                
        # The original unconditionally returned message[:-5]. We do that to mirror the exact behavior,
        # regardless of whether the delimiter check actually naturally broke the loop or not. 
        # Actually original did: return message[:-5], so we pass that transparently.
        return message[:-5]
        
    except Exception as e:
        raise StegoError(f"Image steganography decoding failed: {e}")
