const SLEEP_DATA_KEY = 'sleep-sounds-sleep-data';
const ALARM_KEY = 'sleep-sounds-alarm';
const REMINDER_KEY = 'sleep-sounds-reminder';

function generateMockSleepData() {
  const data = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const sleepHours = 5 + Math.random() * 4;
    const deepSleep = Math.floor(sleepHours * (0.2 + Math.random() * 0.2));
    const lightSleep = Math.floor(sleepHours * (0.4 + Math.random() * 0.2));
    
    data.push({
      date: date.toISOString().split('T')[0],
      sleepStart: `${22 + Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      sleepEnd: `${6 + Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      duration: sleepHours.toFixed(1),
      deepSleep,
      lightSleep,
      awake: Math.round((sleepHours - deepSleep - lightSleep) * 10) / 10,
      quality: Math.floor(50 + Math.random() * 50),
      soundsUsed: Math.floor(Math.random() * 4) + 1,
      playDuration: Math.floor(sleepHours * 60 * (0.5 + Math.random() * 0.5)),
    });
  }
  
  return data;
}

export function getSleepData() {
  const saved = localStorage.getItem(SLEEP_DATA_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse sleep data:', e);
    }
  }
  
  const mockData = generateMockSleepData();
  localStorage.setItem(SLEEP_DATA_KEY, JSON.stringify(mockData));
  return mockData;
}

export function addSleepRecord(record) {
  const data = getSleepData();
  const existingIndex = data.findIndex(d => d.date === record.date);
  
  if (existingIndex >= 0) {
    data[existingIndex] = { ...data[existingIndex], ...record };
  } else {
    data.push(record);
  }
  
  localStorage.setItem(SLEEP_DATA_KEY, JSON.stringify(data));
  return data;
}

export function getTodaySleepRecord() {
  const today = new Date().toISOString().split('T')[0];
  const data = getSleepData();
  return data.find(d => d.date === today) || null;
}

export function getWeeklyData() {
  const data = getSleepData();
  return data.slice(-7);
}

export function getMonthlyData() {
  const data = getSleepData();
  return data.slice(-30);
}

export function calculateWeeklyStats(data) {
  if (data.length === 0) return null;
  
  const avgSleep = data.reduce((sum, d) => sum + parseFloat(d.duration), 0) / data.length;
  const avgQuality = Math.round(data.reduce((sum, d) => sum + d.quality, 0) / data.length);
  const totalPlayTime = data.reduce((sum, d) => sum + d.playDuration, 0);
  
  return {
    avgSleep: avgSleep.toFixed(1),
    avgQuality,
    totalPlayTime: Math.round(totalPlayTime / 60),
    nightsWithApp: data.filter(d => d.soundsUsed > 0).length,
  };
}

export function calculateDailyStats(record) {
  if (!record) return null;
  
  const total = parseFloat(record.deepSleep) + parseFloat(record.lightSleep) + parseFloat(record.awake);
  
  return {
    deepPercent: total > 0 ? Math.round((parseFloat(record.deepSleep) / total) * 100) : 0,
    lightPercent: total > 0 ? Math.round((parseFloat(record.lightSleep) / total) * 100) : 0,
    awakePercent: total > 0 ? Math.round((parseFloat(record.awake) / total) * 100) : 0,
  };
}

export function getAlarmSettings() {
  const saved = localStorage.getItem(ALARM_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse alarm settings:', e);
    }
  }
  return { enabled: false, time: '07:00', gradualVolume: true, wakeUpSound: 'birds' };
}

export function saveAlarmSettings(settings) {
  localStorage.setItem(ALARM_KEY, JSON.stringify(settings));
  return settings;
}

export function getReminderSettings() {
  const saved = localStorage.getItem(REMINDER_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse reminder settings:', e);
    }
  }
  return { enabled: false, time: '22:00', message: '该睡觉了，放松身心吧' };
}

export function saveReminderSettings(settings) {
  localStorage.setItem(REMINDER_KEY, JSON.stringify(settings));
  return settings;
}

export const wakeUpSounds = [
  { id: 'birds', name: '鸟鸣', icon: '🐦' },
  { id: 'stream', name: '溪流', icon: '💧' },
  { id: 'waves', name: '海浪', icon: '🌊' },
  { id: 'wind', name: '风声', icon: '💨' },
];
