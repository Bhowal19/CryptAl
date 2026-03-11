import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import ElGamal as original_elgamal
from web_platform.engine.crypto import elgamal as new_elgamal

def verify_elgamal():
    text = "secret message"
    
    print("--- Running ElGamal Verification ---")
    
    # 1. Original encryption
    try:
        orig_cipher, orig_a, orig_q, orig_p, orig_time = original_elgamal.encode(text)
    except Exception as e:
        print(f"Original encryption failed: {e}")
        return False
        
    # 2. Original decryption (to ensure it works and we capture output)
    try:
        orig_decipher, orig_d_time = original_elgamal.decode(orig_cipher, orig_a, orig_q, orig_p)
    except Exception as e:
        print(f"Original decryption failed: {e}")
        return False
        
    print(f"\nOriginal returned:\nCiphertext format: {type(orig_cipher)} with sample '{orig_cipher[:15]}...'\na={orig_a}, q={orig_q}, p={orig_p}")
    print(f"Original Decoded: '{orig_decipher}'")

    # 3. New stateless encryption
    try:
        new_result = new_elgamal.encrypt(text)
        new_cipher = new_result["ciphertext"]
        new_state = new_result["decryption_state"]
    except Exception as e:
        print(f"New engine encryption failed: {e}")
        return False
        
    print(f"\nNew Engine returned:\nCiphertext format: {type(new_cipher)} with sample '{new_cipher[:15]}...'\nState: {new_state}")
    
    # Validate structural matches
    if type(orig_cipher) != type(new_cipher):
        print("ElGamal Verification Failed! Ciphertext types do not match.")
        return False
        
    # Check if the format is fundamentally space-separated strings of integers
    try:
        _ = list(map(int, new_cipher.split()))
    except ValueError:
        print("ElGamal Verification Failed! New ciphertext is not a space-separated string of ints.")
        return False

    required_keys = {"a", "q", "p"}
    if set(new_state.keys()) != required_keys:
        print(f"ElGamal Verification Failed! Missing/extra keys in state. Got {new_state.keys()}")
        return False
        
    # 4. New stateless decryption
    try:
        new_decipher = new_elgamal.decrypt(new_cipher, new_state)
    except Exception as e:
        print(f"New engine decryption failed: {e}")
        return False
        
    print(f"New Decoded: '{new_decipher}'")
    
    # Randomness means we compare the final decrypted text against the original plaintext constraint
    # (Notice original converts text to lowercase in encode(), so let's compare with text.lower())
    expected_text = text.lower()
    if new_decipher != expected_text:
        print(f"ElGamal Verification Failed! Decrypted text does not match expected output.")
        print(f"Expected: {repr(expected_text)}")
        print(f"Got:      {repr(new_decipher)}")
        return False
        
    # Also verify that decrypting the original cipher with original state using our new engine works identically
    try:
        cross_decipher = new_elgamal.decrypt(orig_cipher, {"a": orig_a, "q": orig_q, "p": orig_p})
    except Exception as e:
        print(f"Cross-decryption failed: {e}")
        return False
        
    if cross_decipher != expected_text:
        print(f"ElGamal Cross-Verification Failed! Could not decrypt original cipher with new engine.")
        return False

    print("\nElGamal Verification Passed! Output structures mirror exactly and decryption works correctly across random instances.")
    return True

if __name__ == "__main__":
    verify_elgamal()
