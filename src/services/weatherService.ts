import { WeatherCondition } from "@/components/weather-backgrounds/WeatherBackground";

const API_KEY = "29fe5040a3e0e2fa40ffad02000ebbf4";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  feelsLike: number;
  date: string;
  weatherType: WeatherCondition;
  country?: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
}

export interface WeatherStats {
  visibility: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
  sunrise: string;
  sunset?: string;
}

export interface ForecastItem {
  id: string;
  day: string;
  condition: string;
  high: number;
  low: number;
  weatherType: WeatherCondition;
  precipitation?: number;
}

interface OpenWeatherResponse {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    id: number;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
  coord: {
    lat: number;
    lon: number;
  };
}

interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp_max: number;
      temp_min: number;
    };
    weather: Array<{
      main: string;
      description: string;
      id: number;
    }>;
    pop: number;
  }>;
}

interface GeocodingResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

// Map OpenWeather conditions to our weather types
const mapWeatherCondition = (weatherId: number, main: string): WeatherCondition => {
  // Thunderstorm group (200-299)
  if (weatherId >= 200 && weatherId < 300) return 'thunderstorm';
  
  // Drizzle and Rain group (300-599)
  if (weatherId >= 300 && weatherId < 600) return 'rainy';
  
  // Snow group (600-699)
  if (weatherId >= 600 && weatherId < 700) return 'snowy';
  
  // Clear sky (800)
  if (weatherId === 800) return 'clear';
  
  // Clouds group (801-899)
  if (weatherId > 800) return 'cloudy';
  
  // Default fallback
  return 'clear';
};

// Get current location using browser's geolocation API
export const getCurrentLocation = (): Promise<{lat: number, lon: number}> => {
  return new Promise((resolve, reject) => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    // Check if we're in a secure context (HTTPS or localhost)
    const isSecureContext = window.isSecureContext || 
                           window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1';
    
    if (!isSecureContext) {
      reject(new Error('Geolocation requires HTTPS or localhost. Please use localhost:8080 instead of the network IP address, or try the IP-based location detection.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user. You can search for your city instead.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable. Try searching for your city.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again or search for your city.';
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

// Get approximate location using IP-based geolocation (fallback method)
export const getLocationByIP = async (): Promise<{lat: number, lon: number, city: string, country: string}> => {
  try {
    // Using ipapi.co for IP-based location (free tier available)
    const response = await fetch('https://ipapi.co/json/');
    
    if (!response.ok) {
      throw new Error('IP location service unavailable');
    }
    
    const data = await response.json();
    
    if (!data.latitude || !data.longitude) {
      throw new Error('Invalid location data from IP service');
    }
    
    return {
      lat: parseFloat(data.latitude),
      lon: parseFloat(data.longitude),
      city: data.city || 'Unknown',
      country: data.country_code || 'Unknown'
    };
  } catch (error) {
    console.error('Error getting IP location:', error);
    throw new Error('Failed to get location from IP address. Please search for your city manually.');
  }
};

// Enhanced location detection that tries multiple methods
export const getLocationWithFallback = async (): Promise<{lat: number, lon: number, method: string, city?: string}> => {
  // First try GPS geolocation
  try {
    const location = await getCurrentLocation();
    return {
      ...location,
      method: 'GPS'
    };
  } catch (gpsError) {
    console.log('GPS location failed:', gpsError);
    
    // Fallback to IP-based location
    try {
      const ipLocation = await getLocationByIP();
      return {
        lat: ipLocation.lat,
        lon: ipLocation.lon,
        method: 'IP',
        city: `${ipLocation.city}, ${ipLocation.country}`
      };
    } catch (ipError) {
      console.log('IP location failed:', ipError);
      throw new Error('Unable to detect location automatically. Please search for your city in the search bar.');
    }
  }
};
export const searchLocation = async (cityName: string): Promise<GeocodingResponse[]> => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(cityName)}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Location search failed: ${response.status}`);
    }
    
    const data: GeocodingResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching location:', error);
    throw new Error('Failed to search for location. Please check your internet connection.');
  }
};

// Get current weather by coordinates
export const getCurrentWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API failed: ${response.status}`);
    }
    
    const data: OpenWeatherResponse = await response.json();
    
    const weatherCondition = mapWeatherCondition(data.weather[0].id, data.weather[0].main);
    
    return {
      location: `${data.name}, ${data.sys.country}`,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].description,
      feelsLike: Math.round(data.main.feels_like),
      date: new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      weatherType: weatherCondition,
      country: data.sys.country,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon
      }
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw new Error('Failed to fetch weather data. Please check your internet connection.');
  }
};

// Get weather statistics by coordinates
export const getWeatherStats = async (lat: number, lon: number): Promise<WeatherStats> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API failed: ${response.status}`);
    }
    
    const data: OpenWeatherResponse = await response.json();
    
    return {
      visibility: `${Math.round(data.visibility / 1000)} km`,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      pressure: data.main.pressure,
      uvIndex: 3, // Default UV index (would need UV Index API for real data)
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  } catch (error) {
    console.error('Error fetching weather stats:', error);
    throw new Error('Failed to fetch weather statistics.');
  }
};

// Get 5-day weather forecast
export const getWeatherForecast = async (lat: number, lon: number): Promise<ForecastItem[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Forecast API failed: ${response.status}`);
    }
    
    const data: OpenWeatherForecastResponse = await response.json();
    
    // Group forecast data by day and get daily min/max
    const dailyForecasts = new Map<string, {
      date: Date;
      temps: number[];
      conditions: Array<{main: string, description: string, id: number}>;
      precipitation: number[];
    }>();
    
    data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();
      
      if (!dailyForecasts.has(dateKey)) {
        dailyForecasts.set(dateKey, {
          date,
          temps: [],
          conditions: [],
          precipitation: []
        });
      }
      
      const forecast = dailyForecasts.get(dateKey)!;
      forecast.temps.push(item.main.temp_max, item.main.temp_min);
      forecast.conditions.push(item.weather[0]);
      forecast.precipitation.push(item.pop * 100);
    });
    
    // Convert to forecast items (limit to 7 days)
    const forecastItems: ForecastItem[] = [];
    let dayIndex = 0;
    
    for (const [dateKey, forecast] of dailyForecasts) {
      if (dayIndex >= 7) break;
      
      const high = Math.round(Math.max(...forecast.temps));
      const low = Math.round(Math.min(...forecast.temps));
      const avgPrecipitation = Math.round(
        forecast.precipitation.reduce((sum, p) => sum + p, 0) / forecast.precipitation.length
      );
      
      // Use the most common condition for the day
      const mainCondition = forecast.conditions[0];
      const weatherCondition = mapWeatherCondition(mainCondition.id, mainCondition.main);
      
      const dayNames = ['Today', 'Tomorrow'];
      const dayName = dayIndex < 2 
        ? dayNames[dayIndex] 
        : forecast.date.toLocaleDateString('en-US', { weekday: 'long' });
      
      forecastItems.push({
        id: `forecast-${dayIndex}`,
        day: dayName,
        condition: mainCondition.description,
        high,
        low,
        weatherType: weatherCondition,
        precipitation: avgPrecipitation > 0 ? avgPrecipitation : undefined
      });
      
      dayIndex++;
    }
    
    return forecastItems;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw new Error('Failed to fetch weather forecast.');
  }
};

// Get weather by city name (convenience function)
export const getWeatherByCity = async (cityName: string): Promise<{
  weather: WeatherData;
  stats: WeatherStats;
  forecast: ForecastItem[];
}> => {
  try {
    // First, search for the location
    const locations = await searchLocation(cityName);
    
    if (locations.length === 0) {
      throw new Error(`No location found for "${cityName}"`);
    }
    
    const location = locations[0];
    
    // Get weather data using coordinates
    const [weather, stats, forecast] = await Promise.all([
      getCurrentWeather(location.lat, location.lon),
      getWeatherStats(location.lat, location.lon),
      getWeatherForecast(location.lat, location.lon)
    ]);
    
    return { weather, stats, forecast };
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    throw error;
  }
};