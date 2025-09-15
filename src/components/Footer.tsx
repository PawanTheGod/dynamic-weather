import { Github, Linkedin, Instagram, MessageCircle, Heart, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FooterProps {
  isDark: boolean;
}

export const Footer = ({ isDark }: FooterProps) => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/pawanghule19",
      color: "hover:text-blue-400",
      bgColor: "hover:bg-blue-400/10",
      description: "Professional Network"
    },
    {
      name: "Instagram", 
      icon: Instagram,
      url: "https://instagram.com/pawaaaaaaaan",
      color: "hover:text-pink-400",
      bgColor: "hover:bg-pink-400/10",
      description: "Life & Moments"
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/+918788947952", // Replace with your actual WhatsApp number
      color: "hover:text-green-400", 
      bgColor: "hover:bg-green-400/10",
      description: "Quick Chat"
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/PawanTheGod",
      color: "hover:text-gray-300",
      bgColor: "hover:bg-gray-400/10",
      description: "Code Portfolio"
    }
  ];

  return (
    <footer className="relative mt-16 py-8">
      {/* Gradient Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px, 20px 20px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="glass-strong rounded-3xl p-8">
          {/* Main Footer Content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Developer Attribution */}
            <div className="flex items-center gap-4 group cursor-pointer transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2 text-white">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold">
                    Crafted with <Heart className="w-4 h-4 text-red-400 inline mx-1 animate-pulse" /> by
                  </p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    Pawan Ghule
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <p className="text-white/70 text-sm hidden sm:block mr-4">
                Connect with me:
              </p>
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  className={`glass w-12 h-12 text-white/70 transition-all duration-300 ${link.color} ${link.bgColor} hover:scale-110 active:scale-95 group`}
                  onClick={() => {
                    window.open(link.url, '_blank');
                    // Add subtle click animation
                    const button = document.activeElement as HTMLElement;
                    button?.classList.add('animate-social-bounce');
                    setTimeout(() => {
                      button?.classList.remove('animate-social-bounce');
                    }, 600);
                  }}
                  title={`${link.description} - Connect on ${link.name}`}
                >
                  <link.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <span>© 2024 WeatherPro</span>
                <span className="hidden sm:inline">•</span>
                <span>Built with React & TypeScript</span>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Live Weather Data
                </span>
                <span className="hidden sm:inline">•</span>
                <span>Version 1.0.0</span>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-sm animate-float"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-sm animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Bottom Signature */}
        <div className="mt-4 text-center">
          <p className="text-white/40 text-xs flex items-center justify-center gap-2">
            <Code className="w-3 h-3" />
            "Bringing beautiful weather experiences to life"
            <span className="mx-2">-</span>
            <span className="font-semibold text-white/60">Pawan Ghule</span>
          </p>
        </div>
      </div>
    </footer>
  );
};