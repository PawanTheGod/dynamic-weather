import { ClearSkyBackground } from "./ClearSkyBackground";
import { CloudyBackground } from "./CloudyBackground";
import { RainyBackground } from "./RainyBackground";
import { SnowyBackground } from "./SnowyBackground";
import { ThunderstormBackground } from "./ThunderstormBackground";

export type WeatherCondition = 'clear' | 'cloudy' | 'rainy' | 'snowy' | 'thunderstorm';

interface WeatherBackgroundProps {
  condition: WeatherCondition;
  className?: string;
}

export const WeatherBackground = ({ condition, className = "" }: WeatherBackgroundProps) => {
  const renderBackground = () => {
    switch (condition) {
      case 'clear':
        return <ClearSkyBackground />;
      case 'cloudy':
        return <CloudyBackground />;
      case 'rainy':
        return <RainyBackground />;
      case 'snowy':
        return <SnowyBackground />;
      case 'thunderstorm':
        return <ThunderstormBackground />;
      default:
        return <ClearSkyBackground />;
    }
  };

  return (
    <div className={`fixed inset-0 transition-all duration-1000 ease-in-out ${className}`}>
      {renderBackground()}
    </div>
  );
};