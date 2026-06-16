export interface BookStructure {
  name: string;
  chapters: number;
}

export const BIBLE_BOOKS: BookStructure[] = [
  { name: 'Genesis', chapters: 50 },
  { name: 'Exodus', chapters: 40 },
  { name: 'Levitikus', chapters: 27 },
  // ... füge hier die restlichen Bücher hinzu
  { name: 'Matthäus', chapters: 28 },
  { name: 'Markus', chapters: 16 },
  { name: 'Johannes', chapters: 21 },
  { name: 'Offenbarung', chapters: 22 },
];