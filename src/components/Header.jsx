import { Moon, Timer } from 'lucide-react';

export function Header({ onOpenTimer, timerActive }) {
  return (
    <header className="py-6 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Moon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">睡眠白噪音</h1>
            <p className="text-sm text-night-400">放松身心，安然入眠</p>
          </div>
        </div>

        <button
          onClick={onOpenTimer}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
            timerActive
              ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
              : 'bg-night-800 text-night-300 hover:bg-night-700'
          }`}
        >
          <Timer className="w-4 h-4" />
          <span className="text-sm font-medium">{timerActive ? '已定时' : '定时'}</span>
        </button>
      </div>
    </header>
  );
}
