import crypto from 'crypto';
// import 'server-only'; // Only import on the server

const ALG = "aes-256-gcm"
export const symmetricEncrypt = (data:string) =>{
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
        throw new Error("ENCRYPTION_KEY not found");
    }

    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALG, Buffer.from(key,"hex"), iv);

    // Encrypt the data
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Get the authentication tag
    const tag = cipher.getAuthTag();

    // Return the IV, tag, and encrypted data as a hex string
    return iv.toString('hex') + ':' + tag.toString('hex') + ':' + encrypted;
}

export const symmetricDecrypt = (encrypted:string) =>{
    const key = process.env.ENCRYPTION_KEY;
    if (!key) {
        throw new Error("ENCRYPTION_KEY not found");
    }

    // Split the encrypted string into IV, tag, and encrypted data
    const textParts = encrypted.split(':');
    const iv = Buffer.from(textParts[0] as string, 'hex'); // 12-byte IV
    const tag = Buffer.from(textParts[1] as string, 'hex'); // Authentication tag
    const encryptedText = textParts[2]; // Encrypted data

    const decipher = crypto.createDecipheriv(ALG, Buffer.from(key,"hex"), iv);

    // Set the authentication tag
    decipher.setAuthTag(tag);

    // Decrypt the data
    let decrypted = decipher.update(encryptedText as string, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}