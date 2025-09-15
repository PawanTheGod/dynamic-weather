import { Cloud, Sun, CloudRain, CloudSnow } from "lucide-react";
import { AnimatedWeatherIcon } from "@/components/AnimatedWeatherIcon";
import { WeatherCondition } from "@/components/weather-backgrounds/WeatherBackground";
import weatherHero from "@/assets/weather-hero.png";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  feelsLike: number;
  date: string;
  weatherType: WeatherCondition;
}

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <div className="weather-card animate-fade-in">
      {/* Floating background element */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-float"></div>
      
      {/* Header */}
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
          {weather.location}
        </h1>
        <p className="text-white/80 text-lg">
          {weather.date}
        </p>
      </div>

      {/* Main Weather Display */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Animated Weather Icon */}
        <div className="relative">
          <AnimatedWeatherIcon 
            condition={weather.weatherType}
            size={140}
            className="transition-all duration-500"
          />
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black/20 rounded-full blur-sm"></div>
        </div>

        {/* Temperature Display */}
        <div className="text-center lg:text-left">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-6xl lg:text-8xl font-light text-white drop-shadow-lg">
              {weather.temperature}
            </span>
            <span className="text-3xl lg:text-4xl text-white/80 font-light">
              °C
            </span>
          </div>
          
          <div className="space-y-2">
            <p className="text-xl lg:text-2xl text-white font-medium capitalize">
              {weather.condition}
            </p>
            <p className="text-white/70 text-lg">
              Feels like {weather.feelsLike}°C
            </p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-5 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-500"></div>
    </div>
  );
};