import { useState, useEffect } from 'react';
import { Timer, Volume2, Bell, ChevronRight } from 'lucide-react';
import { getAlarmSettings, saveAlarmSettings, wakeUpSounds } from '../data/sleepData';

export function AlarmSettings() {
  const [settings, setSettings] = useState(getAlarmSettings());
  const [showSoundPicker, setShowSoundPicker] = useState(false);

  useEffect(() => {
    saveAlarmSettings(settings);
  }, [settings]);

  const handleTimeChange = (e) => {
    setSettings(prev => ({ ...prev, time: e.target.value }));
  };

  const handleToggle = () => {
    setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
  };

  const handleGradualVolumeToggle = () => {
    setSettings(prev => ({ ...prev, gradualVolume: !prev.gradualVolume }));
  };

  const handleSoundSelect = (soundId) => {
    setSettings(prev => ({ ...prev, wakeUpSound: soundId }));
    setShowSoundPicker(false);
  };

  const selectedSound = wakeUpSounds.find(s => s.id === settings.wakeUpSound);

  return (
    <div className="bg-night-800/60 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
            <Timer className="w-5 h-5 text-primary-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">起床闹钟</h3>
            <p className="text-sm text-night-400">自然唤醒，开启美好一天</p>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className={`w-14 h-8 rounded-full transition-all duration-300 ${
            settings.enabled ? 'bg-primary-500' : 'bg-night-700'
          }`}
        >
          <div
            className={`w-7 h-7 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
              settings.enabled ? 'translate-x-7' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      {settings.enabled && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-night-300">闹钟时间</span>
            <input
              type="time"
              value={settings.time}
              onChange={handleTimeChange}
              className="bg-night-700 text-white font-semibold text-xl px-4 py-2 rounded-xl border-none outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-night-400" />
              <span className="text-night-300">渐强音量</span>
            </div>
            <button
              onClick={handleGradualVolumeToggle}
              className={`w-12 h-6 rounded-full transition-all duration-300 ${
                settings.gradualVolume ? 'bg-primary-500' : 'bg-night-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  settings.gradualVolume ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-night-400" />
              <span className="text-night-300">唤醒音效</span>
            </div>
            <button
              onClick={() => setShowSoundPicker(!showSoundPicker)}
              className="flex items-center gap-2 bg-night-700 px-4 py-2 rounded-xl hover:bg-night-600 transition-colors"
            >
              <span className="text-2xl">{selectedSound?.icon}</span>
              <span className="text-white">{selectedSound?.name}</span>
              <ChevronRight className="w-4 h-4 text-night-400" />
            </button>
          </div>

          {showSoundPicker && (
            <div className="grid grid-cols-4 gap-3 animate-slide-up">
              {wakeUpSounds.map(sound => (
                <button
                  key={sound.id}
                  onClick={() => handleSoundSelect(sound.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 ${
                    settings.wakeUpSound === sound.id
                      ? 'bg-primary-500/20 ring-2 ring-primary-500'
                      : 'bg-night-700 hover:bg-night-600'
                  }`}
                >
                  <span className="text-2xl">{sound.icon}</span>
                  <span className="text-sm text-night-300">{sound.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
