import Database from 'better-sqlite3';
import path from 'path';

const dbFilename = process.env.DATABASE_PATH || 'ryb.db';
const dbPath = path.join(process.cwd(), dbFilename);

const db = new Database(dbPath);

// UNIQUE sorgt dafür, dass ein Kapitel nicht doppelt als gelesen markiert wird
db.exec(`
  CREATE TABLE IF NOT EXISTS reading_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book TEXT NOT NULL,
    chapter INTEGER NOT NULL,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(book, chapter)
  )
`);

export default db;