# WARNING: Educational Cryptographic Implementation
# Not Secure for Production Use
# Behavior preserved from original desktop application

import string
from ..exceptions import EncryptionError, DecryptionError

alphabets = {k:v for k, v in zip(range(26), string.ascii_uppercase)}

def matrixgen(content, row, col):
    M = []
    k = 0
    for i in range(row):
        temp = []
        for j in range(col):
            temp.append(content[k])
            k += 1
        M.append(temp)
    return M

def chkptlength(pt, size):
    correction = []
    for i in range(len(pt)%size):
        pt += 'Q'
        correction.append('Q')
    return pt, len(pt)//size, correction

def tonumber(pt, row, col):
    for i in range(row):
        for j in range(col):
            pt[i][j] = list(alphabets.values()).index(pt[i][j])
    return pt

def toletter(M):
    K = [['' for x in range(len(M[0]))] for y in range(len(M))]
    for i in range(len(M)):
        for j in range(len(M[0])):
            K[i][j] = alphabets[M[i][j]]
    return K

def tostring(C):
    text = ''
    for i in range(len(C)):
        for j in range(len(C[0])):
            text += C[i][j]
    return text

def matrixmul(K, P):
    C = [[0 for x in range(len(P[0]))] for y in range(len(K))]
    for i in range(len(K)):
        for j in range(len(P[0])):
            for k in range(len(P)):
                C[i][j] += (K[i][k] * P[k][j])
                C[i][j] %= 26
    return C 

def imatrix(M):
    if len(M) ==  2:
        d = (M[0][0]*M[1][1] - M[0][1]*M[1][0]) % 26
        if d == 0:
            raise DecryptionError('The key matrix has determinant zero')
        for i in range(26):
            if (d*i)%26 == 1:
                di = i
        adj = M
        adj[0][0], adj[1][1] = adj[1][1], adj[0][0]
        adj[0][1] *= (-1)
        adj[1][0] *= (-1)
        for i in range(2):
            for j in range(2):
                adj[i][j] = (adj[i][j]*di)%26
        return adj
    if len(M) == 3:
        d = (M[0][0]*(M[1][1]*M[2][2] - M[2][1]*M[1][2]) - M[0][1]*(M[1][0]*M[2][2]- M[1][2]*M[2][0]) + M[0][2]*(M[1][0]*M[2][1]-M[1][1]*M[2][0])) %26
        if d == 0:
            raise DecryptionError('The key matrix has determinant zero')
        for i in range(26):
            if (d*i)%26 == 1:
                di = i
                break
        cof = [[0 for i in range(len(M))] for j in range(len(M[0]))]
        n = 1
        for i in range(3):
            for j in range(3):
                cof[i][j] = (M[(i+1)%3][(j+1)%3]*M[(i+2)%3][(j+2)%3] - M[(i+1)%3][(j+2)%3]*M[(i+2)%3][(j+1)%3])
        for i in range(3):
            for j in range(3):
                M[i][j] = (di*cof[j][i])%26
        return M
            
def rmcorrections(M, correction):
    for i in range(len(M)):
        for j in range(len(M[0])):
            if M[i][j] in correction:
                M[i][j] = ''
                correction.remove(correction[0])
    return M

def encrypt(text: str) -> dict:
    """
    Encrypts a string using an educational Hill cipher implementation.
    Returns the ciphertext and explicitly passes back K, chk, and C.
    Source: Original Hill.py
    """
    try:
        plaintext = text.upper().replace(' ','')
        n = 3
        # Strict requirement: Maintain original hardcoded matrix
        K = [[6, 24, 1], [13, 16, 10], [20, 17, 15]]
        plaintext, l, chk = chkptlength(plaintext, n)
        P = matrixgen(plaintext, n, l)
        P = tonumber(P, n, l)
        C = matrixmul(K, P)
        cipher = tostring(toletter(C))
        
        return {
            "ciphertext": cipher,
            "decryption_state": {
                "C": C,
                "K": K,
                "chk": chk
            }
        }
    except Exception as e:
        raise EncryptionError(f"Hill encryption failed: {e}")

def decrypt(ciphertext: str, state: dict) -> str:
    """
    Decrypts a string using explicit values for C, K, and chk.
    Source: Original Hill.py
    """
    try:
        # NOTE: The original Hill implementation actually ignored the input `cipher` param entirely
        # and instead decrypted the `C` matrix passed as an argument directly!
        # Thus, passing `C` in state is mathematically required to preserve behavior.
        C = state["C"]
        K = state["K"]
        chk = state["chk"]
        
        iK = imatrix(K)
        D = matrixmul(iK, C)
        decipher = toletter(D)
        decipher = tostring(rmcorrections(decipher, chk))
        
        return decipher
    except Exception as e:
        raise DecryptionError(f"Hill decryption failed: {e}")
