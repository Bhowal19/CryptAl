import sys
import os
import io
from PIL import Image
import wave

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from web_platform.engine.crypto import aes
from web_platform.engine.stego import lsb_image
from web_platform.engine.stego import lsb_audio

def create_dummy_image():
    # Create a 100x100 red image
    img = Image.new('RGB', (100, 100), color='red')
    img_io = io.BytesIO()
    img.save(img_io, format='PNG')
    return img_io.getvalue()

def create_dummy_audio():
    # Create a simple 1-second silent WAV file
    audio_io = io.BytesIO()
    with wave.open(audio_io, 'wb') as wav:
        wav.setnchannels(1)
        wav.setsampwidth(1)
        wav.setframerate(10000)
        # 10000 frames of silence
        wav.writeframes(b'\x00' * 10000)
    return audio_io.getvalue()

def test_stego_roundtrip_image(run_id=""):
    print(f"\n--- Testing Image Steganography Round-Trip {run_id} ---")
    
    plaintext = "Short MSG!" # 10 chars, will pad to 16 bytes
    key = "TestKey123"
    
    # 1. Encrypt via AES
    enc_res = aes.encrypt(plaintext, key)
    ciphertext = enc_res["ciphertext"]
    dec_state = enc_res["decryption_state"]
    print(f"AES Encrypted block: {repr(ciphertext)[:15]}...")
    
    # 2. Embed into Image
    dummy_img = create_dummy_image()
    try:
        stego_img_bytes = lsb_image.encode_image(dummy_img, ciphertext)
        print("Embedded successfully into image memory buffer.")
    except Exception as e:
        print(f"Image Encoding Failed: {e}")
        return False
        
    # 3. Extract from Image
    try:
        extracted_ciphertext = lsb_image.decode_image(stego_img_bytes)
        print("Extracted successfully from image memory buffer.")
    except Exception as e:
        print(f"Image Decoding Failed: {e}")
        return False
        
    # 4. Decrypt via AES
    decrypted_text = aes.decrypt(extracted_ciphertext, dec_state)
    
    if decrypted_text != plaintext:
        print(f"Roundtrip match failed! Got '{decrypted_text}'")
        return False
        
    print(f"Image Steganography Validation {run_id} PASS.")
    return True

def test_stego_roundtrip_audio(run_id=""):
    print(f"\n--- Testing Audio Steganography Round-Trip {run_id} ---")
    
    plaintext = "Short MSG!" # 10 chars, will pad to 16 bytes
    key = "AudioKey123"
    
    # 1. Encrypt via AES
    enc_res = aes.encrypt(plaintext, key)
    ciphertext = enc_res["ciphertext"]
    dec_state = enc_res["decryption_state"]
    print(f"AES Encrypted block: {ciphertext[:15]}...")
    
    # 2. Embed into Audio
    dummy_audio = create_dummy_audio()
    try:
        stego_audio_bytes = lsb_audio.encode_audio(dummy_audio, ciphertext)
        print("Embedded successfully into audio memory buffer.")
    except Exception as e:
        print(f"Audio Encoding Failed: {e}")
        return False
        
    # 3. Extract from Audio
    try:
        extracted_ciphertext = lsb_audio.decode_audio(stego_audio_bytes)
        print("Extracted successfully from audio memory buffer.")
    except Exception as e:
        print(f"Audio Decoding Failed: {e}")
        return False
        
    # 4. Decrypt via AES
    decrypted_text = aes.decrypt(extracted_ciphertext, dec_state)
    
    if decrypted_text != plaintext:
        print(f"Roundtrip match failed! Got '{decrypted_text}'")
        return False
        
    print(f"Audio Steganography Validation {run_id} PASS.")
    return True


def run_all_stego_tests():
    print("BEGINNING STEGANOGRAPHY VALIDATION SUITE")
    
    # Image Multi-run test
    img_run1 = test_stego_roundtrip_image("(Run 1)")
    img_run2 = test_stego_roundtrip_image("(Run 2)")
    
    # Audio Multi-run test
    aud_run1 = test_stego_roundtrip_audio("(Run 1)")
    aud_run2 = test_stego_roundtrip_audio("(Run 2)")
    
    if all([img_run1, img_run2, aud_run1, aud_run2]):
        print("\nALL STEGANOGRAPHY VALIDATIONS PASSED. STATELESS FILE-FREE ROUNDTRIP CONFIRMED.")
    else:
        print("\nSTEGANOGRAPHY VALIDATION FAILED.")

if __name__ == "__main__":
    run_all_stego_tests()
