import { LoginInterface } from "../interfaces/Login.interface";
import { EventInterface } from './../interfaces/Event.interface';

export class IndexedDB {
    private _config;
    constructor(dbName: string, storeName: string, version: number) {
        this._config = { dbName, storeName, version };
    }
    read(key: string) {
        return new Promise((resolve, reject) => {
            let dbRequest = window.indexedDB.open(this._config.dbName);
            dbRequest.onerror = (e) => { reject(Error("Couldn't open database.")); };
            dbRequest.onupgradeneeded = (e: any) => {
                let database = e.target.result;
                    database.createObjectStore(this._config.storeName);
            };
            dbRequest.onsuccess = (e: any) => {
                let database = e.target.result;
                let transaction = database.transaction([this._config.storeName], 'readwrite');
                let objectStore = transaction.objectStore(this._config.storeName);
                let objectRequest = objectStore.get(key);
                objectRequest.onerror = (e: any) => { reject(Error("Error while getting.")); };
                objectRequest.onsuccess = (e: any) => { if (objectRequest.result) { resolve(objectRequest.result); } else reject(Error("Key not found.")); };
            };
        });
    }
    delete(key: string) {
        return new Promise((resolve, reject) => {
            let dbRequest = indexedDB.open(this._config.dbName);
            dbRequest.onerror = (e) => { reject(Error("Couldn't open database.")); };
            dbRequest.onupgradeneeded = (e: any) => {
                e.target.transaction.abort();
                reject(Error("Database version not found."));
            };
            dbRequest.onsuccess = (e: any) => {
                let database = e.target.result;
                let transaction = database.transaction([this._config.storeName], 'readwrite');
                let objectStore = transaction.objectStore(this._config.storeName);
                let objectRequest = objectStore.delete(key);
                objectRequest.onerror = (e: any) => { reject(Error("Couldn't delete key.")); };
                objectRequest.onsuccess = (e: any) => { resolve("Deleted key successfully."); };
            };
        });
    }
    save(key: string, value: object) {
        return new Promise((resolve, reject) => {
            let dbRequest = indexedDB.open(this._config.dbName);
            dbRequest.onerror = (e) => { reject(Error("Couldn't open database.")); };
            dbRequest.onupgradeneeded = (e: any) => {
                let database = e.target.result;
                database.createObjectStore(this._config.storeName);
            };
            dbRequest.onsuccess = (e: any) => {
                let database = e.target.result;
                let transaction = database.transaction([this._config.storeName], 'readwrite');
                let objectStore = transaction.objectStore(this._config.storeName);
                const objectStoreData = objectStore.get(key);
                objectStoreData.onsuccess = (e: any) => {
                    const data = e.target.result;
                    let response = [];
                    if (data?.length > 0) {
                        response = [...data, value]
                    } else {
                        response.push(value);
                    }
                    let objectRequest = objectStore.put(response, key);
                    objectRequest.onerror = (e: any) => { reject(Error("Error while saving.")); };
                    objectRequest.onsuccess = (e: any) => { resolve("Saved data successfully."); };    
                }
            };
        });
    }

    isEmployeeExist(key: string, employee: LoginInterface) {
        return new Promise((resolve, reject) => {
            const dbRequest = indexedDB.open(this._config.dbName);
            dbRequest.onerror = (e) => {
                reject(Error("Couldn't open database"));
            }
            dbRequest.onupgradeneeded = (e: any) => {
                e.target.transaction.abort();
                reject(Error("Database version not found."));
            }
            dbRequest.onsuccess = (e: any) => {
                const db = e.target.result;
                const objectStore = db.transaction([this._config.storeName], "readwrite").objectStore(this._config.storeName);
                const objectStoreTitleRequest = objectStore.get(key);
                objectStoreTitleRequest.onsuccess = () => {
                    const employees: object[] = objectStoreTitleRequest.result;
                    const employeeIndex = employees.findIndex((employeeData: any) => {
                        if (employeeData.employeeId === employee.employeeId) {
                            return employeeData;
                        }
                    });
                    if (employeeIndex > -1) {
                        resolve(employees[employeeIndex]);
                    } else {
                        reject(Error('Employee does not exists.'))
                    }
                };
            }
        })
    }

    updateVoteEvent(id: number, voted: boolean){
        return new Promise((resolve, reject) => {
            const dbRequest = indexedDB.open(this._config.dbName);
            dbRequest.onerror = (e) => {
                reject(Error("Couldn't open database"));
            }
            dbRequest.onupgradeneeded = (e: any) => {
                e.target.transaction.abort();
                reject(Error('Database version not found'))
            }
            dbRequest.onsuccess = (e: any) => {
                const db = e.target.result;
                const objectStore = db.transaction([this._config.storeName], "readwrite").objectStore(this._config.storeName);
                const objectStoreTitleRequest = objectStore.get('events');
                objectStoreTitleRequest.onsuccess = () => {
                    const events: object[] = objectStoreTitleRequest.result;
                    const updatedEvents = events.map((event: any) => {
                        if(event.id === id && voted){
                            return {
                                ...event,
                                votes: event.votes + 1
                            }
                        }else{
                            return {
                                ...event,
                                votes: event.votes - 1
                            }
                        }
                    });
                    const request = objectStore.put(updatedEvents, 'events');
                    request.onsuccess = () => {
                        resolve(updatedEvents);
                    }
                    request.onerror = () => {
                        reject(Error('Failed to vote'));
                    }
                };
            }
        })
    }
}