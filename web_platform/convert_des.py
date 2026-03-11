import os

source_file = r"d:\My Files\Antigravity\Encryption-Application-Using-Modern-Cryptographic-Techniques\DES.py"
dest_file = r"d:\My Files\Antigravity\Encryption-Application-Using-Modern-Cryptographic-Techniques\web_platform\engine\crypto\des.py"

with open(source_file, "r") as f:
    content = f.read()

prefix = """# WARNING: Educational Cryptographic Implementation
# Not Secure for Production Use
# Behavior preserved from original desktop application

from ..exceptions import EncryptionError, DecryptionError

"""

content = content.replace("import time\n", "")

target = "rkb = []"
start_idx = content.find(target)
if start_idx != -1:
    content = content[:start_idx]

replacement = '''def encrypt(text: str, key: str) -> dict:
    """
    Encrypts a string using an educational DES implementation.
    Returns the ciphertext and the explicit decryption state needed for decryption.
    Source: Original DES.py
    """
    try:
        rkb = []
        rk = []
        
        pt = padding(text).encode('utf-8').hex().upper()
        key_padded = padding(key).encode('utf-8').hex().upper()

        key_bin = hex2bin(key_padded)
        key_bin = permute(key_bin, keyp, 56)

        left = key_bin[0:28] # rkb for RoundKeys in binary
        right = key_bin[28:56] # rk for RoundKeys in hexadecimal

        for i in range(0, 16):
            left = shift_left(left, shift_table[i])
            right = shift_left(right, shift_table[i])
        
            combine_str = left + right
            round_key = permute(combine_str, key_comp, 48)

            rkb.append(round_key)
            rk.append(bin2hex(round_key))
        
        pt_bin = hex2bin(pt)
        pt_bin = permute(pt_bin, initial_perm, 64)
        
        l_half = pt_bin[0:32]
        r_half = pt_bin[32:64]
        for i in range(0, 16):
            right_expanded = permute(r_half, exp_d, 48)
            xor_x = xor(right_expanded, rkb[i])

            sbox_str = ""
            for j in range(0, 8):
                row = bin2dec(int(xor_x[j * 6] + xor_x[j * 6 + 5]))
                col = bin2dec(int(xor_x[j * 6 + 1] + xor_x[j * 6 + 2] + xor_x[j * 6 + 3] + xor_x[j * 6 + 4]))
                val = sbox[j][row][col]
                sbox_str = sbox_str + dec2bin(val)
                
            sbox_str = permute(sbox_str, per, 32)
            result = xor(l_half, sbox_str)
            l_half = result
            
            if(i != 15):
                l_half, r_half = r_half, l_half
        
        combine = l_half + r_half
        cipher_text = permute(combine, final_perm, 64)
        cipher_text = bin2hex(cipher_text)
        
        return {
            "ciphertext": cipher_text,
            "decryption_state": {
                "rk": rk,
                "rkb": rkb
            }
        }
    except Exception as e:
        raise EncryptionError(f"DES encryption failed: {e}")

def decrypt(ciphertext: str, state: dict) -> str:
    """
    Decrypts a string using the explicit decryption state returned during encryption.
    Source: Original DES.py
    """
    try:
        rk = state["rk"]
        rkb = state["rkb"]
        
        rkb = rkb[::-1]
        rk = rrk = rk[::-1]  # The original reverses them
        pt = hex2bin(ciphertext)
        
        pt = permute(pt, initial_perm, 64)
        
        l_half = pt[0:32]
        r_half = pt[32:64]
        for i in range(0, 16):
            right_expanded = permute(r_half, exp_d, 48)
            xor_x = xor(right_expanded, rkb[i])

            sbox_str = ""
            for j in range(0, 8):
                row = bin2dec(int(xor_x[j * 6] + xor_x[j * 6 + 5]))
                col = bin2dec(int(xor_x[j * 6 + 1] + xor_x[j * 6 + 2] + xor_x[j * 6 + 3] + xor_x[j * 6 + 4]))
                val = sbox[j][row][col]
                sbox_str = sbox_str + dec2bin(val)
                
            sbox_str = permute(sbox_str, per, 32)
            result = xor(l_half, sbox_str)
            l_half = result
            
            if(i != 15):
                l_half, r_half = r_half, l_half
        
        combine = l_half + r_half
        decipher_text = permute(combine, final_perm, 64)
        decipher_text = bin2hex(decipher_text)
        final = bytes.fromhex(decipher_text).decode('utf-8') 
        for i in range(len(final)):
            if final[i] == '}':
                final = final[:i]
                break
        return final
    except Exception as e:
        raise DecryptionError(f"DES decryption failed: {e}")
'''

content += replacement

with open(dest_file, "w") as f:
    f.write(prefix + content)
