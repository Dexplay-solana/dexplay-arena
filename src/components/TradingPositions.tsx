
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
    const isLong = Math.random() > 0.5;
    const entryPrice = parseFloat((Math.random() * 10 + 0.1).toFixed(4));
    const currentPrice = isLong 
      ? entryPrice * (1 + Math.random() * 0.3)
      : entryPrice * (1 - Math.random() * 0.3);
    const leverage = Math.floor(Math.random() * 10) + 1;
    const size = parseFloat((Math.random() * 1000 + 100).toFixed(2));
    const pnl = isLong 
      ? (currentPrice - entryPrice) / entryPrice * 100 * leverage
      : (entryPrice - currentPrice) / entryPrice * 100 * leverage;
    
    positions.push({
      id: `pos-${i}`,
      symbol: tokens[i % tokens.length],
      type: isLong ? "long" : "short",
      leverage: `${leverage}x`,
      entryPrice,
      markPrice: currentPrice,
      size,
      pnl: parseFloat(pnl.toFixed(2)),
      liquidationPrice: isLong
        ? entryPrice * (1 - 1/leverage * 0.9)
        : entryPrice * (1 + 1/leverage * 0.9),
    });
  }
  
  return positions;
};

interface Position {
  id: string;
  symbol: string;
  type: "long" | "short";
  leverage: string;
  entryPrice: number;
  markPrice: number;
  size: number;
  pnl: number;
  liquidationPrice: number;
}

export function TradingPositions() {
  const [activePositions, setActivePositions] = useState<Position[]>(() => generateMockPositions(3));
  const [orderHistory, setOrderHistory] = useState<Position[]>(() => generateMockPositions(5));
  
  const closePosition = (position: Position) => {
    // Remove position from active list
    setActivePositions(prev => prev.filter(p => p.id !== position.id));
    
    // Show toast
    toast({
      title: `${position.type === "long" ? "Long" : "Short"} position closed`,
      description: `${position.symbol} ${position.size.toFixed(2)} with ${position.pnl >= 0 ? "profit" : "loss"} of ${position.pnl}%`,
    });
  };
  
  return (
    <Card className="bg-black/20 backdrop-blur-sm border border-white/10 p-6">
      <Tabs defaultValue="positions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/40">
          <TabsTrigger value="positions" className="data-[state=active]:bg-dexplay-purple">Positions</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-dexplay-purple">Order History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="positions" className="pt-4">
          <ScrollArea className="h-[360px]">
            {activePositions.length > 0 ? (
              <div className="space-y-4">
                {activePositions.map((position) => (
                  <div key={position.id} className="bg-black/40 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded text-xs mr-2 ${
                          position.type === "long" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                        }`}>
                          {position.type.toUpperCase()}
                        </span>
                        <span className="font-medium text-white">{position.symbol}</span>
                        <span className="ml-2 text-gray-400 text-sm">{position.leverage}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-dexplay-purple text-dexplay-purple hover:bg-dexplay-purple/20"
                        onClick={() => closePosition(position)}
                      >
                        Close
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <p className="text-xs text-gray-400">Entry Price</p>
                        <p className="text-sm text-white">${position.entryPrice.toFixed(4)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Mark Price</p>
                        <p className="text-sm text-white">${position.markPrice.toFixed(4)}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs text-gray-400">Size</p>
                        <p className="text-sm text-white">${position.size.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">PnL</p>
                        <p className={`text-sm font-medium ${
                          position.pnl >= 0 ? "text-green-400" : "text-red-400"
                        }`}>
                          {position.pnl >= 0 ? "+" : ""}{position.pnl}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <p className="text-gray-400">No open positions</p>
                <p className="text-sm text-gray-500 mt-2">Open a position to start trading</p>
              </div>
            )}
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="history" className="pt-4">
          <ScrollArea className="h-[360px]">
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div key={order.id} className="bg-black/40 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded text-xs mr-2 ${
                        order.type === "long" ? "bg-green-600/20 text-green-400" : "bg-red-600/20 text-red-400"
                      }`}>
                        {order.type.toUpperCase()}
                      </span>
                      <span className="font-medium text-white">{order.symbol}</span>
                      <span className="ml-2 text-gray-400 text-sm">{order.leverage}</span>
                    </div>
                    <span className="text-xs text-gray-400">Closed</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <p className="text-xs text-gray-400">Entry Price</p>
                      <p className="text-sm text-white">${order.entryPrice.toFixed(4)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Exit Price</p>
                      <p className="text-sm text-white">${order.markPrice.toFixed(4)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-gray-400">Size</p>
                      <p className="text-sm text-white">${order.size.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">PnL</p>
                      <p className={`text-sm font-medium ${
                        order.pnl >= 0 ? "text-green-400" : "text-red-400"
                      }`}>
                        {order.pnl >= 0 ? "+" : ""}{order.pnl}%
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
