# WARNING: Educational Cryptographic Implementation
# Not Secure for Production Use
# Behavior preserved from original desktop application

import string
from Crypto.Util.number import getPrime
from ..exceptions import EncryptionError, DecryptionError

# Original alphabet list with space
l = list(string.ascii_lowercase) + [' ']

def prime(n):
    if n < 2:
        return False
    for i in range(2, n):
        if n % i == 0:
            return False
    return True

def gcd(p, q):
    while q != 0:
        p, q = q, p % q
    return p

def agenerate(j, n, k=1):
    for i in range(j, n, k):
        if gcd(i, n) == 1:
            return i    

def encrypt(text: str) -> dict:
    """
    Encrypts a string using an educational ElGamal implementation.
    Returns the ciphertext and explicitly passes back a, q, and p in the state.
    Source: Original ElGamal.py
    """
    try:
        q = getPrime(5)
        g = getPrime(10)
        a = agenerate(2, q)
        h = g**a % q
        plain = text.lower()
        k = agenerate(q, 1, -1)
        s = h**k % q
        p = g**k % q
        cipher = []
        for i in plain:
            cipher.append(str(s*l.index(i)))
        cipher_text = ' '.join(cipher)
        
        return {
            "ciphertext": cipher_text,
            "decryption_state": {
                "a": a,
                "q": q,
                "p": p
            }
        }
    except Exception as e:
        raise EncryptionError(f"ElGamal encryption failed: {e}")

def decrypt(ciphertext: str, state: dict) -> str:
    """
    Decrypts a string using explicit values for a, q, and p.
    Source: Original ElGamal.py
    """
    try:
        a = state["a"]
        q = state["q"]
        p = state["p"]
        
        cipher = list(map(int, ciphertext.split()))
        sn = p**a % q
        decipher = ''
        for i in cipher:
            decipher += l[i//sn]
        return decipher
    except Exception as e:
        raise DecryptionError(f"ElGamal decryption failed: {e}")
