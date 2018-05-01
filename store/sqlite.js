import Promise from 'bluebird';
import sqlite from 'sqlite';

export const dbPromise = sqlite.open('./alacrity-test.sqlite', {
    Promise
});

const bootstrap = async () => {
    try {
        const db = await dbPromise;
        db.exec('DROP TABLE data_store;')
        db.exec('CREATE TABLE IF NOT EXISTS data_store (data_id INTEGER PRIMARY KEY, id TEXT, value TEXT, encryption_key TEXT)')
    } catch (err) {
        console.log(err)
    }
}
bootstrap();

exports = { dbPromise, bootstrap };