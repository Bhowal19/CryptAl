import os

source_file = r"d:\My Files\Antigravity\Encryption-Application-Using-Modern-Cryptographic-Techniques\Twofish.py"
dest_file = r"d:\My Files\Antigravity\Encryption-Application-Using-Modern-Cryptographic-Techniques\web_platform\engine\crypto\twofish.py"

with open(source_file, "r") as f:
    content = f.read()

prefix = """# WARNING: Educational Cryptographic Implementation
# Not Secure for Production Use
# Behavior preserved from original desktop application

from ..exceptions import EncryptionError, DecryptionError

"""

content = content.replace("import time", "")

# Remove globals
content = content.replace("S0=[]\nS1=[]\n", "")
content = content.replace("global S0,S1\n\n    S_0=S0\n    S_1=S1", "S_0=S0\n    S_1=S1")
content = content.replace("global S0,S1\n", "")

# Update g_function
content = content.replace("def g_function(inp_r):", "def g_function(inp_r, S0, S1):")

# Update f_function
content = content.replace("def f_function(r_array,k1,k2):", "def f_function(r_array,k1,k2, S0, S1):")
content = content.replace("t0=g_function(r0)", "t0=g_function(r0, S0, S1)")
content = content.replace("t1=g_function(r1)", "t1=g_function(r1, S0, S1)")

# Update key_schedule
content = content.replace("return K_keys", "return K_keys, S0, S1")

encrypt_code = """
# Encrypt function of Twofish
def encrypt(plaintext: str, key: str) -> dict:
    \"\"\"
    Encrypts a string using an educational Twofish implementation.
    Returns the ciphertext and the explicit decryption state needed for decryption.
    Source: Original Twofish.py
    \"\"\"
    try:
        key = key.encode('utf-8').hex().lower()
        key=key.zfill(32)
        plaintext = plaintext.encode('utf-8').hex().lower()
        plaintext=plaintext.zfill(32)
        # Making the required keys
        round_keys, S0, S1 = key_schedule(key)
        white_keys=round_keys[:4]
        output_keys=round_keys[4:8]

        # Whitening the Input
        r1_array=whitening(plaintext,white_keys)

        r_array=[]

        # Converting the array to a 16 8-bit numbers from 4 32-bit number
        for i in r1_array:
            num=int("".join([bin(j)[2:].zfill(8) for j in i]),2)
            r_array.append(num)

        # looping 16 time for each round

        for r in range(16):
            # Calling F function
            f0,f1=f_function(r_array,round_keys[2*r+8],round_keys[2*r+9], S0, S1)
            c2=f0^r_array[2]
            c2=ROR(c2,1,32)
            r3=r_array[3]
            c3=ROL(r3,1,32)
            c3=f1^c3

            r_array=[c2,c3,r_array[0],r_array[1]]

        # undo the steps
        r_array=[r_array[2],r_array[3],r_array[0],r_array[1]]
        # printing the output
        ciphertext=[]
        for i in range(len(output_keys)):
            ciphertext.append(hex(output_keys[i]^r_array[i])[2:].zfill(8))
        # converting little endian
        output=""
        for i in ciphertext:
            ans=[i[j:j+2] for j in range(0,len(i),2)]
            ans=ans[::-1]
            output+=''.join(ans)
            
        return {
            "ciphertext": output,
            "decryption_state": {
                "key": key
            }
        }
    except Exception as e:
        raise EncryptionError(f"Twofish encryption failed: {e}")

# Decryption fucntion
def decrypt(ciphertext: str, state: dict) -> str:
    \"\"\"
    Decrypts a string using the explicit decryption state returned during encryption.
    Source: Original Twofish.py
    \"\"\"
    try:
        key = state["key"]
        
        # Making the required keys with scheduling
        round_keys, S0, S1 = key_schedule(key)
        white_keys=round_keys[:4]
        output_keys=round_keys[4:8]

        # Converting ciphertext to array of 16
        ciphertext=[ciphertext[i:i+8] for i in range(0,len(ciphertext),8) ]
        r_array=[]

        # Adjusting the little endian format
        for i in ciphertext:
            q=i
            s=[]
            for j in range(0,len(q),2):
                s.append(q[j:j+2])
            s=s[::-1]
            s=''.join(s)
            r_array.append(int(s,16))

        # Ciphertext whitening with output whiten keys
        for j in range(len(output_keys)):
            r_array[j]=r_array[j]^output_keys[j]

        # Doing the criss cross swapping in Fiestal cipher
        r_array=[r_array[2],r_array[3],r_array[0],r_array[1]]

        # Calling the loop for 16 rounds
        for r in range(15,-1,-1):

            # Reversing the states ,the 3rd and 4th element will be 1st and 2nd element of previous round state array
            a=r_array[2]
            b=r_array[3]
            c2=r_array[0]
            c3=r_array[1]

            # Calling the F function with the 3rd and 4th element
            f0,f1=f_function([a,b],round_keys[2*r+8],round_keys[2*r+9], S0, S1)
            
            # Reversing to get the r2 and r3 of previous round in ecryption
            r2=ROL(c2,1,32)
            r2=r2^f0

            r3=f1^c3
            r3=ROR(r3,1,32)
            
            r_array=[a,b,r2,r3]

        # After 16 rounds ,whitening the array with input whiten keys this time

        for i in range(4):
            r_array[i]=hex(r_array[i]^white_keys[i])[2:].zfill(8)

        ans=""

        # Printing the output in Big Endian format
        for i in r_array:
            tmp=[]
            for j in range(0,len(i),2):
                tmp.append(i[j:j+2])
            tmp=tmp[::-1]
            ans+=''.join(tmp)
        
        final = bytes.fromhex(ans).decode('utf-8')
        return final
    except Exception as e:
        raise DecryptionError(f"Twofish decryption failed: {e}")
"""

encrypt_start = content.find("# Encrypt function of Twofish")
if encrypt_start != -1:
    content = content[:encrypt_start] + encrypt_code
    
with open(dest_file, "w") as f:
    f.write(prefix + content)

print("success")
