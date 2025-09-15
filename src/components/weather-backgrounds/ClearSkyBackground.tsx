export const ClearSkyBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main Clear Sky Gradient */}
      <div 
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: 'linear-gradient(135deg, #87CEEB 0%, #FFD700 50%, #FFA500 100%)',
          backgroundSize: '200% 200%'
        }}
      />
      
      {/* Floating Light Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-200/20 rounded-full blur-2xl animate-float"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-orange-200/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-200/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      
      {/* Subtle Sun Rays */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/3 left-1/2 w-1 bg-gradient-to-b from-yellow-300/30 to-transparent origin-bottom animate-pulse"
          style={{
            height: '200px',
            transform: `translateX(-50%) rotate(${i * 45}deg)`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: '4s'
          }}
        />
      ))}
      
      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${6 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};