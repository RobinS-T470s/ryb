import { getReadChapters } from '@/lib/actions';
import { BIBLE_BOOKS } from '@/lib/booksData';
import ChapterGrid from './components/ChapterGrid';

export default async function Home() {
  // Holt das Array direkt aus der DB via Server Action, z.B. ["Genesis-1", "Johannes-3"]
  const readChaptersList = await getReadChapters();
  const readChaptersSet = new Set(readChaptersList);

  // Fortschrittsberechnung auf dem Server
  const totalChapters = BIBLE_BOOKS.reduce((sum, b) => sum + b.chapters, 0);
  const progressPercent = Math.round((readChaptersSet.size / totalChapters) * 100);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-indigo-600 tracking-tight">Trackure</h1>
          <p className="text-slate-600 mt-2">Dein persönlicher Bibellese-Fortschritt</p>
          
          <div className="mt-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
              <span>Gesamtfortschritt</span>
              <span>{readChaptersSet.size} von {totalChapters} Kapiteln ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-indigo-600 h-3 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Bücher & Kapitel</h2>
          
          {BIBLE_BOOKS.map((book) => {
            // Berechnen, wie viele Kapitel dieses Buches gelesen wurden (für die Header-Anzeige)
            const readInThisBook = Array.from({ length: book.chapters }).filter((_, i) => 
              readChaptersSet.has(`${book.name}-${i + 1}`)
            ).length;

            return (
              <details 
                key={book.name} 
                className="group bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition select-none">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-800 group-open:text-indigo-600 transition">
                      {book.name}
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                      {readInThisBook}/{book.chapters} erledigt
                    </span>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>

                <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                  <ChapterGrid 
                    bookName={book.name} 
                    totalChapters={book.chapters} 
                    initialReadChapters={readChaptersList} 
                  />
                </div>
              </details>
            );
          })}
        </section>

      </div>
    </main>
  );
}