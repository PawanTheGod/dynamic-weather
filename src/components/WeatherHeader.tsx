import { Search, MapPin, Bell, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface WeatherHeaderProps {
  onSearch: (query: string) => void;
  onLocationClick: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export const WeatherHeader = ({ onSearch, onLocationClick, isDark, onThemeToggle }: WeatherHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <header className="glass-hero rounded-3xl p-6 mb-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">WeatherPro</h1>
            <p className="text-white/70 text-sm">Beautiful weather, everywhere</p>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md w-full">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for any city (e.g., London, Tokyo, New York)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-2xl focus:bg-white/20 focus:border-white/40 transition-all"
            />
          </div>
        </form>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <Button
            onClick={onLocationClick}
            className="btn-primary flex items-center gap-2"
            title="Detect your location automatically"
          >
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">Auto-Detect</span>
          </Button>
          
          <Button
            onClick={onThemeToggle}
            variant="ghost"
            size="icon"
            className="glass w-11 h-11 text-white hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun className="w-5 h-5 animate-spin" style={{ animationDuration: '2s' }} />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="glass w-11 h-11 text-white hover:bg-white/20"
          >
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};