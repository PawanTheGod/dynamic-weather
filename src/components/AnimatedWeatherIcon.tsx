import { Cloud, Sun, CloudRain, CloudSnow, Zap } from "lucide-react";
import { WeatherCondition } from "./weather-backgrounds/WeatherBackground";

interface AnimatedWeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  className?: string;
}

export const AnimatedWeatherIcon = ({ condition, size = 140, className = "" }: AnimatedWeatherIconProps) => {
  const iconProps = {
    width: size,
    height: size,
    className: `drop-shadow-2xl ${className}`
  };

  switch (condition) {
    case 'clear':
      return (
        <div className="relative">
          <Sun 
            {...iconProps} 
            className={`${iconProps.className} text-yellow-400 animate-sun-glow`}
          />
          {/* Sun rays */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 bg-yellow-300/60 rounded-full animate-pulse"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: 'center',
                transform: `translate(-50%, -50%) translateY(-${size/2 + 20}px) rotate(${i * 45}deg)`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      );
      
    case 'cloudy':
      return (
        <div className="relative">
          <Cloud 
            {...iconProps} 
            className={`${iconProps.className} text-gray-300 animate-cloud-layer`}
          />
          {/* Additional smaller clouds */}
          <Cloud 
            width={size * 0.6}
            height={size * 0.6}
            className="absolute -top-4 -right-6 text-gray-200/60 animate-cloud-layer"
            style={{ animationDelay: '2s', animationDuration: '12s' }}
          />
          <Cloud 
            width={size * 0.4}
            height={size * 0.4}
            className="absolute -bottom-2 -left-4 text-gray-100/40 animate-cloud-layer"
            style={{ animationDelay: '4s', animationDuration: '18s' }}
          />
        </div>
      );
      
    case 'rainy':
      return (
        <div className="relative">
          <CloudRain 
            {...iconProps} 
            className={`${iconProps.className} text-blue-400`}
          />
          {/* Animated rain drops */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-4 bg-blue-300/70 rounded-full animate-rain-drop"
              style={{
                left: `${30 + (i % 4) * 20}%`,
                top: `${60 + (i % 3) * 10}%`,
                animationDelay: `${(i * 0.1)}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      );
      
    case 'snowy':
      return (
        <div className="relative">
          <CloudSnow 
            {...iconProps} 
            className={`${iconProps.className} text-blue-200`}
          />
          {/* Animated snowflakes */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white/80 animate-snow-fall select-none"
              style={{
                left: `${20 + (i % 4) * 25}%`,
                top: `${50 + (i % 3) * 15}%`,
                fontSize: `${12 + Math.random() * 8}px`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${6 + Math.random() * 3}s`
              }}
            >
              ❄
            </div>
          ))}
        </div>
      );
      
    case 'thunderstorm':
      return (
        <div className="relative">
          <div className="relative">
            <Zap 
              {...iconProps} 
              className={`${iconProps.className} text-yellow-300 animate-lightning`}
            />
            <Cloud 
              width={size * 0.8}
              height={size * 0.8}
              className="absolute -top-2 -left-2 text-gray-600 animate-cloud-layer"
            />
          </div>
          {/* Lightning bolts */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-8 bg-yellow-200/80 animate-lightning"
              style={{
                left: `${40 + i * 15}%`,
                top: `${65 + i * 5}%`,
                animationDelay: `${i * 0.3}s`,
                transform: `rotate(${-10 + i * 10}deg)`,
                filter: 'drop-shadow(0 0 4px rgba(255, 255, 0, 0.8))'
              }}
            />
          ))}
        </div>
      );
      
    default:
      return (
        <Sun 
          {...iconProps} 
          className={`${iconProps.className} text-yellow-400 animate-sun-glow`}
        />
      );
  }
};