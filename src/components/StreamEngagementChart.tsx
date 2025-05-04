
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

const generateEngagementData = (hours = 4) => {
  const data = [];
  let viewers = 800;
  let engagement = 60;
  
  for (let i = 0; i < hours * 12; i++) { // Data points every 5 minutes
    // Generate some random fluctuations
    viewers = Math.max(100, viewers + (Math.random() - 0.5) * 100);
    engagement = Math.max(10, Math.min(100, engagement + (Math.random() - 0.5) * 10));
    
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - (hours * 60) + (i * 5));
    
    data.push({
      time: timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      viewers: Math.round(viewers),
      engagement: Math.round(engagement),
      chatActivity: Math.round(viewers * engagement / 100 * (Math.random() * 0.5 + 0.5)),
      tokenActivity: Math.round(viewers * 0.05 * engagement / 100 * (Math.random() * 0.7 + 0.3)),
    });
  }
  
  return data;
};

interface StreamEngagementChartProps {
  streamId: string;
}

export function StreamEngagementChart({ streamId }: StreamEngagementChartProps) {
  const [timeframe, setTimeframe] = useState<"1h" | "4h" | "all">("4h");
  const [chartData, setChartData] = useState(() => generateEngagementData(4));
  const [dataType, setDataType] = useState<"viewers" | "engagement" | "chat" | "tokens">("viewers");
  
  const handleTimeframeChange = (newTimeframe: "1h" | "4h" | "all") => {
    setTimeframe(newTimeframe);
    
    if (newTimeframe === "1h") {
      setChartData(generateEngagementData(1));
    } else if (newTimeframe === "4h") {
      setChartData(generateEngagementData(4));
    } else {
      setChartData(generateEngagementData(8));
    }
  };
  
  const getDataKey = () => {
    switch (dataType) {
      case "engagement": return "engagement";
      case "chat": return "chatActivity";
      case "tokens": return "tokenActivity";
      default: return "viewers";
    }
  };
  
  const getChartColor = () => {
    switch (dataType) {
      case "engagement": return "#9b87f5";
      case "chat": return "#33C3F0";
      case "tokens": return "#F97316";
      default: return "#7E69AB";
    }
  };
  
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-medium text-sm">Stream Performance</h3>
        <div className="flex space-x-2">
          <Button
            variant={timeframe === "1h" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeframeChange("1h")}
            className={timeframe === "1h" ? "bg-dexplay-purple" : "border-white/10 bg-black/40"}
          >
            1H
          </Button>
          <Button
            variant={timeframe === "4h" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeframeChange("4h")}
            className={timeframe === "4h" ? "bg-dexplay-purple" : "border-white/10 bg-black/40"}
          >
            4H
          </Button>
          <Button
            variant={timeframe === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTimeframeChange("all")}
            className={timeframe === "all" ? "bg-dexplay-purple" : "border-white/10 bg-black/40"}
          >
            All
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-4">
        <Button
          variant={dataType === "viewers" ? "default" : "outline"}
          size="sm"
          onClick={() => setDataType("viewers")}
          className={dataType === "viewers" ? "bg-dexplay-purple" : "border-white/10 bg-black/40"}
        >
          Viewers
        </Button>
        <Button
          variant={dataType === "engagement" ? "default" : "outline"}
          size="sm"
          onClick={() => setDataType("engagement")}
          className={dataType === "engagement" ? "bg-dexplay-purple" : "border-white/10 bg-black/40"}
        >
          Engagement
        </Button>
        <Button
          variant={dataType === "chat" ? "default" : "outline"}
          size="sm"
          onClick={() => setDataType("chat")}
          className={dataType === "chat" ? "bg-dexplay-purple" : "border-white/10 bg-black/40"}
        >
          Chat
        </Button>
        <Button
          variant={dataType === "tokens" ? "default" : "outline"}
          size="sm"
          onClick={() => setDataType("tokens")}
          className={dataType === "tokens" ? "bg-dexplay-purple" : "border-white/10 bg-black/40"}
        >
          Tokens
        </Button>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={getChartColor()} stopOpacity={0.8} />
                <stop offset="95%" stopColor={getChartColor()} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3c" />
            <XAxis 
              dataKey="time" 
              tick={{ fill: '#8E9196', fontSize: 10 }} 
              tickLine={{ stroke: '#8E9196' }}
              axisLine={{ stroke: '#2a2a3c' }}
            />
            <YAxis 
              tick={{ fill: '#8E9196', fontSize: 10 }} 
              tickLine={{ stroke: '#8E9196' }}
              axisLine={{ stroke: '#2a2a3c' }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #2a2a3c', fontSize: 12 }} 
              labelStyle={{ color: '#fff' }}
            />
            <Area 
              type="monotone" 
              dataKey={getDataKey()} 
              stroke={getChartColor()} 
              fillOpacity={1}
              fill="url(#colorGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
