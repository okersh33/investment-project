import sqlite3 from "sqlite3";
import { open } from "sqlite";

const dbPromise = open({
  filename: `${__dirname}/../isa.db`,
  driver: sqlite3.Database,
});

async function initializeDB() {
  const db = await dbPromise;

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS investments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      fund_id TEXT NOT NULL,
      amount REAL NOT NULL
    )
  `);
}

initializeDB();

export default dbPromise;
