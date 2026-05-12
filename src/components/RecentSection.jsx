import { Clock, Play } from 'lucide-react';

export function RecentSection({ recentSounds, sounds, onPlaySound }) {
  if (recentSounds.length === 0) return null;

  const recentSoundData = recentSounds
    .map((id) => sounds.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary-400" />
        <h2 className="text-lg font-semibold text-white">最近播放</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {recentSoundData.map((sound) => (
          <button
            key={sound.id}
            onClick={() => onPlaySound(sound)}
            className="flex-shrink-0 bg-night-800/60 rounded-xl p-4 hover:bg-night-700/60 transition-all duration-300 group"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${sound.color} flex items-center justify-center text-2xl mb-3`}>
              {sound.id === 'rain' && '🌧️'}
              {sound.id === 'waves' && '🌊'}
              {sound.id === 'fire' && '🔥'}
              {sound.id === 'wind' && '💨'}
              {sound.id === 'birds' && '🐦'}
              {sound.id === 'thunder' && '⛈️'}
              {sound.id === 'stream' && '💧'}
              {sound.id === 'crickets' && '🐛'}
            </div>
            <div className="text-center">
              <span className="font-medium text-white text-sm">{sound.name}</span>
              <div className="w-6 h-6 mx-auto mt-2 rounded-full bg-primary-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-3 h-3 text-primary-400" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
