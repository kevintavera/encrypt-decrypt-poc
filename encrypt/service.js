import {
    dbPromise
} from '../store/sqlite';
import {
    encrypt,
    decrypt,
    generateSecret
} from '../security/strategy'

export const addSecureValue = async (encryption_key, value, id) => {
    const db = await dbPromise;
    let secret = generateSecret(encryption_key, id);
    let cipherText = encrypt(JSON.stringify(value), secret)
    const insert = await db.run('insert into data_store (id, value, encryption_key) VALUES (?,?,?)', id, cipherText, secret)
    return insert;
}

exports = {
    addSecureValue
}