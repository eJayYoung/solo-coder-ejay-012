import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Heart, Activity } from 'lucide-react';
import { SleepStatsCard } from '../components/SleepStatsCard';
import { SleepChart } from '../components/SleepChart';
import { SleepStages } from '../components/SleepStages';
import { AlarmSettings } from '../components/AlarmSettings';
import { ReminderSettings } from '../components/ReminderSettings';
import { getWeeklyData, getTodaySleepRecord, calculateWeeklyStats } from '../data/sleepData';

export function StatsPage() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [todayRecord, setTodayRecord] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState(null);
  const [viewMode, setViewMode] = useState('week');

  useEffect(() => {
    const data = getWeeklyData();
    setWeeklyData(data);
    setWeeklyStats(calculateWeeklyStats(data));
    setTodayRecord(getTodaySleepRecord());
  }, []);

  const today = new Date();
  const dateString = `${today.getMonth() + 1}月${today.getDate()}日`;

  return (
    <div className="min-h-screen pb-24">
      <header className="py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">睡眠统计</h1>
              <p className="text-sm text-night-400">{dateString}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 space-y-6">
        <section>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                viewMode === 'week'
                  ? 'bg-primary-500 text-white'
                  : 'bg-night-800 text-night-400 hover:bg-night-700'
              }`}
            >
              本周
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                viewMode === 'month'
                  ? 'bg-primary-500 text-white'
                  : 'bg-night-800 text-night-400 hover:bg-night-700'
              }`}
            >
              本月
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SleepStatsCard
              value={weeklyStats?.avgSleep || '--'}
              unit="小时"
              icon="Moon"
              color="primary"
              subtitle="平均睡眠时长"
            />
            <SleepStatsCard
              value={weeklyStats?.avgQuality || '--'}
              unit="分"
              icon="Zap"
              color="amber"
              subtitle="平均睡眠质量"
            />
            <SleepStatsCard
              value={weeklyStats?.totalPlayTime || '--'}
              unit="小时"
              icon="Music"
              color="purple"
              subtitle="本周播放时长"
            />
            <SleepStatsCard
              value={weeklyStats?.nightsWithApp || '--'}
              unit="晚"
              icon="Clock"
              color="green"
              subtitle="使用天数"
            />
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary-400" />
            <h2 className="text-lg font-semibold text-white">睡眠时长趋势</h2>
          </div>
          <SleepChart data={weeklyData} type="duration" />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary-400" />
            <h2 className="text-lg font-semibold text-white">今日睡眠详情</h2>
          </div>
          <SleepStages record={todayRecord} />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary-400" />
            <h2 className="text-lg font-semibold text-white">健康同步</h2>
          </div>
          <div className="bg-night-800/60 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-xl">❤️</span>
                </div>
                <div>
                  <p className="text-white font-medium">Apple Health</p>
                  <p className="text-sm text-night-400">同步睡眠数据</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium hover:bg-primary-500/30 transition-colors">
                连接
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <AlarmSettings />
          <ReminderSettings />
        </section>
      </main>
    </div>
  );
}
