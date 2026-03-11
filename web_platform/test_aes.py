import sys
import os

# Add the root directory to the python path so we can import the original AES
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import AES as original_aes
from web_platform.engine.crypto import aes as new_aes

def verify_aes():
    text = "SecretMessage"
    key = "MySuperSecretKey"
    
    # Run original encryption
    try:
        orig_cipher, orig_tkey, orig_time = original_aes.encrypt(text, key)
    except Exception as e:
        print(f"Original encryption failed: {e}")
        return False
        
    # Run new stateless encryption
    try:
        new_result = new_aes.encrypt(text, key)
        new_cipher = new_result["ciphertext"]
        new_state = new_result["decryption_state"]
    except Exception as e:
        print(f"New engine encryption failed: {e}")
        return False
        
    # Compare ciphertexts
    if orig_cipher != new_cipher:
        print(f"AES Verification Failed! Ciphertexts do not match.")
        print(f"Original: {repr(orig_cipher)}")
        print(f"New:      {repr(new_cipher)}")
        return False
        
    # Run new stateless decryption
    try:
        new_decipher = new_aes.decrypt(new_cipher, new_state)
    except Exception as e:
        print(f"New engine decryption failed: {e}")
        return False
        
    if text != new_decipher:
        print(f"AES Verification Failed! Decrypted text does not match original plaintext.")
        print(f"Original Plaintext: {repr(text)}")
        print(f"New Decrypted text: {repr(new_decipher)}")
        return False

    print("AES Verification Passed!")
    return True

if __name__ == "__main__":
    verify_aes()
