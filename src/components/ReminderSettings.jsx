import { useState, useEffect } from 'react';
import { Clock, MessageSquare, ChevronRight, Bell, AlertCircle } from 'lucide-react';
import { getReminderSettings, saveReminderSettings } from '../data/sleepData';
import { useReminder } from '../hooks/useReminder';

export function ReminderSettings() {
  const [settings, setSettings] = useState(getReminderSettings());
  const [isScheduled, setIsScheduled] = useState(false);
  const [showTestNotification, setShowTestNotification] = useState(false);

  const { notificationPermission, scheduleDailyReminder } = useReminder(settings);

  useEffect(() => {
    saveReminderSettings(settings);
  }, [settings]);

  const handleTimeChange = (e) => {
    setSettings(prev => ({ ...prev, time: e.target.value }));
    setIsScheduled(false);
  };

  const handleMessageChange = (e) => {
    setSettings(prev => ({ ...prev, message: e.target.value }));
  };

  const handleToggle = () => {
    const newEnabled = !settings.enabled;
    setSettings(prev => ({ ...prev, enabled: newEnabled }));
    if (!newEnabled) {
      setIsScheduled(false);
    }
  };

  const handleSetReminder = () => {
    if (notificationPermission === 'denied') {
      alert('请在浏览器设置中允许通知权限');
      return;
    }

    if (notificationPermission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          scheduleDailyReminder();
          setIsScheduled(true);
        }
      });
    } else {
      scheduleDailyReminder();
      setIsScheduled(true);
    }
  };

  const handleTestReminder = () => {
    if (notificationPermission === 'granted') {
      new Notification('睡前提醒测试', {
        body: settings.message || '该睡觉了，放松身心吧',
        icon: '/vite.svg',
      });
    } else {
      setShowTestNotification(true);
      setTimeout(() => setShowTestNotification(false), 3000);
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${parseInt(hours)}点${parseInt(minutes)}分`;
  };

  return (
    <div className="bg-night-800/60 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">睡前提醒</h3>
            <p className="text-sm text-night-400">养成规律作息</p>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className={`w-14 h-8 rounded-full transition-all duration-300 ${
            settings.enabled ? 'bg-purple-500' : 'bg-night-700'
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
            <span className="text-night-300">提醒时间</span>
            <input
              type="time"
              value={settings.time}
              onChange={handleTimeChange}
              className="bg-night-700 text-white font-semibold text-xl px-4 py-2 rounded-xl border-none outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-night-400" />
              <span className="text-night-300">提醒消息</span>
            </div>
            <input
              type="text"
              value={settings.message}
              onChange={handleMessageChange}
              className="w-full bg-night-700 text-white px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="输入提醒消息..."
            />
          </div>

          {notificationPermission === 'denied' && (
            <div className="flex items-center gap-2 text-amber-400 bg-amber-500/10 rounded-xl p-3">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">通知权限已被拒绝，请在浏览器设置中开启</span>
            </div>
          )}

          {notificationPermission === 'default' && (
            <div className="flex items-center gap-2 text-blue-400 bg-blue-500/10 rounded-xl p-3">
              <Bell className="w-4 h-4" />
              <span className="text-sm">首次设置需要授权通知权限</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleSetReminder}
              disabled={!settings.time}
              className={`py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                isScheduled
                  ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:opacity-90'
              }`}
            >
              <Clock className="w-4 h-4" />
              {isScheduled ? '已设置' : '设置提醒'}
            </button>
            <button
              onClick={handleTestReminder}
              className="py-3 bg-night-700 text-night-300 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-night-600 transition-colors"
            >
              <Bell className="w-4 h-4" />
              测试提醒
            </button>
          </div>

          {isScheduled && (
            <div className="flex items-center justify-between bg-green-500/10 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm">提醒已设置</span>
              </div>
              <span className="text-night-400 text-sm">
                每天 {formatTime(settings.time)} 提醒
              </span>
            </div>
          )}
        </div>
      )}

      {showTestNotification && (
        <div className="fixed top-4 right-4 bg-night-800 rounded-xl p-4 shadow-xl z-50 animate-slide-up flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Bell className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <p className="text-white font-medium">睡前提醒测试</p>
            <p className="text-sm text-night-400">{settings.message || '该睡觉了，放松身心吧'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
