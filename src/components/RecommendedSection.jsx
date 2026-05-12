import { Sparkles, Play } from 'lucide-react';

export function RecommendedSection({ combinations, sounds, onPlayCombination }) {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary-400" />
        <h2 className="text-lg font-semibold text-white">推荐组合</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {combinations.map((combo) => {
          const comboSounds = combo.sounds.map((id) => sounds.find((s) => s.id === id));
          
          return (
            <button
              key={combo.id}
              onClick={() => onPlayCombination(combo)}
              className="bg-night-800/60 rounded-xl p-4 text-left hover:bg-night-700/60 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">{combo.name}</span>
                <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4 text-primary-400" />
                </div>
              </div>
              <p className="text-sm text-night-400">{combo.description}</p>
              <div className="flex gap-2 mt-3">
                {comboSounds.map((sound) => (
                  <div
                    key={sound.id}
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${sound.color} flex items-center justify-center text-lg`}
                  >
                    {sound.id === 'rain' && '🌧️'}
                    {sound.id === 'waves' && '🌊'}
                    {sound.id === 'fire' && '🔥'}
                    {sound.id === 'wind' && '💨'}
                    {sound.id === 'birds' && '🐦'}
                    {sound.id === 'thunder' && '⛈️'}
                    {sound.id === 'stream' && '💧'}
                    {sound.id === 'crickets' && '🐛'}
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
