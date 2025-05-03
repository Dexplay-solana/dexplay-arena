
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";

interface TradingFormProps {
  tokenSymbol: string;
  tokenPrice: number;
}

export function TradingForm({ tokenSymbol, tokenPrice }: TradingFormProps) {
  const [orderType, setOrderType] = useState("market");
  const [positionType, setPositionType] = useState("long");
  const [amount, setAmount] = useState("100");
  const [leverage, setLeverage] = useState(2);
  
  // Calculated values
  const calculatedSize = parseFloat(amount) * leverage;
  const liquidationPrice = positionType === "long" 
    ? tokenPrice * (1 - 1/leverage * 0.9) 
    : tokenPrice * (1 + 1/leverage * 0.9);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show a toast notification
    toast({
      title: `${positionType === "long" ? "Long" : "Short"} position opened`,
      description: `${calculatedSize.toFixed(2)} ${tokenSymbol} at $${tokenPrice}`,
    });
    
    // Reset form
    setAmount("100");
    setLeverage(2);
  };
  
  return (
    <Card className="bg-black/20 backdrop-blur-sm border border-white/10 p-6">
      <Tabs defaultValue="market" onValueChange={setOrderType} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/40">
          <TabsTrigger value="market" className="data-[state=active]:bg-dexplay-purple">Market</TabsTrigger>
          <TabsTrigger value="limit" className="data-[state=active]:bg-dexplay-purple">Limit</TabsTrigger>
          <TabsTrigger value="stop" className="data-[state=active]:bg-dexplay-purple">Stop</TabsTrigger>
        </TabsList>
        
        <TabsContent value="market" className="pt-4">
          <form onSubmit={handleSubmit}>
            {/* Position type selection */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <Button 
                type="button"
                variant={positionType === "long" ? "default" : "outline"}
                className={positionType === "long" 
                  ? "bg-green-600 hover:bg-green-700 text-white" 
                  : "border-white/10 bg-black/40 text-white hover:border-green-600"
                }
                onClick={() => setPositionType("long")}
              >
                <ArrowUp className="w-4 h-4 mr-2" />
                Long
              </Button>
              <Button 
                type="button"
                variant={positionType === "short" ? "default" : "outline"}
                className={positionType === "short" 
                  ? "bg-red-600 hover:bg-red-700 text-white" 
                  : "border-white/10 bg-black/40 text-white hover:border-red-600"
                }
                onClick={() => setPositionType("short")}
              >
                <ArrowDown className="w-4 h-4 mr-2" />
                Short
              </Button>
            </div>
            
            {/* Amount input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Amount (SOL)</label>
              <div className="relative">
                <Input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 bg-black/40 border-white/10"
                />
                <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <div className="flex justify-between mt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="text-xs border-white/10 bg-black/40 hover:bg-dexplay-purple/20"
                  onClick={() => setAmount("100")}
                >
                  100
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="text-xs border-white/10 bg-black/40 hover:bg-dexplay-purple/20"
                  onClick={() => setAmount("500")}
                >
                  500
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="text-xs border-white/10 bg-black/40 hover:bg-dexplay-purple/20"
                  onClick={() => setAmount("1000")}
                >
                  1000
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  className="text-xs border-white/10 bg-black/40 hover:bg-dexplay-purple/20"
                  onClick={() => setAmount("5000")}
                >
                  5000
                </Button>
              </div>
            </div>
            
            {/* Leverage slider */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium text-gray-400">Leverage</label>
                <span className="text-white font-medium">{leverage}x</span>
              </div>
              <Slider
                defaultValue={[2]}
                value={[leverage]}
                min={1}
                max={20}
                step={1}
                onValueChange={(values) => setLeverage(values[0])}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>1x</span>
                <span>20x</span>
              </div>
            </div>
            
            {/* Position details */}
            <div className="bg-black/40 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Entry Price</span>
                <span className="text-white">${tokenPrice.toFixed(4)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Size</span>
                <span className="text-white">${calculatedSize.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Liquidation Price</span>
                <span className="text-white">${liquidationPrice.toFixed(4)}</span>
              </div>
            </div>
            
            {/* Submit button */}
            <Button 
              type="submit" 
              className={`w-full ${
                positionType === "long" 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {positionType === "long" ? "Buy / Long" : "Sell / Short"}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="limit" className="pt-4">
          <div className="text-center py-8 text-gray-400">
            <p>Limit orders allow you to set a specific price</p>
            <p className="mt-2">Coming soon</p>
          </div>
        </TabsContent>
        
        <TabsContent value="stop" className="pt-4">
          <div className="text-center py-8 text-gray-400">
            <p>Stop orders execute when price reaches a trigger</p>
            <p className="mt-2">Coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
