// A simple utility for encrypting/decrypting data using the Web Crypto API.
// This is not a comprehensive security solution but prevents plaintext storage of API keys.

let cryptoKey: CryptoKey | null = null;
const KEY_STORAGE_KEY = 'ai-workflow-crypto-key';

/**
 * Retrieves the encryption key from localStorage, or generates and saves a new one.
 * @returns {Promise<CryptoKey>} The CryptoKey for encryption/decryption.
 */
const getKey = async (): Promise<CryptoKey> => {
    if (cryptoKey) {
        return cryptoKey;
    }

    const storedKey = localStorage.getItem(KEY_STORAGE_KEY);
    if (storedKey) {
        try {
            const rawKey = new Uint8Array(atob(storedKey).split('').map(c => c.charCodeAt(0)));
            const key = await window.crypto.subtle.importKey(
                'raw',
                rawKey,
                { name: 'AES-GCM' },
                true,
                ['encrypt', 'decrypt']
            );
            cryptoKey = key;
            return cryptoKey;
        } catch (e) {
            console.error("Failed to import crypto key, generating a new one.", e);
            // Clear corrupted key
            localStorage.removeItem(KEY_STORAGE_KEY);
        }
    }

    // Generate a new key if one doesn't exist
    const newKey = await window.crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );
    const exportedKey = await window.crypto.subtle.exportKey('raw', newKey);
    const base64Key = btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(exportedKey))));
    localStorage.setItem(KEY_STORAGE_KEY, base64Key);

    cryptoKey = newKey;
    return cryptoKey;
};

/**
 * Encrypts a plaintext string using AES-GCM.
 * @param {string} plaintext - The string to encrypt.
 * @returns {Promise<string>} The base64-encoded encrypted string (IV + ciphertext). Returns plaintext if encryption fails.
 */
export const encrypt = async (plaintext: string): Promise<string> => {
    if (!plaintext) {
        return '';
    }
    try {
        const key = await getKey();
        const iv = window.crypto.getRandomValues(new Uint8Array(12)); // GCM standard IV size
        const encodedText = new TextEncoder().encode(plaintext);

        const encryptedContent = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            encodedText
        );

        const combined = new Uint8Array([...iv, ...new Uint8Array(encryptedContent)]);
        return btoa(String.fromCharCode.apply(null, Array.from(combined)));
    } catch (e) {
        console.error("Encryption failed:", e);
        // Return plaintext as a fallback if encryption fails
        return plaintext;
    }
};

/**
 * Decrypts a base64-encoded ciphertext string using AES-GCM.
 * @param {string} ciphertext - The encrypted string.
 * @returns {Promise<string>} The decrypted plaintext. Returns original ciphertext if decryption fails.
 */
export const decrypt = async (ciphertext: string): Promise<string> => {
    if (!ciphertext) {
        return '';
    }
    try {
        const key = await getKey();
        const combined = new Uint8Array(atob(ciphertext).split('').map(c => c.charCodeAt(0)));

        const iv = combined.slice(0, 12);
        const data = combined.slice(12);

        const decryptedContent = await window.crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            data
        );

        return new TextDecoder().decode(decryptedContent);
    } catch (e) {
        console.warn("Decryption failed. Data may be in plaintext or corrupted.", e);
        // If decryption fails, it might be an old plaintext key. Return as-is.
        // Or it could be corrupted, in which case returning it might still be better than nothing.
        return ciphertext;
    }
};