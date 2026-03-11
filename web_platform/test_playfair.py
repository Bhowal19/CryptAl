import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import Playfair as original_playfair
from web_platform.engine.crypto import playfair as new_playfair

def run_test_case(text, key, test_name):
    print(f"--- Running Test: {test_name} ---")
    
    # Original encryption
    try:
        orig_cipher, orig_key1, orig_key2, orig_correct, orig_time = original_playfair.cipher(text, key)
    except Exception as e:
        print(f"Original encryption failed: {e}")
        return False
        
    # New stateless encryption
    try:
        new_result = new_playfair.encrypt(text, key)
        new_cipher = new_result["ciphertext"]
        new_state = new_result["decryption_state"]
    except Exception as e:
        print(f"New engine encryption failed: {e}")
        return False
        
    if orig_cipher != new_cipher:
        print(f"Playfair Verification Failed! Ciphertexts do not match.")
        print(f"Original: {repr(orig_cipher)}")
        print(f"New:      {repr(new_cipher)}")
        return False
        
    # Check state components
    if new_state["key1"] != orig_key1 or new_state["key2"] != orig_key2 or new_state["correct"] != orig_correct:
        print(f"Playfair Verification Failed! State dictionaries do not match originally explicitly returned globals.")
        return False

    # Original decryption
    try:
        # Original decipher modifies `correct` list during its anti-pattern loop if we aren't careful,
        # but original `Playfair.py` didn't actually do that because it passed `correct` directly without modification to it.
        # Wait, the anti-pattern `temp.remove(i)` only removes from `temp`. 
        orig_decipher, orig_d_time = original_playfair.decipher(orig_cipher, orig_key1, orig_key2, orig_correct)
    except Exception as e:
        print(f"Original decryption failed: {e}")
        return False
        
    # New stateless decryption
    try:
        new_decipher = new_playfair.decrypt(new_cipher, new_state)
    except Exception as e:
        print(f"New engine decryption failed: {e}")
        return False
        
    if orig_decipher != new_decipher:
        print(f"Playfair Verification Failed! Decrypted text does not match original decrypted text.")
        print(f"Original Decrypted text: {repr(orig_decipher)}")
        print(f"New Decrypted text:      {repr(new_decipher)}")
        return False

    print(f"Test '{test_name}' Passed!\n")
    return True

def verify_playfair():
    cases = [
        ("Normal Sentence", "SECRET", "Normal Message"),
        ("HELLO WORLD", "KEYWORD", "Duplicate Letters"),
        ("HI", "KEY", "Odd-length String"),
        ("QALXTX", "XRAY", "Natural X and Q"),
        ("miXEd cASe", "PlayFaIR", "Mixed Casing")
    ]
    
    for text, key, test_name in cases:
        if not run_test_case(text, key, test_name):
            print("VERIFICATION FAILED AND HALTED.")
            return

    print("ALL PLAYFAIR VERIFICATION TESTS PASSED!")

if __name__ == "__main__":
    verify_playfair()
