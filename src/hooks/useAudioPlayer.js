import { useState, useCallback, useRef, useEffect } from 'react';

const STORAGE_KEY = 'sleep-sounds-recent';
const MAX_RECENT = 5;

export function useAudioPlayer() {
  const [playingSounds, setPlayingSounds] = useState({});
  const [recentSounds, setRecentSounds] = useState([]);
  const audioRefs = useRef({});
  const timerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setRecentSounds(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent sounds:', e);
      }
    }
  }, []);

  const updateRecent = useCallback((soundId) => {
    setRecentSounds((prev) => {
      const filtered = prev.filter((id) => id !== soundId);
      const updated = [soundId, ...filtered].slice(0, MAX_RECENT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const playSound = useCallback((sound) => {
    if (!audioRefs.current[sound.id]) {
      audioRefs.current[sound.id] = new Audio(sound.url);
      audioRefs.current[sound.id].loop = true;
      audioRefs.current[sound.id].volume = 0.5;
    }

    audioRefs.current[sound.id].play().then(() => {
      setPlayingSounds((prev) => ({
        ...prev,
        [sound.id]: { ...sound, volume: 0.5 },
      }));
      updateRecent(sound.id);
    }).catch((e) => {
      console.error('Failed to play sound:', e);
    });
  }, [updateRecent]);

  const pauseSound = useCallback((soundId) => {
    if (audioRefs.current[soundId]) {
      audioRefs.current[soundId].pause();
      setPlayingSounds((prev) => {
        const newSounds = { ...prev };
        delete newSounds[soundId];
        return newSounds;
      });
    }
  }, []);

  const toggleSound = useCallback((sound) => {
    if (playingSounds[sound.id]) {
      pauseSound(sound.id);
    } else {
      playSound(sound);
    }
  }, [playingSounds, pauseSound, playSound]);

  const setVolume = useCallback((soundId, volume) => {
    if (audioRefs.current[soundId]) {
      audioRefs.current[soundId].volume = volume;
      setPlayingSounds((prev) => ({
        ...prev,
        [soundId]: { ...prev[soundId], volume },
      }));
    }
  }, []);

  const stopAll = useCallback(() => {
    Object.keys(audioRefs.current).forEach((id) => {
      if (audioRefs.current[id]) {
        audioRefs.current[id].pause();
        audioRefs.current[id].currentTime = 0;
      }
    });
    setPlayingSounds({});
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const setTimer = useCallback((minutes) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (minutes > 0) {
      timerRef.current = setTimeout(() => {
        stopAll();
      }, minutes * 60 * 1000);
      return timerRef.current;
    }
    return null;
  }, [stopAll]);

  const getTimerRemaining = useCallback(() => {
    if (!timerRef.current) return 0;
    return timerRef.current;
  }, []);

  useEffect(() => {
    return () => {
      stopAll();
    };
  }, [stopAll]);

  return {
    playingSounds,
    recentSounds,
    toggleSound,
    setVolume,
    stopAll,
    setTimer,
    getTimerRemaining,
  };
}
