export function SleepChart({ data, type = 'duration' }) {
  if (!data || data.length === 0) return null;

  const values = data.map(d => parseFloat(d[type]));
  const maxValue = Math.max(...values) * 1.2;
  const minValue = Math.min(...values) * 0.8;
  const range = maxValue - minValue || 1;

  const days = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="bg-night-800/60 rounded-2xl p-6">
      <div className="flex items-end justify-between h-48 gap-2">
        {data.map((item, index) => {
          const value = parseFloat(item[type]);
          const height = ((value - minValue) / range) * 100;
          const normalizedHeight = Math.max(height, 10);

          return (
            <div key={item.date} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center">
                <span className="text-xs text-night-400 mb-1">{value}</span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-primary-500 to-primary-300 transition-all duration-500 hover:from-primary-400 hover:to-primary-200"
                  style={{
                    height: `${normalizedHeight}%`,
                    minHeight: '20px',
                    maxHeight: '160px',
                  }}
                />
              </div>
              <span className="text-xs text-night-500">
                {days[new Date(item.date).getDay()]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
