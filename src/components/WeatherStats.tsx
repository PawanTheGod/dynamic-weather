import { Eye, Droplets, Wind, Gauge, Thermometer, Sun } from "lucide-react";

interface WeatherStatsData {
  visibility: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
  sunrise: string;
}

interface WeatherStatsProps {
  stats: WeatherStatsData;
}

const StatCard = ({ 
  icon: Icon, 
  value, 
  label, 
  gradient = "from-blue-400 to-cyan-400" 
}: { 
  icon: any; 
  value: string; 
  label: string;
  gradient?: string;
}) => (
  <div className="stats-card group">
    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-6 h-6 text-white drop-shadow-sm" />
    </div>
    <div className="space-y-1">
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-white/70 text-sm uppercase tracking-wider font-medium">{label}</p>
    </div>
  </div>
);

export const WeatherStats = ({ stats }: WeatherStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      <StatCard
        icon={Eye}
        value={stats.visibility}
        label="Visibility"
        gradient="from-purple-400 to-pink-400"
      />
      <StatCard
        icon={Droplets}
        value={`${stats.humidity}%`}
        label="Humidity"
        gradient="from-blue-400 to-cyan-400"
      />
      <StatCard
        icon={Wind}
        value={`${stats.windSpeed} km/h`}
        label="Wind Speed"
        gradient="from-green-400 to-emerald-400"
      />
      <StatCard
        icon={Gauge}
        value={`${stats.pressure} mb`}
        label="Pressure"
        gradient="from-orange-400 to-red-400"
      />
      <StatCard
        icon={Thermometer}
        value={stats.uvIndex.toString()}
        label="UV Index"
        gradient="from-yellow-400 to-orange-400"
      />
      <StatCard
        icon={Sun}
        value={stats.sunrise}
        label="Sunrise"
        gradient="from-pink-400 to-rose-400"
      />
    </div>
  );
};