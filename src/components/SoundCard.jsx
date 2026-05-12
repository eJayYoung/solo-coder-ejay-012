import { useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

const iconMap = {
  CloudRain: '🌧️',
  Waves: '🌊',
  Flame: '🔥',
  Wind: '💨',
  Bird: '🐦',
  CloudLightning: '⛈️',
  Droplets: '💧',
  Bug: '🐛',
};

export function SoundCard({ sound, isPlaying, volume, onToggle, onVolumeChange }) {
  const [showVolume, setShowVolume] = useState(false);

  return (
    <div
      className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isPlaying
          ? `bg-gradient-to-br ${sound.color} shadow-lg shadow-blue-500/20`
          : 'bg-night-800/60 hover:bg-night-700/60'
      }`}
      onClick={() => onToggle(sound)}
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-4xl">{iconMap[sound.icon]}</div>
        {isPlaying && (
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-1 bg-white/60 rounded-full animate-pulse"
                style={{
                  height: `${8 + i * 4}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-1">{sound.name}</h3>
      <p className="text-sm text-night-300 mb-3">{sound.description}</p>

      <div className="flex items-center justify-between">
        {showVolume && isPlaying && (
          <div 
            className="absolute bottom-16 left-4 right-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 bg-night-900/80 rounded-full px-3 py-2">
              <Volume2 className="w-4 h-4 text-night-300" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume || 0.5}
                onChange={(e) => onVolumeChange(sound.id, parseFloat(e.target.value))}
                className="volume-slider w-20 h-1 bg-night-600 rounded-full appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        <button
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            isPlaying
              ? 'bg-white/20 text-white'
              : 'bg-white/10 text-night-300 hover:bg-white/20'
          }`}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>
      </div>
    </div>
  );
}
