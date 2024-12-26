export async function openDatabase(dbName: string, dbVersion: number = 1) {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains('userCoins')) {
                db.createObjectStore('userCoins', { keyPath: "id" }); // Use user ID as the key
            }
        };
        

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function saveUserCoins(userId: string, coins: number) {
    const db = await openDatabase('casinoGameDB');
    return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction('userCoins', 'readwrite');
        const store = transaction.objectStore('userCoins');

        const record = { id: userId, coins, lastUpdated: new Date().toISOString() };
        const request = store.put(record); // Add or update

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}