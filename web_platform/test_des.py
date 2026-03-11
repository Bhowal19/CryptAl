import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import DES as original_des
from web_platform.engine.crypto import des as new_des

def verify_des():
    text = "SecretData"
    key = "MyKey"
    
    # We clear original_des globals just in case
    original_des.rk = []
    original_des.rkb = []

    try:
        orig_cipher, orig_rk, orig_rkb, orig_time = original_des.encrypt(text, key)
    except Exception as e:
        print(f"Original encryption failed: {e}")
        return False
        
    try:
        new_result = new_des.encrypt(text, key)
        new_cipher = new_result["ciphertext"]
        new_state = new_result["decryption_state"]
    except Exception as e:
        print(f"New engine encryption failed: {e}")
        return False
        
    if orig_cipher != new_cipher:
        print(f"DES Verification Failed! Ciphertexts do not match.")
        print(f"Original: {repr(orig_cipher)}")
        print(f"New:      {repr(new_cipher)}")
        return False
        
    try:
        orig_decipher, orig_d_time = original_des.decrypt(orig_cipher, orig_rk, orig_rkb)
    except Exception as e:
        print(f"Original decryption failed: {e}")
        return False
        
    try:
        new_decipher = new_des.decrypt(new_cipher, new_state)
    except Exception as e:
        print(f"New engine decryption failed: {e}")
        return False
        
    if orig_decipher != new_decipher:
        print(f"DES Verification Failed! Decrypted text does not match original decrypted text.")
        print(f"Original Decrypted text: {repr(orig_decipher)}")
        print(f"New Decrypted text: {repr(new_decipher)}")
        return False

    print("DES Verification Passed!")
    return True

if __name__ == "__main__":
    verify_des()
