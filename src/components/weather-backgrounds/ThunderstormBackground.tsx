import { useEffect, useState } from "react";

export const ThunderstormBackground = () => {
  const [lightningFlashes, setLightningFlashes] = useState<Array<{ 
    id: number; 
    delay: number; 
    top: number; 
    left: number; 
  }>>([]);

  useEffect(() => {
    // Generate lightning strikes
    const strikes = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      delay: Math.random() * 4,
      top: Math.random() * 60,
      left: Math.random() * 100
    }));
    setLightningFlashes(strikes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main Storm Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
        }}
      />
      
      {/* Dark Storm Clouds */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-800/30 to-transparent"></div>
      
      {/* Lightning Bolts */}
      <div className="absolute inset-0">
        {lightningFlashes.map((flash) => (
          <div
            key={flash.id}
            className="absolute w-1 bg-gradient-to-b from-white via-blue-200 to-transparent animate-lightning"
            style={{
              left: `${flash.left}%`,
              top: `${flash.top}%`,
              height: `${40 + Math.random() * 60}%`,
              animationDelay: `${flash.delay}s`,
              filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))',
              transform: `rotate(${-10 + Math.random() * 20}deg)`
            }}
          />
        ))}
      </div>
      
      {/* Lightning Glow Effect */}
      <div className="absolute inset-0 animate-lightning-glow"></div>
      
      {/* Storm Rain */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 bg-gradient-to-b from-gray-300/40 to-gray-500/60 animate-rain-drop"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${20 + Math.random() * 30}px`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 0.5}s`
            }}
          />
        ))}
      </div>
      
      {/* Thunder Clouds Movement */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gray-800/20 rounded-full animate-cloud-layer"
            style={{
              width: `${200 + Math.random() * 150}px`,
              height: `${80 + Math.random() * 60}px`,
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 40}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${10 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Atmospheric Pressure Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-purple-900/10 to-gray-900/20 animate-pulse" style={{ animationDuration: '3s' }}></div>
    </div>
  );
};