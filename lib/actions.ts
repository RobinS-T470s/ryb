'use server';

import db from './db';
import { revalidatePath } from 'next/cache';

// Holt nur die gelesenen Kapitel als einfaches Set von Strings für schnellen Abgleich
export async function getReadChapters() {
  const rows = db.prepare('SELECT book, chapter FROM reading_progress').all() as { book: string; chapter: number }[];
  
  // Gibt ein Array von "Buch-Kapitel" Strings zurück, z.B. ["Genesis-1", "Johannes-3"]
  return rows.map(r => `${r.book}-${r.chapter}`);
}

export async function toggleChapter(book: string, chapter: number, isRead: boolean) {
  if (isRead) {
    // Wenn es schon gelesen war, entfernen wir es (Abhaken rückgängig machen)
    const stmt = db.prepare('DELETE FROM reading_progress WHERE book = ? AND chapter = ?');
    stmt.run(book, chapter);
  } else {
    // Wenn es ungelesen war, fügen wir es hinzu
    const stmt = db.prepare('INSERT OR IGNORE INTO reading_progress (book, chapter) VALUES (?, ?)');
    stmt.run(book, chapter);
  }

  revalidatePath('/');
}