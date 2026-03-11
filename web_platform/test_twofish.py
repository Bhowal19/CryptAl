import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import Twofish as original_twofish
from web_platform.engine.crypto import twofish as new_twofish

def run_test_case(text, key, test_name):
    print(f"--- Running Test: {test_name} ---")
    
    orig_exc = None
    new_exc = None
    
    # Original encryption
    try:
        orig_cipher, orig_key, orig_time = original_twofish.encrypt(text, key)
    except Exception as e:
        orig_exc = str(e)
        
    # New stateless encryption
    try:
        new_result = new_twofish.encrypt(text, key)
        if not new_exc:  # only assign if no exception raised
            new_cipher = new_result["ciphertext"]
            new_state = new_result["decryption_state"]
    except Exception as e:
        new_exc = str(e)
        
    if orig_exc or new_exc:
        if orig_exc and new_exc:
            print(f"Test '{test_name}' Passed! (Both threw exceptions predictably)")
            return True
        else:
            print(f"Twofish Verification Failed! Exception mismatch.")
            print(f"Original exception: {orig_exc}")
            print(f"New exception: {new_exc}")
            return False
        
    if orig_cipher != new_cipher:
        print(f"Twofish Verification Failed! Ciphertexts do not match.")
        print(f"Original: {repr(orig_cipher)}")
        print(f"New:      {repr(new_cipher)}")
        return False
        
    # Original decryption
    try:
        orig_decipher, orig_d_time = original_twofish.decrypt(orig_cipher, orig_key)
    except Exception as e:
        orig_exc = str(e)
        
    # New stateless decryption
    try:
        new_decipher = new_twofish.decrypt(new_cipher, new_state)
    except Exception as e:
        new_exc = str(e)
        
    if orig_exc or new_exc:
        if orig_exc and new_exc:
            print(f"Test '{test_name}' Passed! (Both decrypted with exceptions predictably)")
            return True
        else:
            print(f"Twofish Verification Failed! Decryption Exception mismatch.")
            print(f"Original exception: {orig_exc}")
            print(f"New exception: {new_exc}")
            return False
            
    if orig_decipher != new_decipher:
        print(f"Twofish Verification Failed! Decrypted text does not match original decrypted text.")
        print(f"Original Decrypted text: {repr(orig_decipher)}")
        print(f"New Decrypted text: {repr(new_decipher)}")
        return False

    print(f"Test '{test_name}' Passed!\n")
    return True

def verify_twofish():
    cases = [
        ("NormalMessage", "SecretKey", "Standard Plaintext"),
        ("Hi", "Key", "Short Plaintext"),
        ("ThisIsAVeryLongMessageThatSpansMultipleBlocksBecauseWeNeedToTestIt", "LongKeyWithLotsOfCharacters123", "Long Plaintext"),
        ("Special@Chars! $", "W31rDK3y^", "Special Characters")
    ]
    
    for text, key, test_name in cases:
        if not run_test_case(text, key, test_name):
            print("VERIFICATION FAILED AND HALTED.")
            return

    print("ALL TWOFISH VERIFICATION TESTS PASSED!")

if __name__ == "__main__":
    verify_twofish()
