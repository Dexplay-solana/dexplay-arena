
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

// Mock data for positions
const generateMockPositions = (count = 3) => {
  const positions = [];
  const tokens = ["DIO/SOL", "AURY/SOL", "GMT/SOL", "DFL/SOL"];
  
  for (let i = 0; i < count; i++) {
    const isBullish = Math.random() > 0.5;
    const entryPrice = parseFloat((Math.random() * 10 + 0.1).toFixed(4));
    const currentPrice = isBullish 
      ? entryPrice * (1 + Math.random() * 0.3)
      : entryPrice * (1 - Math.random() * 0.3);
    const multiplier = Math.floor(Math.random() * 10) + 1;
    const size = parseFloat((Math.random() * 1000 + 100).toFixed(2));
    const yieldValue = isBullish 
      ? (currentPrice - entryPrice) / entryPrice * 100 * multiplier
      : (entryPrice - currentPrice) / entryPrice * 100 * multiplier;
    
    positions.push({
      id: `pos-${i}`,
      symbol: tokens[i % tokens.length],
      marketView: isBullish ? "bullish" : "bearish",
      multiplier: `${multiplier}x`,
      entryPrice,
      currentPrice: currentPrice,
      stakeSize: size,
      yieldReturn: parseFloat(yieldValue.toFixed(2)),
      riskLevel: isBullish
        ? entryPrice * (1 - 1/multiplier * 0.9)
        : entryPrice * (1 + 1/multiplier * 0.9),
    });
  }
  
  return positions;
};

interface Position {
  id: string;
  symbol: string;
  marketView: "bullish" | "bearish";
  multiplier: string;
  entryPrice: number;
  currentPrice: number;
  stakeSize: number;
  yieldReturn: number;
  riskLevel: number;
}

export function TradingPositions() {
  const [activeStakes, setActiveStakes] = useState<Position[]>(() => generateMockPositions(3));
  const [stakeHistory, setStakeHistory] = useState<Position[]>(() => generateMockPositions(5));
  
  const withdrawStake = (position: Position) => {
    // Remove position from active list
    setActiveStakes(prev => prev.filter(p => p.id !== position.id));
    
    // Show toast
    toast({
      title: `Tokens withdrawn from ${position.marketView === "bullish" ? "bullish" : "bearish"} stake`,
      description: `${position.symbol} ${position.stakeSize.toFixed(2)} with ${position.yieldReturn >= 0 ? "yield" : "loss"} of ${position.yieldReturn}%`,
    });
  };
  
  return (
    <Card className="bg-black/20 backdrop-blur-sm border border-white/10 p-6">
      <Tabs defaultValue="positions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/40">
          <TabsTrigger value="positions" className="data-[state=active]:bg-dexplay-purple">Active Stakes</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-dexplay-purple">Stake History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="positions" className="pt-4">
          <ScrollArea className="h-[360px]">
            {activeStakes.length > 0 ? (
              <div className="space-y-4">
                {activeStakes.map((position) => (
                  <div key={position.id} className="bg-black/40 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded text-xs mr-2 ${
                          position.marketView === "bullish" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                        }`}>
                          {position.marketView.toUpperCase()}
                        </span>
                        <span className="font-medium text-white">{position.symbol}</span>
                        <span className="ml-2 text-gray-400 text-sm">{position.multiplier}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-dexplay-purple text-dexplay-purple hover:bg-dexplay-purple/20"
                        onClick={() => withdrawStake(position)}
                      >
                        Withdraw
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <p className="text-xs text-gray-400">Entry Price</p>
                        <p className="text-sm text-white">${position.entryPrice.toFixed(4)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Current Price</p>
                        <p className="text-sm text-white">${position.currentPrice.toFixed(4)}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-400">Stake Size</p>
                        <p className="text-sm text-white">${position.stakeSize.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Yield</p>
                        <p className={`text-sm font-medium ${
                          position.yieldReturn >= 0 ? "text-green-400" : "text-red-400"
                        }`}>
                          {position.yieldReturn >= 0 ? "+" : ""}{position.yieldReturn}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <p className="text-gray-400">No active stakes</p>
                <p className="text-sm text-gray-500 mt-2">Stake tokens to start earning yield</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="history" className="pt-4">
          <ScrollArea className="h-[360px]">
            <div className="space-y-4">
              {stakeHistory.map((stake) => (
                <div key={stake.id} className="bg-black/40 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded text-xs mr-2 ${
                        stake.marketView === "bullish" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                      }`}>
                        {stake.marketView.toUpperCase()}
                      </span>
                      <span className="font-medium text-white">{stake.symbol}</span>
                      <span className="ml-2 text-gray-400 text-sm">{stake.multiplier}</span>
                    </div>
                    <span className="text-xs text-gray-400">Withdrawn</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Entry Price</p>
                      <p className="text-sm text-white">${stake.entryPrice.toFixed(4)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Exit Price</p>
                      <p className="text-sm text-white">${stake.currentPrice.toFixed(4)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-400">Stake Size</p>
                      <p className="text-sm text-white">${stake.stakeSize.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Yield</p>
                      <p className={`text-sm font-medium ${
                        stake.yieldReturn >= 0 ? "text-green-400" : "text-red-400"
                      }`}>
                        {stake.yieldReturn >= 0 ? "+" : ""}{stake.yieldReturn}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
