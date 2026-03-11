import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Import original algorithms
import AES as orig_aes
import DES as orig_des
import Twofish as orig_twofish
import ElGamal as orig_elgamal
import Playfair as orig_playfair
import Hill as orig_hill

# Import new stateless engines
from web_platform.engine.crypto import aes as new_aes
from web_platform.engine.crypto import des as new_des
from web_platform.engine.crypto import twofish as new_twofish
from web_platform.engine.crypto import elgamal as new_elgamal
from web_platform.engine.crypto import playfair as new_playfair
from web_platform.engine.crypto import hill as new_hill

def test_aes():
    text, key = "Hello World", "AESKey"
    
    # Run 1
    orig_c, orig_tk, _ = orig_aes.encrypt(text, key)
    orig_d, _ = orig_aes.decrypt(orig_c, orig_tk)
    
    new_res1 = new_aes.encrypt(text, key)
    if new_res1["ciphertext"] != orig_c: return False
    new_d1 = new_aes.decrypt(new_res1["ciphertext"], new_res1["decryption_state"])
    if new_d1 != orig_d: return False
    
    # Run 2
    new_res2 = new_aes.encrypt(text, key)
    if new_res2["ciphertext"] != orig_c: return False
    new_d2 = new_aes.decrypt(new_res2["ciphertext"], new_res2["decryption_state"])
    if new_d2 != orig_d: return False
    
    return True

def test_des():
    text, key = "Secret12", "DESkey"
    orig_des.rk, orig_des.rkb = [], []
    orig_c, orig_rk, orig_rkb, _ = orig_des.encrypt(text, key)
    orig_d, _ = orig_des.decrypt(orig_c, orig_rk, orig_rkb)
    
    new_res1 = new_des.encrypt(text, key)
    if new_res1["ciphertext"] != orig_c: return False
    new_d1 = new_des.decrypt(new_res1["ciphertext"], new_res1["decryption_state"])
    if new_d1 != orig_d: return False
    
    new_res2 = new_des.encrypt(text, key)
    if new_res2["ciphertext"] != orig_c: return False
    new_d2 = new_des.decrypt(new_res2["ciphertext"], new_res2["decryption_state"])
    if new_d2 != orig_d: return False
    
    return True

def test_twofish():
    text, key = "TwofishData", "TwoKey"
    orig_c, orig_key, _ = orig_twofish.encrypt(text, key)
    orig_d, _ = orig_twofish.decrypt(orig_c, orig_key)
    
    new_res1 = new_twofish.encrypt(text, key)
    if new_res1["ciphertext"] != orig_c: return False
    new_d1 = new_twofish.decrypt(new_res1["ciphertext"], new_res1["decryption_state"])
    if new_d1 != orig_d: return False
    
    new_res2 = new_twofish.encrypt(text, key)
    if new_res2["ciphertext"] != orig_c: return False
    new_d2 = new_twofish.decrypt(new_res2["ciphertext"], new_res2["decryption_state"])
    if new_d2 != orig_d: return False
    
    return True

def test_elgamal():
    text = "secret message"
    
    # Original
    orig_c, orig_a, orig_q, orig_p, _ = orig_elgamal.encode(text)
    orig_d, _ = orig_elgamal.decode(orig_c, orig_a, orig_q, orig_p)
    
    # We test structural compatibility for random generation
    new_res1 = new_elgamal.encrypt(text)
    state1 = new_res1["decryption_state"]
    if type(orig_c) != type(new_res1["ciphertext"]): return False
    try:
        _ = list(map(int, new_res1["ciphertext"].split()))
    except ValueError:
        return False
    if set(state1.keys()) != {"a", "q", "p"}: return False
    new_d1 = new_elgamal.decrypt(new_res1["ciphertext"], state1)
    if new_d1 != text.lower() or new_d1 != orig_d: return False
    
    new_res2 = new_elgamal.encrypt(text)
    state2 = new_res2["decryption_state"]
    new_d2 = new_elgamal.decrypt(new_res2["ciphertext"], state2)
    if new_d2 != text.lower() or new_d2 != orig_d: return False
    
    return True

def test_playfair():
    text, key = "playfair", "crypto"
    
    orig_c, orig_key1, orig_key2, orig_corr, _ = orig_playfair.cipher(text, key)
    orig_d, _ = orig_playfair.decipher(orig_c, orig_key1, orig_key2, orig_corr)
    
    new_res1 = new_playfair.encrypt(text, key)
    if new_res1["ciphertext"] != orig_c: return False
    new_d1 = new_playfair.decrypt(new_res1["ciphertext"], new_res1["decryption_state"])
    if new_d1 != orig_d: return False
    
    new_res2 = new_playfair.encrypt(text, key)
    if new_res2["ciphertext"] != orig_c: return False
    new_d2 = new_playfair.decrypt(new_res2["ciphertext"], new_res2["decryption_state"])
    if new_d2 != orig_d: return False
    
    return True

def test_hill():
    text = "hill cipher"
    
    orig_c, orig_k, orig_chk, orig_c_mat, _ = orig_hill.encrypt(text)
    orig_d, _ = orig_hill.decrypt(orig_c, orig_c_mat, orig_k, orig_chk)
    
    new_res1 = new_hill.encrypt(text)
    if new_res1["ciphertext"] != orig_c: return False
    new_d1 = new_hill.decrypt(new_res1["ciphertext"], new_res1["decryption_state"])
    if new_d1 != orig_d: return False
    
    new_res2 = new_hill.encrypt(text)
    if new_res2["ciphertext"] != orig_c: return False
    new_d2 = new_hill.decrypt(new_res2["ciphertext"], new_res2["decryption_state"])
    if new_d2 != orig_d: return False
    
    return True

def run_all():
    results = {
        "AES": test_aes(),
        "DES": test_des(),
        "Twofish": test_twofish(),
        "ElGamal": test_elgamal(),
        "Playfair": test_playfair(),
        "Hill": test_hill()
    }
    
    print("\n" + "="*40)
    all_passed = True
    for algo, passed in results.items():
        if passed:
            print(f"{algo}: PASS")
        else:
            print(f"{algo}: FAIL")
            all_passed = False
            
    print("="*40)
    
    if all_passed:
        print("\nFINAL RESULT: ALL ALGORITHMS VERIFIED STATELESS AND COMPATIBLE\n")
    else:
        print("\nFINAL RESULT: SOME ALGORITHMS FAILED VERIFICATION\n")

if __name__ == "__main__":
    run_all()
