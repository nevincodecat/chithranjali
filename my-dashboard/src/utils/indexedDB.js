// indexedDB.js
import { openDB } from "idb";

const DB_NAME = "my-dashboard-db";
// Bump this version whenever you add/change object stores!
const DB_VERSION = 4;

export const initializeDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion) {
      console.log("IndexedDB upgrade", { oldVersion, newVersion });

      if (!db.objectStoreNames.contains("clients")) {
        console.log("Creating 'clients' object store");
        db.createObjectStore("clients", { keyPath: "id", autoIncrement: true });
      }

      if (!db.objectStoreNames.contains("expenses")) {
        console.log("Creating 'expenses' object store");
        db.createObjectStore("expenses", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });

  return db;
};

export const getAllData = async (storeName) => {
  const db = await initializeDB();
  try {
    return await db.getAll(storeName);
  } catch (error) {
    console.error(`Error in getAllData for store '${storeName}':`, error);
    throw error;
  }
};

export const saveData = async (storeName, data) => {
  const db = await initializeDB();
  const tx = db.transaction(storeName, "readwrite");
  await tx.objectStore(storeName).put(data);
  await tx.done;
};

export const deleteData = async (storeName, id) => {
  const db = await initializeDB();
  const tx = db.transaction(storeName, "readwrite");
  await tx.objectStore(storeName).delete(id);
  await tx.done;
};
