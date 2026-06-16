'use server';

import db from './db';
import { revalidatePath } from 'next/cache';

export async function getProgress() {
  const rows = db.prepare('SELECT * FROM reading_progress ORDER BY completed_at DESC').all();
  return rows as { id: number; book: string; chapter: number; completed_at: string }[];
}

export async function addProgress(formData: FormData) {
  const book = formData.get('book') as string;
  const chapter = parseInt(formData.get('chapter') as string, 10);

  if (!book || isNaN(chapter)) return;

  const stmt = db.prepare('INSERT INTO reading_progress (book, chapter) VALUES (?, ?)');
  stmt.run(book, chapter);

  revalidatePath('/');
}