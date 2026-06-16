import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'trackure.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS reading_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book TEXT NOT NULL,
    chapter INTEGER NOT NULL,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;