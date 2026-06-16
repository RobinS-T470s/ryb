'use client';

import { useState, useEffect } from 'react';
import { toggleChapter } from '@/lib/actions';

interface ChapterGridProps {
  bookName: string;
  totalChapters: number;
  initialReadChapters: string[]; // Kommt als sicheres Array vom Server
}

export default function ChapterGrid({ bookName, totalChapters, initialReadChapters }: ChapterGridProps) {
  // Wir verwalten die gelesenen Kapitel dieses spezifischen Buches lokal im State
  const [readChapters, setReadChapters] = useState<Set<string>>(new Set());

  // Synchronisiert den Server-Zustand beim ersten Laden oder bei Updates
  useEffect(() => {
    setReadChapters(new Set(initialReadChapters));
  }, [initialReadChapters]);

  const handleToggle = async (chapterNum: number) => {
    const key = `${bookName}-${chapterNum}`;
    const isCurrentlyRead = readChapters.has(key);

    // 1. UI SOFORT aktualisieren (0ms Verzögerung)
    const nextState = new Set(readChapters);
    if (isCurrentlyRead) {
      nextState.delete(key);
    } else {
      nextState.add(key);
    }
    setReadChapters(nextState);

    // 2. Server im Hintergrund informieren
    try {
      await toggleChapter(bookName, chapterNum, isCurrentlyRead);
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      // Optional: Hier könnte man den State zurückrollen, falls der Server offline ist
    }
  };

  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
      {Array.from({ length: totalChapters }).map((_, i) => {
        const chapterNum = i + 1;
        const isRead = readChapters.has(`${bookName}-${chapterNum}`);

        return (
          <button
            key={chapterNum}
            type="button"
            onClick={() => handleToggle(chapterNum)}
            className={`py-2 text-center text-sm font-semibold rounded-lg border transition-all duration-150 ${
              isRead
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-100 hover:bg-indigo-700 active:scale-95'
                : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/30 active:scale-95'
            }`}
          >
            {chapterNum}
          </button>
        );
      })}
    </div>
  );
}