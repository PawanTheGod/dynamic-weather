import { Brain, Shirt, Activity, Heart, Umbrella, Glasses } from "lucide-react";

interface InsightData {
  clothing: string;
  activity: string;
  health: string;
  recommendation: string;
}

interface AIInsightsProps {
  insights: InsightData;
  temperature: number;
  condition: string;
}

const InsightCard = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient 
}: { 
  icon: any; 
  title: string; 
  description: string;
  gradient: string;
}) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
    <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-medium text-white mb-1">{title}</h4>
      <p className="text-white/70 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

export const AIInsights = ({ insights, temperature, condition }: AIInsightsProps) => {
  const getActivityRecommendation = () => {
    if (temperature > 25) return "Perfect for outdoor activities like hiking or cycling!";
    if (temperature > 15) return "Great weather for a walk in the park or light exercise.";
    if (temperature > 5) return "Consider indoor activities or bundle up for outdoor ones.";
    return "Stay cozy indoors with warm drinks and good books.";
  };

  const getHealthAdvice = () => {
    if (condition.includes('sun')) return "Don't forget sunscreen and stay hydrated!";
    if (condition.includes('rain')) return "Stay dry and watch out for slippery surfaces.";
    if (condition.includes('cold')) return "Keep warm and protect exposed skin.";
    return "Perfect weather to enjoy being outside safely.";
  };

  return (
    <div className="glass-strong rounded-3xl p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-white">AI Weather Insights</h2>
      </div>
      
      <div className="space-y-4">
        <InsightCard
          icon={Shirt}
          title="Clothing Recommendation"
          description={insights.clothing}
          gradient="from-blue-400 to-purple-500"
        />
        
        <InsightCard
          icon={Activity}
          title="Activity Suggestion"
          description={getActivityRecommendation()}
          gradient="from-green-400 to-emerald-500"
        />
        
        <InsightCard
          icon={Heart}
          title="Health Tip"
          description={getHealthAdvice()}
          gradient="from-red-400 to-pink-500"
        />
        
        <InsightCard
          icon={condition.includes('rain') ? Umbrella : Glasses}
          title="Pro Tip"
          description={insights.recommendation}
          gradient="from-yellow-400 to-orange-500"
        />
      </div>
    </div>
  );
};