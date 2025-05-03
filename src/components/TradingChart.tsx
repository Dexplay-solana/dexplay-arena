
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

// Mock data for the chart
const generateChartData = (days = 30, startPrice = 5.32, volatility = 0.05) => {
  const data = [];
  let currentPrice = startPrice;
  
  for (let i = 0; i < days; i++) {
    // Random price movement
    const change = (Math.random() - 0.5) * volatility * currentPrice;
    currentPrice = Math.max(0.01, currentPrice + change);
    
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      price: parseFloat(currentPrice.toFixed(4)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });
  }
  
  return data;
};

interface TradingChartProps {
  tokenSymbol: string;
}

export function TradingChart({ tokenSymbol }: TradingChartProps) {
  const [timeframe, setTimeframe] = useState("1D");
  const [chartData, setChartData] = useState(() => generateChartData());
  
  const timeframes = ["15m", "1H", "4H", "1D", "1W", "1M"];
  
  // Function to update chart data based on timeframe
  const updateTimeframe = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    
    // Generate different data based on timeframe
    let days;
    let volatility;
    
    switch (newTimeframe) {
      case "15m":
        days = 1;
        volatility = 0.01;
        break;
      case "1H":
        days = 2;
        volatility = 0.02;
        break;
      case "4H":
        days = 7;
        volatility = 0.03;
        break;
      case "1W":
        days = 60;
        volatility = 0.07;
        break;
      case "1M":
        days = 180;
        volatility = 0.1;
        break;
      case "1D":
      default:
        days = 30;
        volatility = 0.05;
        break;
    }
    
    setChartData(generateChartData(days, 5.32, volatility));
  };
  
  return (
    <Card className="bg-transparent border-0">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? "default" : "outline"} 
              size="sm"
              onClick={() => updateTimeframe(tf)}
              className={timeframe === tf ? "bg-dexplay-purple hover:bg-dexplay-brightPurple" : "border-white/10 bg-black/40"}
            >
              {tf}
            </Button>
          ))}
        </div>
        <div>
          <Button variant="outline" size="sm" className="border-white/10 bg-black/40">
            Indicators
          </Button>
        </div>
      </div>
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3c" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#8E9196' }} 
              tickLine={{ stroke: '#8E9196' }}
              axisLine={{ stroke: '#2a2a3c' }}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              tick={{ fill: '#8E9196' }} 
              tickLine={{ stroke: '#8E9196' }}
              axisLine={{ stroke: '#2a2a3c' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A1F2C', border: '1px solid #2a2a3c' }} 
              labelStyle={{ color: '#fff' }}
              formatter={(value) => [`$${value}`, tokenSymbol]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#9b87f5" 
              fillOpacity={1}
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
