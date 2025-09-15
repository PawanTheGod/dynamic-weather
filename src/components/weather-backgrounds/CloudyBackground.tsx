export const CloudyBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main Cloudy Gradient */}
      <div 
        className="absolute inset-0 dark:hidden"
        style={{
          background: 'linear-gradient(135deg, #708090 0%, #B0C4DE 50%, #DCDCDC 100%)'
        }}
      />
      
      {/* Dark Mode Cloudy Gradient */}
      <div 
        className="absolute inset-0 hidden dark:block"
        style={{
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #5d6d7e 100%)'
        }}
      />
      
      {/* Moving Cloud Layers */}
      <div className="absolute inset-0">
        {/* Background Clouds */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`bg-${i}`}
            className="absolute bg-white/10 dark:bg-white/5 rounded-full animate-cloud-layer"
            style={{
              width: `${120 + Math.random() * 100}px`,
              height: `${60 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${12 + Math.random() * 8}s`
            }}
          />
        ))}
        
        {/* Foreground Clouds */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`fg-${i}`}
            className="absolute bg-white/20 dark:bg-white/8 rounded-full animate-cloud-drift"
            style={{
              width: `${150 + Math.random() * 80}px`,
              height: `${70 + Math.random() * 30}px`,
              top: `${20 + Math.random() * 40}%`,
              animationDelay: `${i * 5}s`,
              animationDuration: `${20 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      {/* Cloud Shadows */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-500/5 to-transparent opacity-50"></div>
      
      {/* Subtle Mist Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent animate-pulse"></div>
    </div>
  );
};