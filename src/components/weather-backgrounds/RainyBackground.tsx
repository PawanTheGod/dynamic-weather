import { useEffect, useState } from "react";

export const RainyBackground = () => {
  const [rainDrops, setRainDrops] = useState<Array<{ id: number; delay: number; duration: number; left: number }>>([]);

  useEffect(() => {
    // Generate rain drops
    const drops = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 1,
      left: Math.random() * 100
    }));
    setRainDrops(drops);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main Rainy Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #5D6D7E 100%)'
        }}
      />
      
      {/* Dark Cloud Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/30 via-transparent to-transparent"></div>
      
      {/* Rain Drops */}
      <div className="absolute inset-0">
        {rainDrops.map((drop) => (
          <div
            key={drop.id}
            className="absolute w-0.5 bg-gradient-to-b from-blue-200/60 to-blue-400/80 animate-rain-drop"
            style={{
              left: `${drop.left}%`,
              height: `${15 + Math.random() * 20}px`,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`
            }}
          />
        ))}
      </div>
      
      {/* Rain Splash Effects */}
      <div className="absolute bottom-0 left-0 right-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-300/40 rounded-full animate-rain-splash"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 10}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: '0.6s'
            }}
          />
        ))}
      </div>
      
      {/* Lightning Flash Overlay */}
      <div className="absolute inset-0 animate-lightning-glow"></div>
      
      {/* Mist and Fog */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-500/5 to-gray-600/10 animate-pulse"></div>
    </div>
  );
};