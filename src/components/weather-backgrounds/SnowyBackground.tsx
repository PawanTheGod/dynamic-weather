import { useEffect, useState } from "react";

export const SnowyBackground = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ 
    id: number; 
    delay: number; 
    duration: number; 
    left: number; 
    size: number; 
  }>>([]);

  useEffect(() => {
    // Generate snowflakes
    const flakes = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      left: Math.random() * 100,
      size: 4 + Math.random() * 8
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main Snowy Gradient */}
      <div 
        className="absolute inset-0 dark:hidden"
        style={{
          background: 'linear-gradient(135deg, #E6F3FF 0%, #F0F8FF 50%, #FFFFFF 100%)'
        }}
      />
      
      {/* Dark Mode Snowy Gradient */}
      <div 
        className="absolute inset-0 hidden dark:block"
        style={{
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #4a6fa5 100%)'
        }}
      />
      
      {/* Cold Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-100/20 dark:from-blue-900/30 via-transparent to-blue-50/30 dark:to-blue-800/20"></div>
      
      {/* Snowflakes */}
      <div className="absolute inset-0">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute bg-white rounded-full opacity-80 animate-snow-fall"
            style={{
              left: `${flake.left}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${flake.duration}s`,
              boxShadow: `0 0 ${flake.size}px rgba(255, 255, 255, 0.8)`
            }}
          />
        ))}
      </div>
      
      {/* Larger Snowflakes */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-60 animate-snow-fall select-none"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${16 + Math.random() * 12}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 8}s`
            }}
          >
            ❄
          </div>
        ))}
      </div>
      
      {/* Snow Accumulation */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/40 to-transparent"></div>
      
      {/* Frost Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-blue-50/10 to-white/20 animate-pulse" style={{ animationDuration: '4s' }}></div>
    </div>
  );
};