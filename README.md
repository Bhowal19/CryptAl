# 🔐 Windows Encryption Application 

<div align="center">
  <img src="https://github.com/VarunBhattacharya/CryptAL/assets/109750332/fd23ad7b-3a33-4966-9432-5a97f0a1a2f5" alt="CyrptAL Logo">
</div>


📌Overview

This repository contains a **Python-based Windows application** built as an **Application Security and Cryptography case study**, focused on demonstrating **secure message encryption and decryption techniques** using established cryptographic methods.

The project showcases how different **symmetric and asymmetric encryption algorithms** can be applied at the application layer to protect data in transit, while emphasizing **secure design principles, correct cryptographic usage, and controlled encryption workflows**.

This project was developed as a **group project** by **Ayan Bhowal** and **Varun Bhattacharya**.

---

## 🎯 Project Objectives

* Demonstrate practical implementation of **encryption techniques** in an application context
* Compare **symmetric vs asymmetric cryptography** for secure data protection
* Apply **secure key handling and input processing** practices
* Reinforce **application security (AppSec)** and **secure design** concepts

---

## 🧠 Cryptographic Techniques Demonstrated

The application implements and compares the following encryption approaches:

### 🔹 Symmetric Encryption

* **AES (Advanced Encryption Standard)**
* **Twofish**
* **DES**

### 🔹 Asymmetric / Key Exchange Techniques

* **ElGamal**
* **Diffie–Hellman**

### 🔹 Classical Cryptography (Educational Demonstration)

* **Playfair Cipher**
* **Hill Cipher**

> ⚠️ Note: Classical ciphers are included **strictly for educational comparison** and are **not suitable for modern secure communication**.

---

## 🏗️ Application Architecture

* **Language:** Python
* **GUI Framework:** Tkinter
* **Design Approach:** Modular encryption logic per algorithm
* **Security Focus:**

  * Controlled encryption workflows
  * Secure input handling
  * Correct usage of cryptographic primitives

---

## 📁 Repository Structure

```
├── main.py              # Application entry point (GUI logic)
├── AES.py               # AES encryption implementation
├── DES.py               # DES encryption implementation
├── Twofish.py           # Twofish encryption implementation
├── ElGamal.py           # ElGamal asymmetric encryption
├── Hill.py              # Hill cipher (classical)
├── Playfair.py          # Playfair cipher (classical)
├── LSBImage.py          # Image steganography using LSB
├── LSBAudio.py          # Audio steganography using LSB
├── bg.png               # UI background asset
├── cyber-security.png   # UI asset
├── sample.wav           # Sample audio file
├── encrypt.wav          # Encrypted audio output
└── __pycache__/         # Python cache files
```

---

## 🛡️ Security & AppSec Considerations

* Uses **standard cryptographic algorithms** rather than custom encryption logic
* Demonstrates **secure handling of plaintext and encrypted data**
* Highlights **trade-offs between encryption methods**
* Designed as an **application security learning project**, not a production-ready cryptosystem

---

## 🧪 Testing & Validation

* Verified encryption and decryption workflows using **multiple test cases**
* Successfully encrypted and decrypted messages exceeding **100 words**
* Validated correctness and data integrity across supported algorithms

---

## 📚 Learning Outcomes

* Practical understanding of **cryptographic primitives**
* Secure design thinking at the **application layer**
* Awareness of **proper vs insecure encryption approaches**
* Exposure to **AppSec-focused implementation practices**

---

## ⚠️ Disclaimer

This project is intended for **educational and demonstration purposes only**. It should not be used as-is in production systems without comprehensive security reviews and enhancements.

---

## 👥 Contributors

* **Ayan Bhowal**
* **Varun Bhattacharya** - https://github.com/VarunBhattacharya

---

## ⭐ Final Note

This repository serves as an **Application Security case study**, demonstrating how encryption techniques can be correctly applied within a software application to protect sensitive data and reinforce secure design principles.
