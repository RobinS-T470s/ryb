import { getProgress, addProgress } from '@/lib/actions';

export default async function Home() {
  const progressList = await getProgress();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <div className="max-w-xl mx-auto">
        
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-indigo-600 tracking-tight">Trackure</h1>
          <p className="text-slate-600 mt-2">Dein persönlicher Bibellese-Fortschritt</p>
        </header>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Neuen Fortschritt eintragen</h2>
          <form action={addProgress} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Buch</label>
              <input 
                type="text" 
                name="book" 
                placeholder="z.B. Genesis, Johannes, Römer" 
                required 
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Kapitel</label>
              <input 
                type="number" 
                name="chapter" 
                placeholder="z.B. 1" 
                min="1"
                required 
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white outline-none"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white p-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Als gelesen markieren
            </button>
          </form>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Dein Leseverlauf</h2>
          {progressList.length === 0 ? (
            <p className="text-slate-500 text-center py-4">Noch keine Kapitel eingetragen. Fang heute an! 📖</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {progressList.map((item) => (
                <li key={item.id} className="py-3 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-indigo-600">{item.book}</span>
                    <span className="ml-2 text-slate-700">Kapitel {item.chapter}</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(item.completed_at).toLocaleDateString('de-DE')}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  );
}