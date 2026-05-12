import { useEffect, useRef, useState } from 'react';

export function useReminder(settings) {
  const timerRef = useRef(null);
  const [notificationPermission, setNotificationPermission] = useState('default');

  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
    }
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (settings.enabled && notificationPermission === 'granted') {
      const [hours, minutes] = settings.time.split(':').map(Number);
      const now = new Date();
      const reminderTime = new Date();
      reminderTime.setHours(hours, minutes, 0, 0);

      let delay = reminderTime.getTime() - now.getTime();
      
      if (delay < 0) {
        delay += 24 * 60 * 60 * 1000;
      }

      timerRef.current = setTimeout(() => {
        new Notification('睡前提醒', {
          body: settings.message,
          icon: '/vite.svg',
          sound: true,
        });
      }, delay);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [settings.enabled, settings.time, settings.message, notificationPermission]);

  const scheduleDailyReminder = () => {
    if (notificationPermission !== 'granted') {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
      return;
    }

    const [hours, minutes] = settings.time.split(':').map(Number);
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);

    let delay = reminderTime.getTime() - now.getTime();
    
    if (delay < 0) {
      delay += 24 * 60 * 60 * 1000;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      new Notification('睡前提醒', {
        body: settings.message,
        icon: '/vite.svg',
        sound: true,
      });

      timerRef.current = setTimeout(() => {
        scheduleDailyReminder();
      }, 24 * 60 * 60 * 1000);
    }, delay);
  };

  return {
    notificationPermission,
    scheduleDailyReminder,
  };
}
