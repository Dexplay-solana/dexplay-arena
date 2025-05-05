
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
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
  
  // Chart configuration
  const chartConfig = {
    price: {
      theme: {
        light: "#9b87f5",
        dark: "#9b87f5",
      },
    },
  };
  
  return (
    <Card className="bg-transparent border-0">
      <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 mb-2 sm:mb-4">
        {/* Timeframe buttons - scrollable on mobile */}
        <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:space-x-2 gap-2 no-scrollbar">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? "default" : "outline"} 
              size={isMobile ? "xs" : "sm"}
              onClick={() => updateTimeframe(tf)}
              className={`min-w-[40px] whitespace-nowrap ${timeframe === tf 
                ? "bg-dexplay-purple hover:bg-dexplay-brightPurple" 
                : "border-white/10 bg-black/40"}`}
            >
              {tf}
            </Button>
          ))}
        </div>
        
        {/* Indicators button */}
        <div className="ml-auto">
          <Button 
            variant="outline" 
            size={isMobile ? "xs" : "sm"} 
            className="border-white/10 bg-black/40"
          >
            Indicators
          </Button>
        </div>
      </div>
      
      {/* Responsive chart container */}
      <div className={`${isMobile ? 'h-[250px]' : 'h-[400px]'} w-full`}>
        <ChartContainer config={chartConfig} className="w-full h-full">
          <AreaChart
            data={chartData}
            margin={isMobile ? 
              { top: 5, right: 5, left: 0, bottom: 5 } : 
              { top: 5, right: 20, left: 20, bottom: 5 }
            }
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
              tickFormatter={isMobile ? 
                (value) => value.split('-')[2] : // Just show day on mobile
                (value) => value}
              fontSize={isMobile ? 10 : 12}
            />
            <YAxis 
              domain={['auto', 'auto']} 
              tick={{ fill: '#8E9196' }} 
              tickLine={{ stroke: '#8E9196' }}
              axisLine={{ stroke: '#2a2a3c' }}
              tickFormatter={(value) => `$${value}`}
              width={isMobile ? 35 : 50}
              fontSize={isMobile ? 10 : 12}
            />
            <ChartTooltip 
              content={
                <ChartTooltipContent 
                  formatter={(value) => [`$${value}`, tokenSymbol]} 
                />
              }
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#9b87f5" 
              fillOpacity={1}
              fill="url(#colorPrice)" 
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ChartContainer>
      </div>
      
      {/* Price statistics - only visible on larger screens */}
      {!isMobile && (
        <div className="grid grid-cols-4 gap-4 mt-4 text-center">
          <div className="bg-black/20 rounded p-2">
            <div className="text-xs text-gray-400">24h High</div>
            <div className="text-sm font-medium">$5.67</div>
          </div>
          <div className="bg-black/20 rounded p-2">
            <div className="text-xs text-gray-400">24h Low</div>
            <div className="text-sm font-medium">$5.12</div>
          </div>
          <div className="bg-black/20 rounded p-2">
            <div className="text-xs text-gray-400">24h Vol</div>
            <div className="text-sm font-medium">1.2M</div>
          </div>
          <div className="bg-black/20 rounded p-2">
            <div className="text-xs text-gray-400">Market Cap</div>
            <div className="text-sm font-medium">$45.6M</div>
          </div>
        </div>
      )}
    </Card>
  );
}
