export function SleepStages({ record }) {
  if (!record) return null;

  const total = parseFloat(record.deepSleep) + parseFloat(record.lightSleep) + parseFloat(record.awake);
  
  const deepPercent = total > 0 ? (parseFloat(record.deepSleep) / total) * 100 : 0;
  const lightPercent = total > 0 ? (parseFloat(record.lightSleep) / total) * 100 : 0;
  const awakePercent = total > 0 ? (parseFloat(record.awake) / total) * 100 : 0;

  return (
    <div className="bg-night-800/60 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4">睡眠阶段分布</h3>
      
      <div className="flex h-3 rounded-full overflow-hidden mb-4">
        <div
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
          style={{ width: `${deepPercent}%` }}
        />
        <div
          className="bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-500"
          style={{ width: `${lightPercent}%` }}
        />
        <div
          className="bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-500"
          style={{ width: `${awakePercent}%` }}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 mx-auto mb-2" />
          <p className="text-white font-medium">{record.deepSleep}h</p>
          <p className="text-xs text-night-400">深度睡眠</p>
          <p className="text-xs text-night-500">{Math.round(deepPercent)}%</p>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 mx-auto mb-2" />
          <p className="text-white font-medium">{record.lightSleep}h</p>
          <p className="text-xs text-night-400">浅度睡眠</p>
          <p className="text-xs text-night-500">{Math.round(lightPercent)}%</p>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 mx-auto mb-2" />
          <p className="text-white font-medium">{record.awake}h</p>
          <p className="text-xs text-night-400">清醒</p>
          <p className="text-xs text-night-500">{Math.round(awakePercent)}%</p>
        </div>
      </div>
    </div>
  );
}
