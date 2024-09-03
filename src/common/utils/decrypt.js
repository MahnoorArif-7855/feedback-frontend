import CryptoJS from 'crypto-js';

export function decrypt(encryptedText) {
  const encryptedkey = process.env.ENCRYPTED_KEY || '';
  const textParts = encryptedText.split(':');
  if (textParts.length > 1) {
    const key = CryptoJS.enc.Hex.parse(encryptedkey); // Ensure this key matches the backend key
    const iv = CryptoJS.enc.Hex.parse(textParts[0]);
    const encryptedData = CryptoJS.enc.Hex.parse(textParts[1]);
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedData }, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
}
