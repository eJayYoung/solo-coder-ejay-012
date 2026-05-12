import { useState } from 'react';
import { X, Clock, Check } from 'lucide-react';

const timerOptions = [15, 30, 45, 60, 90, 120];

export function TimerModal({ isOpen, onClose, onSetTimer }) {
  const [selectedMinutes, setSelectedMinutes] = useState(30);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-night-950/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-night-800 rounded-3xl p-6 w-80 animate-slide-up shadow-2xl shadow-blue-500/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-400" />
            定时关闭
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-night-700 flex items-center justify-center text-night-400 hover:text-white hover:bg-night-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-night-400 text-sm mb-4">选择自动关闭时间</p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {timerOptions.map((minutes) => (
            <button
              key={minutes}
              onClick={() => setSelectedMinutes(minutes)}
              className={`py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedMinutes === minutes
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-night-700 text-night-300 hover:bg-night-600'
              }`}
            >
              {minutes}分钟
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            onSetTimer(selectedMinutes);
            onClose();
          }}
          className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-primary-500/30"
        >
          <Check className="w-5 h-5" />
          确认设置
        </button>
      </div>
    </div>
  );
}
