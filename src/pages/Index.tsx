import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { WeatherHeader } from "@/components/WeatherHeader";
import { WeatherCard } from "@/components/WeatherCard";
import { WeatherStats } from "@/components/WeatherStats";
import { ForecastCard } from "@/components/ForecastCard";
import { AIInsights } from "@/components/AIInsights";
import { WeatherBackground, WeatherCondition } from "@/components/weather-backgrounds/WeatherBackground";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Weather conditions to cycle through
const weatherConditions: Array<{condition: WeatherCondition, label: string}> = [
  { condition: 'clear', label: 'Clear Sky' },
  { condition: 'cloudy', label: 'Cloudy' },
  { condition: 'rainy', label: 'Rainy' },
  { condition: 'snowy', label: 'Snowy' },
  { condition: 'thunderstorm', label: 'Thunderstorm' }
];

// Mock data - in a real app, this would come from an API
const createMockWeatherData = (condition: WeatherCondition) => ({
  location: "San Francisco, CA",
  temperature: condition === 'snowy' ? 2 : condition === 'rainy' ? 18 : condition === 'thunderstorm' ? 16 : 22,
  condition: condition === 'clear' ? 'Sunny' : condition === 'cloudy' ? 'Partly Cloudy' : 
             condition === 'rainy' ? 'Light Rain' : condition === 'snowy' ? 'Light Snow' : 'Thunderstorm',
  feelsLike: condition === 'snowy' ? -1 : condition === 'rainy' ? 20 : condition === 'thunderstorm' ? 14 : 25,
  date: new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }),
  weatherType: condition
});

const mockStatsData = {
  visibility: "10 km",
  humidity: 65,
  windSpeed: 12,
  pressure: 1013,
  uvIndex: 6,
  sunrise: "06:42 AM"
};

const mockForecastData = [
  { id: '1', day: 'Today', condition: 'Partly Cloudy', high: 22, low: 15, weatherType: 'cloudy' as WeatherCondition, precipitation: 20 },
  { id: '2', day: 'Tomorrow', condition: 'Sunny', high: 25, low: 17, weatherType: 'clear' as WeatherCondition },
  { id: '3', day: 'Wednesday', condition: 'Light Rain', high: 19, low: 12, weatherType: 'rainy' as WeatherCondition, precipitation: 80 },
  { id: '4', day: 'Thursday', condition: 'Partly Cloudy', high: 21, low: 14, weatherType: 'cloudy' as WeatherCondition, precipitation: 30 },
  { id: '5', day: 'Friday', condition: 'Sunny', high: 26, low: 18, weatherType: 'clear' as WeatherCondition },
  { id: '6', day: 'Saturday', condition: 'Thunderstorm', high: 20, low: 13, weatherType: 'thunderstorm' as WeatherCondition, precipitation: 90 },
  { id: '7', day: 'Sunday', condition: 'Light Snow', high: 2, low: -2, weatherType: 'snowy' as WeatherCondition, precipitation: 70 }
];

const mockInsightsData = {
  clothing: "Light jacket recommended. The temperature is comfortable but there's a slight breeze.",
  activity: "Great day for outdoor activities! Perfect temperature for hiking or cycling.",
  health: "UV index is moderate - sunscreen recommended for extended outdoor time.",
  recommendation: "Carry a light umbrella as there's a 20% chance of afternoon showers."
};

const Index = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentWeatherIndex, setCurrentWeatherIndex] = useState(0);
  const [weatherData, setWeatherData] = useState(createMockWeatherData('clear'));

  // Ensure theme is loaded
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update weather data when condition changes
  useEffect(() => {
    const condition = weatherConditions[currentWeatherIndex].condition;
    setWeatherData(createMockWeatherData(condition));
  }, [currentWeatherIndex]);

  const handleSearch = (query: string) => {
    toast.success(`Searching for weather in ${query}...`, {
      description: "In a real app, this would fetch weather data from an API"
    });
  };

  const handleLocationClick = () => {
    toast.info("Getting your location...", {
      description: "In a real app, this would use the Geolocation API"
    });
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const cycleWeather = () => {
    const nextIndex = (currentWeatherIndex + 1) % weatherConditions.length;
    setCurrentWeatherIndex(nextIndex);
    toast.success(`Weather changed to ${weatherConditions[nextIndex].label}`, {
      description: "Watch the beautiful animated background change!"
    });
  };

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Weather Background */}
      <WeatherBackground 
        condition={weatherConditions[currentWeatherIndex].condition}
        className="z-0"
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
        <WeatherHeader
          onSearch={handleSearch}
          onLocationClick={handleLocationClick}
          isDark={theme === 'dark'}
          onThemeToggle={handleThemeToggle}
        />

        {/* Weather Demo Button */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={cycleWeather}
            className="btn-hero animate-fade-in"
          >
            🌤️ Try Different Weather: {weatherConditions[currentWeatherIndex].label}
          </Button>
        </div>

        <main className="space-y-8">
          {/* Hero Weather Card */}
          <WeatherCard weather={weatherData} />
          
          {/* Weather Statistics */}
          <WeatherStats stats={mockStatsData} />
          
          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* AI Insights */}
            <AIInsights 
              insights={mockInsightsData}
              temperature={weatherData.temperature}
              condition={weatherData.condition}
            />
            
            {/* 7-Day Forecast */}
            <ForecastCard forecast={mockForecastData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
