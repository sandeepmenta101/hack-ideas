export class IndexedDB {
    constructor(dbName = "shipment", storeName = "masterData", version = 1) {
        this._config = {
            dbName,
            storeName,
            version
        };
    }
    read(key) {
        return new Promise((resolve, reject) => {
            let dbRequest = window.indexedDB.open(this._config.dbName);

            dbRequest.onerror = (e) => {
                reject(Error("Couldn't open database."));
            };

            dbRequest.onupgradeneeded = (e) => {
                e.target.transaction.abort();
                reject(Error("Database version not found."));
            };

            dbRequest.onsuccess = (e) => {
                let database = e.target.result;
                let transaction = database.transaction([this._config.storeName], 'readwrite');
                let objectStore = transaction.objectStore(this._config.storeName);
                let objectRequest = objectStore.get(key);

                objectRequest.onerror = (e) => {
                    reject(Error("Error while getting."));
                };

                objectRequest.onsuccess = (e) => {
                    if (objectRequest.result) {
                        resolve(objectRequest.result);
                    } else reject(Error("Key not found."));
                };
            };
        });
    }

    delete(key) {
        return new Promise((resolve, reject) => {
            let dbRequest = indexedDB.open(this._config.dbName);

            dbRequest.onerror = (e) => {
                reject(Error("Couldn't open database."));
            };

            dbRequest.onupgradeneeded = (e) => {
                e.target.transaction.abort();
                reject(Error("Database version not found."));
            };

            dbRequest.onsuccess = (e) => {
                let database = e.target.result;
                let transaction = database.transaction([this._config.storeName], 'readwrite');
                let objectStore = transaction.objectStore(this._config.storeName);
                let objectRequest = objectStore.delete(key);

                objectRequest.onerror = (e) => {
                    reject(Error("Couldn't delete key."));
                };

                objectRequest.onsuccess = (e) => {
                    resolve("Deleted key successfully.");
                };
            };
        });
    }

    save(key, value) {
        return new Promise((resolve, reject) => {
            let dbRequest = indexedDB.open(this._config.dbName);

            dbRequest.onerror = (e) => {
                reject(Error("Couldn't open database."));
            };

            dbRequest.onupgradeneeded = (e) => {
                let database = e.target.result;
                let objectStore = database.createObjectStore(this._config.storeName);
            };

            dbRequest.onsuccess = (e) => {
                let database = e.target.result;
                let transaction = database.transaction([this._config.storeName], 'readwrite');
                let objectStore = transaction.objectStore(this._config.storeName);
                let objectRequest = objectStore.put(value, key);

                objectRequest.onerror = (e) => {
                    reject(Error("Error while saving."));
                };

                objectRequest.onsuccess = (e) => {
                    resolve("Saved data successfully.");
                };
            };
        });
    }
}