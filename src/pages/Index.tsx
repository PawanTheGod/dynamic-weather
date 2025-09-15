import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon } from "lucide-react";
import { WeatherHeader } from "@/components/WeatherHeader";
import { WeatherCard } from "@/components/WeatherCard";
import { WeatherStats } from "@/components/WeatherStats";
import { ForecastCard } from "@/components/ForecastCard";
import { AIInsights } from "@/components/AIInsights";
import { Footer } from "@/components/Footer";
import { WeatherBackground, WeatherCondition } from "@/components/weather-backgrounds/WeatherBackground";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  getCurrentLocation, 
  getLocationWithFallback,
  getCurrentWeather, 
  getWeatherStats, 
  getWeatherForecast, 
  getWeatherByCity,
  WeatherData,
  WeatherStats as WeatherStatsType,
  ForecastItem
} from "@/services/weatherService";

// Default fallback data
const defaultWeatherData: WeatherData = {
  location: "Loading...",
  temperature: 0,
  condition: "Loading weather data...",
  feelsLike: 0,
  date: new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }),
  weatherType: 'clear' as WeatherCondition
};

const defaultStatsData: WeatherStatsType = {
  visibility: "-- km",
  humidity: 0,
  windSpeed: 0,
  pressure: 0,
  uvIndex: 0,
  sunrise: "--:-- AM"
};

const defaultForecastData: ForecastItem[] = [];

const defaultInsightsData = {
  clothing: "Loading clothing recommendations...",
  activity: "Loading activity suggestions...",
  health: "Loading health advice...",
  recommendation: "Loading weather insights..."
};

const Index = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData>(defaultWeatherData);
  const [statsData, setStatsData] = useState<WeatherStatsType>(defaultStatsData);
  const [forecastData, setForecastData] = useState<ForecastItem[]>(defaultForecastData);
  const [insightsData, setInsightsData] = useState(defaultInsightsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user's location weather on mount
  useEffect(() => {
    setMounted(true);
    loadCurrentLocationWeather();
  }, []);

  // Load weather data for current location
  const loadCurrentLocationWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      toast.info("Detecting your location...", {
        description: "Trying GPS first, then IP-based detection"
      });
      
      const locationResult = await getLocationWithFallback();
      
      // Show which method was used
      const methodMessage = locationResult.method === 'GPS' 
        ? "Using precise GPS location" 
        : `Using approximate location from IP${locationResult.city ? ` (${locationResult.city})` : ''}`;
      
      toast.info("Location detected!", {
        description: methodMessage
      });
      
      const [weather, stats, forecast] = await Promise.all([
        getCurrentWeather(locationResult.lat, locationResult.lon),
        getWeatherStats(locationResult.lat, locationResult.lon),
        getWeatherForecast(locationResult.lat, locationResult.lon)
      ]);
      
      setWeatherData(weather);
      setStatsData(stats);
      setForecastData(forecast);
      
      // Generate AI insights based on weather
      generateInsights(weather, stats);
      
      toast.success(`Weather loaded for ${weather.location}`, {
        description: `Current temperature: ${weather.temperature}°C (${locationResult.method} location)`
      });
      
    } catch (error) {
      console.error('Error loading weather:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load weather data';
      setError(errorMessage);
      
      // Show specific error message based on the type of error
      if (errorMessage.includes('HTTPS') || errorMessage.includes('localhost')) {
        toast.error("Location Access Issue", {
          description: "For location access via network IP, please use localhost:8080 or search for your city manually.",
          duration: 8000
        });
      } else {
        toast.error("Location Detection Failed", {
          description: errorMessage + " You can search for your city using the search bar.",
          duration: 6000
        });
      }
      
      // Fallback to a popular default city
      toast.info("Loading default location...", {
        description: "Showing weather for San Francisco as default"
      });
      loadWeatherByCity("San Francisco");
    } finally {
      setLoading(false);
    }
  };

  // Load weather data for a specific city
  const loadWeatherByCity = async (cityName: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getWeatherByCity(cityName);
      
      setWeatherData(data.weather);
      setStatsData(data.stats);
      setForecastData(data.forecast);
      
      generateInsights(data.weather, data.stats);
      
    } catch (error) {
      console.error('Error loading city weather:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load weather data';
      setError(errorMessage);
      toast.error("Search Error", {
        description: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  // Generate AI insights based on weather data
  const generateInsights = (weather: WeatherData, stats: WeatherStatsType) => {
    const temp = weather.temperature;
    const condition = weather.condition.toLowerCase();
    const humidity = stats.humidity;
    const windSpeed = stats.windSpeed;
    
    let clothing = "";
    let activity = "";
    let health = "";
    let recommendation = "";
    
    // Clothing recommendations
    if (temp > 25) {
      clothing = "Light, breathable clothing recommended. Cotton fabrics work best in this heat.";
    } else if (temp > 15) {
      clothing = "Comfortable weather! Light layers work well - maybe a light jacket for the evening.";
    } else if (temp > 5) {
      clothing = "Bundle up! Warm jacket, long pants, and closed shoes recommended.";
    } else {
      clothing = "Very cold! Heavy coat, warm layers, gloves, and a hat are essential.";
    }
    
    // Activity recommendations
    if (condition.includes('rain') || condition.includes('storm')) {
      activity = "Indoor activities recommended. Great day for museums, shopping, or cozy cafes.";
    } else if (condition.includes('snow')) {
      activity = "Perfect for winter sports! Skiing, snowboarding, or building snowmen.";
    } else if (temp > 20 && temp < 28) {
      activity = "Ideal weather for outdoor activities! Perfect for hiking, cycling, or picnics.";
    } else if (temp > 15) {
      activity = "Good day for light outdoor activities. Walking, jogging, or outdoor dining.";
    } else {
      activity = "Bundle up for outdoor activities, or enjoy indoor entertainment.";
    }
    
    // Health recommendations
    if (temp > 30) {
      health = "Stay hydrated! Drink plenty of water and limit sun exposure during peak hours.";
    } else if (condition.includes('sun') || condition.includes('clear')) {
      health = "Don't forget sunscreen! UV levels may be elevated on clear days.";
    } else if (humidity > 80) {
      health = "High humidity - stay cool and hydrated. Take breaks if exercising outdoors.";
    } else if (windSpeed > 20) {
      health = "Windy conditions - protect your eyes and secure loose items.";
    } else {
      health = "Pleasant conditions for being outdoors. Enjoy the fresh air!";
    }
    
    // General recommendations
    if (condition.includes('rain')) {
      recommendation = "Carry an umbrella and wear waterproof shoes. Check for weather updates.";
    } else if (condition.includes('snow')) {
      recommendation = "Drive carefully if traveling. Allow extra time for your commute.";
    } else if (windSpeed > 25) {
      recommendation = "Secure outdoor items and be cautious of falling branches.";
    } else {
      recommendation = "Great day to enjoy the outdoors! Make the most of this lovely weather.";
    }
    
    setInsightsData({
      clothing,
      activity,
      health,
      recommendation
    });
  };

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      toast.info(`Searching for weather in ${query}...`, {
        description: "Fetching weather data from OpenWeather API"
      });
      await loadWeatherByCity(query.trim());
    }
  };

  const handleLocationClick = async () => {
    await loadCurrentLocationWeather();
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    toast.success(`Switched to ${newTheme} mode`, {
      description: `Enjoy the enhanced ${newTheme} theme experience!`,
      duration: 2000
    });
  };

  const handleRefresh = async () => {
    toast.info("Refreshing weather data...", {
      description: "Getting the latest weather information"
    });
    
    if (weatherData.coordinates) {
      try {
        setLoading(true);
        const [weather, stats, forecast] = await Promise.all([
          getCurrentWeather(weatherData.coordinates.lat, weatherData.coordinates.lon),
          getWeatherStats(weatherData.coordinates.lat, weatherData.coordinates.lon),
          getWeatherForecast(weatherData.coordinates.lat, weatherData.coordinates.lon)
        ]);
        
        setWeatherData(weather);
        setStatsData(stats);
        setForecastData(forecast);
        generateInsights(weather, stats);
        
        toast.success("Weather data refreshed!", {
          description: `Updated data for ${weather.location}`
        });
      } catch (error) {
        toast.error("Refresh failed", {
          description: "Could not update weather data"
        });
      } finally {
        setLoading(false);
      }
    } else {
      await loadCurrentLocationWeather();
    }
  };

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="min-h-screen relative overflow-hidden transition-all duration-500 ease-in-out">
      {/* Dynamic Weather Background */}
      <WeatherBackground 
        condition={weatherData.weatherType}
        className="z-0"
      />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
        {/* Dark Mode Indicator */}
        {theme === 'dark' && mounted && (
          <div className="fixed top-4 left-4 z-50 glass rounded-full p-2 animate-fade-in">
            <Moon className="w-4 h-4 text-white/70" />
          </div>
        )}
        
        {/* Developer Watermark */}
        {mounted && (
          <div className="fixed top-4 right-6 z-50 glass rounded-full px-3 py-1 animate-fade-in">
            <p className="text-white/70 text-xs font-medium">
              by <span className="text-white font-semibold">Pawan Ghule</span> & <span className="text-white font-semibold">Aditya Bachute</span>
            </p>
          </div>
        )}
        <WeatherHeader
          onSearch={handleSearch}
          onLocationClick={handleLocationClick}
          isDark={theme === 'dark'}
          onThemeToggle={handleThemeToggle}
        />

        {/* Refresh Button */}
        {!loading && weatherData.location !== "Loading..." && (
          <div className="flex justify-center mb-6 gap-4">
            <Button
              onClick={handleRefresh}
              className="btn-hero animate-fade-in"
              disabled={loading}
            >
              🔄 Refresh Weather Data
            </Button>
            <Button
              onClick={handleLocationClick}
              className="btn-primary animate-fade-in"
              disabled={loading}
            >
              📍 Detect Location
            </Button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center mb-6">
            <div className="glass-strong rounded-3xl p-6 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-white/30 dark:border-white/50 border-t-white dark:border-t-white rounded-full mx-auto mb-4"></div>
              <p className="text-white dark:text-white">Loading weather data...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex justify-center mb-6">
            <div className="glass-strong rounded-3xl p-6 text-center max-w-md">
              <p className="text-red-300 dark:text-red-400 mb-4">⚠️ {error}</p>
              <div className="space-y-2">
                <Button onClick={handleRefresh} className="btn-primary w-full">
                  Try Again
                </Button>
                <p className="text-white/70 dark:text-white/80 text-sm">
                  💡 Tip: For best results, use <code className="bg-white/10 dark:bg-white/20 px-1 rounded">localhost:8080</code> instead of the network IP address
                </p>
              </div>
            </div>
          </div>
        )}

        <main className="space-y-8">
          {/* Hero Weather Card */}
          {!loading && <WeatherCard weather={weatherData} />}
          
          {/* Weather Statistics */}
          {!loading && <WeatherStats stats={statsData} />}
          
          {/* Content Grid */}
          {!loading && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* AI Insights */}
              <AIInsights 
                insights={insightsData}
                temperature={weatherData.temperature}
                condition={weatherData.condition}
              />
              
              {/* 7-Day Forecast */}
              <ForecastCard forecast={forecastData} />
            </div>
          )}
        </main>
        
        {/* Footer */}
        <Footer isDark={theme === 'dark'} />
      </div>
    </div>
  );
};

export default Index;
