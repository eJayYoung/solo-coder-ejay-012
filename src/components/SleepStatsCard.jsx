import { Moon, Zap, Clock, Music } from 'lucide-react';

export function SleepStatsCard({ title, value, unit, icon, color, subtitle }) {
  const iconMap = {
    Moon,
    Zap,
    Clock,
    Music,
  };

  const IconComponent = iconMap[icon];

  return (
    <div className="bg-night-800/60 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl bg-${color}-500/20 flex items-center justify-center`}>
          <IconComponent className={`w-6 h-6 text-${color}-400`} />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-night-400">{unit}</p>
        {subtitle && <p className="text-xs text-night-500">{subtitle}</p>}
      </div>
    </div>
  );
}
