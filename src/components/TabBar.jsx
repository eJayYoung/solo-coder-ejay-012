import { Home, BarChart3 } from 'lucide-react';

export function TabBar({ activeTab, onTabChange }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-night-900/95 backdrop-blur-lg border-t border-night-700/50 pb-6">
      <div className="max-w-4xl mx-auto px-4 flex justify-around">
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center gap-1 px-6 py-3 rounded-xl transition-all duration-300 ${
            activeTab === 'home'
              ? 'text-primary-400'
              : 'text-night-400 hover:text-night-300'
          }`}
        >
          <Home className={`w-6 h-6 transition-transform duration-300 ${activeTab === 'home' ? 'scale-110' : ''}`} />
          <span className="text-xs font-medium">首页</span>
        </button>
        <button
          onClick={() => onTabChange('stats')}
          className={`flex flex-col items-center gap-1 px-6 py-3 rounded-xl transition-all duration-300 ${
            activeTab === 'stats'
              ? 'text-primary-400'
              : 'text-night-400 hover:text-night-300'
          }`}
        >
          <BarChart3 className={`w-6 h-6 transition-transform duration-300 ${activeTab === 'stats' ? 'scale-110' : ''}`} />
          <span className="text-xs font-medium">统计</span>
        </button>
      </div>
    </div>
  );
}
