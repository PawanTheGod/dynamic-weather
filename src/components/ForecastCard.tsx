import { Cloud, Sun, CloudRain, CloudSnow } from "lucide-react";
import { WeatherCondition } from "@/components/weather-backgrounds/WeatherBackground";

interface ForecastItem {
  id: string;
  day: string;
  condition: string;
  high: number;
  low: number;
  weatherType: WeatherCondition;
  precipitation?: number;
}

interface ForecastCardProps {
  forecast: ForecastItem[];
}

const WeatherIcon = ({ type, size = "w-8 h-8" }: { type: string; size?: string }) => {
  const iconClass = `${size}`;
  
  switch (type) {
    case 'clear':
      return <Sun className={`${iconClass} text-yellow-400 drop-shadow-sm`} />;
    case 'cloudy':
      return <Cloud className={`${iconClass} text-gray-300 drop-shadow-sm`} />;
    case 'rainy':
      return <CloudRain className={`${iconClass} text-blue-400 drop-shadow-sm`} />;
    case 'snowy':
      return <CloudSnow className={`${iconClass} text-blue-200 drop-shadow-sm`} />;
    default:
      return <Sun className={`${iconClass} text-yellow-400 drop-shadow-sm`} />;
  }
};

export const ForecastCard = ({ forecast }: ForecastCardProps) => {
  return (
    <div className="glass-strong rounded-3xl p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl">
          <Sun className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-white">7-Day Forecast</h2>
      </div>
      
      <div className="space-y-4">
        {forecast.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Day */}
            <div className="flex-1">
              <p className="font-medium text-white group-hover:text-white/90 transition-colors">
                {item.day}
              </p>
              <p className="text-sm text-white/60 capitalize">
                {item.condition}
              </p>
            </div>
            
            {/* Weather Icon */}
            <div className="mx-4 group-hover:scale-110 transition-transform duration-300">
              <WeatherIcon type={item.weatherType} />
            </div>
            
            {/* Temperature Range */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-white font-semibold">
                {item.high}°
              </span>
              <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full"></div>
              </div>
              <span className="text-white/60">
                {item.low}°
              </span>
            </div>
            
            {/* Precipitation */}
            {item.precipitation && (
              <div className="ml-4 text-right min-w-0">
                <p className="text-sm text-blue-300">
                  {item.precipitation}%
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};