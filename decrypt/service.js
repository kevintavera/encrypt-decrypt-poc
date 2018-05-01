import {
    dbPromise
} from '../store/sqlite';
import {
    decrypt,
    generateSecret
} from '../security/strategy'

export const getSecureValues = async (encryption_key, id) => {
    const db = await dbPromise;
    let secret = generateSecret(encryption_key, id);
    const [results] = await Promise.all([
        db.all(`SELECT id, value, encryption_key from data_store WHERE id like ? AND encryption_key = ?`, id.replace('*', '%'), secret)
    ]);
    return await results.map(result => {
        let value = decrypt(result.value, result.encryption_key);
        try {
            value = JSON.parse(value)
        } catch (ex) {
            console.log('not an object')
        }
        return {
            id: result.id,
            value: value
        }
    });
};
exports = {
    getSecureValues
};