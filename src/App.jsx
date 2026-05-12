import { useState } from 'react';
import { Header } from './components/Header';
import { SoundCard } from './components/SoundCard';
import { TimerModal } from './components/TimerModal';
import { RecommendedSection } from './components/RecommendedSection';
import { RecentSection } from './components/RecentSection';
import { PlayingBar } from './components/PlayingBar';
import { TabBar } from './components/TabBar';
import { StatsPage } from './pages/StatsPage';
import { sounds, recommendedCombinations } from './data/sounds';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { Layers } from 'lucide-react';

function HomePage({
  playingSounds,
  recentSounds,
  toggleSound,
  setVolume,
  stopAll,
  onOpenTimer,
  timerActive,
}) {
  const handlePlayCombination = (combo) => {
    combo.sounds.forEach((soundId) => {
      const sound = sounds.find((s) => s.id === soundId);
      if (sound && !playingSounds[soundId]) {
        toggleSound(sound);
      }
    });
  };

  return (
    <div className="min-h-screen pb-32">
      <Header onOpenTimer={onOpenTimer} timerActive={timerActive} />

      <main className="max-w-4xl mx-auto px-4">
        <RecommendedSection
          combinations={recommendedCombinations}
          sounds={sounds}
          onPlayCombination={handlePlayCombination}
        />

        <RecentSection
          recentSounds={recentSounds}
          sounds={sounds}
          onPlaySound={toggleSound}
        />

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-primary-400" />
            <h2 className="text-lg font-semibold text-white">全部音效</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sounds.map((sound) => (
              <SoundCard
                key={sound.id}
                sound={sound}
                isPlaying={!!playingSounds[sound.id]}
                volume={playingSounds[sound.id]?.volume}
                onToggle={toggleSound}
                onVolumeChange={setVolume}
              />
            ))}
          </div>
        </section>
      </main>

      <PlayingBar
        playingSounds={playingSounds}
        onStopAll={stopAll}
        onVolumeChange={setVolume}
      />
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const {
    playingSounds,
    recentSounds,
    toggleSound,
    setVolume,
    stopAll,
    setTimer,
  } = useAudioPlayer();

  const handleSetTimer = (minutes) => {
    setTimer(minutes);
    setTimerActive(true);
    setTimeout(() => {
      setTimerActive(false);
    }, minutes * 60 * 1000);
  };

  return (
    <div className="min-h-screen">
      {activeTab === 'home' && (
        <HomePage
          playingSounds={playingSounds}
          recentSounds={recentSounds}
          toggleSound={toggleSound}
          setVolume={setVolume}
          stopAll={stopAll}
          onOpenTimer={() => setIsTimerOpen(true)}
          timerActive={timerActive}
        />
      )}

      {activeTab === 'stats' && <StatsPage />}

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <TimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        onSetTimer={handleSetTimer}
      />
    </div>
  );
}

export default App;
