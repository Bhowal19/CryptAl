import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import Hill as original_hill
from web_platform.engine.crypto import hill as new_hill

def run_test_case(text, test_name):
    print(f"--- Running Test: {test_name} ---")
    
    # Original encryption
    try:
        orig_cipher, orig_K, orig_chk, orig_C, orig_time = original_hill.encrypt(text)
    except Exception as e:
        print(f"Original encryption failed: {e}")
        return False
        
    # New stateless encryption
    try:
        new_result = new_hill.encrypt(text)
        new_cipher = new_result["ciphertext"]
        new_state = new_result["decryption_state"]
    except Exception as e:
        print(f"New engine encryption failed: {e}")
        return False
        
    if orig_cipher != new_cipher:
        print(f"Hill Verification Failed! Ciphertexts do not match.")
        print(f"Original: {repr(orig_cipher)}")
        print(f"New:      {repr(new_cipher)}")
        return False
        
    # Check explicitly that globals were passed in state exactly
    if new_state["K"] != orig_K or new_state["chk"] != orig_chk or new_state["C"] != orig_C:
        print(f"Hill Verification Failed! State dictionaries do not match originally explicitly returned matrices.")
        return False

    # Original decryption - note original decrypt signature: decrypt(cipher, C, K, chk)
    try:
        orig_decipher, orig_d_time = original_hill.decrypt(orig_cipher, orig_C, orig_K, orig_chk)
    except Exception as e:
        print(f"Original decryption failed: {e}")
        return False
        
    # New stateless decryption
    try:
        new_decipher = new_hill.decrypt(new_cipher, new_state)
    except Exception as e:
        print(f"New engine decryption failed: {e}")
        return False
        
    if orig_decipher != new_decipher:
        print(f"Hill Verification Failed! Decrypted text does not match original decrypted text.")
        print(f"Original Decrypted text: {repr(orig_decipher)}")
        print(f"New Decrypted text:      {repr(new_decipher)}")
        return False

    print(f"Test '{test_name}' Passed!\n")
    return True

def verify_hill():
    cases = [
        ("helloworld", "Standard string"),
        ("hill", "Length not multiple of matrix size"),
        ("the quick brown fox", "String with spaces"),
        ("mIxEd cAsInG", "String with lowercase letters")
    ]
    
    # We do repeated runs to ensure no hidden state
    for text, test_name in cases:
        if not run_test_case(text, test_name + " (Run 1)"):
            print("VERIFICATION FAILED AND HALTED.")
            return
        if not run_test_case(text, test_name + " (Run 2)"):
            print("VERIFICATION FAILED AND HALTED.")
            return

    print("ALL HILL VERIFICATION TESTS PASSED!")

if __name__ == "__main__":
    verify_hill()
