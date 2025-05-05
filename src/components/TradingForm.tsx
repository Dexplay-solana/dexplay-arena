
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { Coins, Wallet } from "lucide-react";

interface TradingFormProps {
  tokenSymbol: string;
  tokenPrice: number;
  compact?: boolean;
  onStakeComplete?: () => void;
}

export function TradingForm({ tokenSymbol, tokenPrice, compact = false, onStakeComplete }: TradingFormProps) {
  const [amount, setAmount] = useState("100");
  const [leverage, setLeverage] = useState(2);
  
  // Calculated values
  const calculatedSize = parseFloat(amount) * leverage;
  const estimatedYield = (tokenPrice * 0.025 * leverage).toFixed(2);
  const riskLevel = tokenPrice * (1 - 1/leverage * 0.9);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show a toast notification
    toast({
      title: `Token stake placed`,
      description: `${calculatedSize.toFixed(2)} ${tokenSymbol} staked at $${tokenPrice}`,
    });
    
    // Reset form
    setAmount("100");
    setLeverage(2);
    
    // Notify parent component that stake is complete
    if (onStakeComplete) {
      onStakeComplete();
    }
  };

  // For compact mobile view
  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1">
            <div className="text-sm font-medium text-white">${tokenPrice.toFixed(4)}</div>
            <div className="text-xs text-green-500">
              Yield: {estimatedYield}/day
            </div>
          </div>
          
          <div className="flex items-center ml-3">
            <Input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-24 bg-black/40 border-white/10 h-9"
              placeholder="Amount"
            />
            <Button 
              type="submit" 
              className="ml-1.5 bg-dexplay-purple hover:bg-dexplay-brightPurple"
            >
              Stake
            </Button>
          </div>
        </div>
        
        <div className="flex items-center">
          <span className="text-xs text-gray-400 mr-2">Yield Multiplier: {leverage}x</span>
          <div className="flex-1">
            <Slider
              value={[leverage]}
              min={1}
              max={20}
              step={1}
              onValueChange={(values) => setLeverage(values[0])}
            />
          </div>
        </div>
      </form>
    );
  }
  
  // Standard desktop version
  return (
    <Card className="bg-black/20 backdrop-blur-sm border border-white/10 p-6">
      <form onSubmit={handleSubmit}>
        {/* Amount input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-2">Stake Amount (SOL)</label>
          <div className="relative">
            <Input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-8 bg-black/40 border-white/10"
            />
            <Coins className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
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
        
        {/* Leverage slider (now described as Yield Multiplier) */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="block text-sm font-medium text-gray-400">Yield Multiplier</label>
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
            <span>1x (Low Risk)</span>
            <span>20x (High Risk)</span>
          </div>
        </div>
        
        {/* Position details */}
        <div className="bg-black/40 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Entry Price</span>
            <span className="text-white">${tokenPrice.toFixed(4)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Total Stake</span>
            <span className="text-white">${calculatedSize.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-400">Est. Daily Yield</span>
            <span className="text-white">${estimatedYield}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Risk Level</span>
            <span className="text-white">${riskLevel.toFixed(4)}</span>
          </div>
        </div>
        
        {/* Submit button */}
        <Button 
          type="submit" 
          className="w-full bg-dexplay-purple hover:bg-dexplay-brightPurple"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Stake Tokens
        </Button>
      </form>
    </Card>
  );
}
