import { Square, Volume2 } from 'lucide-react';

export function PlayingBar({ playingSounds, onStopAll, onVolumeChange }) {
  if (Object.keys(playingSounds).length === 0) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 bg-night-900/95 backdrop-blur-lg border-t border-night-700/50 p-4 animate-slide-up">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {Object.values(playingSounds).slice(0, 3).map((sound) => (
                <div
                  key={sound.id}
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${sound.color} flex items-center justify-center text-sm ring-2 ring-night-900`}
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
              {Object.keys(playingSounds).length > 3 && (
                <div className="w-10 h-10 rounded-full bg-night-700 flex items-center justify-center text-sm ring-2 ring-night-900 text-night-400">
                  +{Object.keys(playingSounds).length - 3}
                </div>
              )}
            </div>

            <div>
              <p className="text-white font-medium">
                {Object.values(playingSounds).map((s) => s.name).join(' + ')}
              </p>
              <p className="text-xs text-night-400">
                {Object.keys(playingSounds).length} 种音效播放中
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-night-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={Object.values(playingSounds)[0]?.volume || 0.5}
                onChange={(e) => {
                  const volume = parseFloat(e.target.value);
                  Object.keys(playingSounds).forEach((id) => {
                    onVolumeChange(id, volume);
                  });
                }}
                className="volume-slider w-24 h-1 bg-night-700 rounded-full appearance-none cursor-pointer"
              />
            </div>

            <button
              onClick={onStopAll}
              className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
            >
              <Square className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
