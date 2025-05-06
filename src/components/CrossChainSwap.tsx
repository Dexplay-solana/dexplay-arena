
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowDown, Wallet } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";

// Mock data for demonstration - Only Solana-based tokens
const CHAINS = [
  { id: "solana", name: "Solana", icon: "🔵" },
];

const TOKENS = [
  { id: "sol", name: "SOL", chain: "solana", balance: 4.32, icon: "🔵" },
  { id: "dio", name: "DIO", chain: "solana", balance: 142.7, icon: "🎮" },
  { id: "cave", name: "CAVE", chain: "solana", balance: 543.2, icon: "🏔️" },
  { id: "forge", name: "FORGE", chain: "solana", balance: 231.5, icon: "⚒️" },
  { id: "pixel", name: "PIXEL", chain: "solana", balance: 320.7, icon: "🎯" },
];

export function CrossChainSwap() {
  const [fromChain, setFromChain] = useState(CHAINS[0].id);
  const [toChain, setToChain] = useState(CHAINS[0].id);
  const [fromToken, setFromToken] = useState(TOKENS[0].id);
  const [toToken, setToToken] = useState(TOKENS[1].id);
  const [amount, setAmount] = useState("");
  const [estimatedAmount, setEstimatedAmount] = useState("0");
  const [isSwapping, setIsSwapping] = useState(false);
  
  // Get filtered tokens based on selected chain
  const fromTokens = TOKENS.filter(token => token.chain === fromChain);
  const toTokens = TOKENS.filter(token => token.chain === toChain);
  
  // Selected token objects
  const selectedFromToken = TOKENS.find(t => t.id === fromToken);
  const selectedToToken = TOKENS.find(t => t.id === toToken);
  
  // Calculate estimated amount (mock calculation for demonstration)
  const calculateEstimate = (value) => {
    if (!value || isNaN(parseFloat(value))) return "0";
    
    const fromTokenValue = selectedFromToken?.id === "sol" ? 100 : 
                           selectedFromToken?.id === "dio" ? 5.32 : 
                           selectedFromToken?.id === "cave" ? 0.0097 : 
                           selectedFromToken?.id === "forge" ? 0.325 : 
                           selectedFromToken?.id === "pixel" ? 0.418 : 1;
                           
    const toTokenValue = selectedToToken?.id === "sol" ? 100 : 
                         selectedToToken?.id === "dio" ? 5.32 : 
                         selectedToToken?.id === "cave" ? 0.0097 : 
                         selectedToToken?.id === "forge" ? 0.325 : 
                         selectedToToken?.id === "pixel" ? 0.418 : 1;
    
    const ratio = toTokenValue / fromTokenValue;
    return (parseFloat(value) * ratio).toFixed(6);
  };
  
  // Handle amount change
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setEstimatedAmount(calculateEstimate(value));
  };
  
  // Handle token changes
  const handleFromTokenChange = (value) => {
    setFromToken(value);
    // Don't allow same token for from and to
    if (value === toToken) {
      const differentToken = TOKENS.find(t => t.id !== value);
      if (differentToken) setToToken(differentToken.id);
    }
  };
  
  const handleToTokenChange = (value) => {
    setToToken(value);
    // Don't allow same token for from and to
    if (value === fromToken) {
      const differentToken = TOKENS.find(t => t.id !== value);
      if (differentToken) setFromToken(differentToken.id);
    }
  };
  
  // Swap function
  const handleSwap = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (parseFloat(amount) > (selectedFromToken?.balance || 0)) {
      toast.error("Insufficient balance");
      return;
    }
    
    setIsSwapping(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Swap completed successfully!");
      setAmount("");
      setEstimatedAmount("0");
      setIsSwapping(false);
    }, 2000);
  };
  
  // Switch tokens
  const handleSwitchDirections = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setAmount("");
    setEstimatedAmount("0");
  };
  
  return (
    <Card className="bg-black/20 backdrop-blur-sm border border-white/10 p-6">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Solana Token Swap</h2>
        
        {/* From Section */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400">From</label>
            <div className="text-sm text-gray-400">
              Balance: {selectedFromToken?.balance.toFixed(4) || "0"} {selectedFromToken?.name || ""}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Select value={fromToken} onValueChange={handleFromTokenChange}>
              <SelectTrigger className="bg-black/40 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dexplay-darkPurple border-white/10">
                {fromTokens.map((token) => (
                  <SelectItem key={token.id} value={token.id}>
                    <div className="flex items-center gap-2">
                      <span>{token.icon}</span>
                      <span>{token.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="relative">
              <Input 
                type="number" 
                placeholder="0.0" 
                className="bg-black/40 border-white/10" 
                value={amount}
                onChange={handleAmountChange}
              />
              <button 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-dexplay-purple"
                onClick={() => {
                  if (selectedFromToken) {
                    setAmount(selectedFromToken.balance.toString());
                    setEstimatedAmount(calculateEstimate(selectedFromToken.balance));
                  }
                }}
              >
                MAX
              </button>
            </div>
          </div>
        </div>
        
        {/* Switch Button */}
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-dexplay-purple/20 border-dexplay-purple h-8 w-8"
            onClick={handleSwitchDirections}
          >
            <ArrowDown className="h-4 w-4 text-white" />
          </Button>
        </div>
        
        {/* To Section */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-gray-400">To (Estimated)</label>
            <div className="text-sm text-gray-400">
              Balance: {selectedToToken?.balance.toFixed(4) || "0"} {selectedToToken?.name || ""}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Select value={toToken} onValueChange={handleToTokenChange}>
              <SelectTrigger className="bg-black/40 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dexplay-darkPurple border-white/10">
                {toTokens.map((token) => (
                  <SelectItem key={token.id} value={token.id}>
                    <div className="flex items-center gap-2">
                      <span>{token.icon}</span>
                      <span>{token.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Input 
              type="text" 
              placeholder="0.0" 
              className="bg-black/20 border-white/10 text-gray-400" 
              value={estimatedAmount}
              readOnly
            />
          </div>
        </div>
        
        {/* Fee Info */}
        <div className="bg-black/30 p-3 rounded-md space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Exchange Rate</span>
            <span className="text-white">
              1 {selectedFromToken?.name} ≈ {parseFloat(amount) > 0 ? (parseFloat(estimatedAmount) / parseFloat(amount)).toFixed(6) : "0.000000"} {selectedToToken?.name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Network Fee</span>
            <span className="text-white">0.005 SOL</span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span className="text-gray-400">Estimated Time</span>
            <span className="text-white">~2 seconds</span>
          </div>
        </div>
        
        {/* Swap Button */}
        <Button 
          className="w-full bg-dexplay-purple hover:bg-dexplay-brightPurple h-12 text-white font-medium"
          disabled={isSwapping || !amount || parseFloat(amount) <= 0}
          onClick={handleSwap}
        >
          {isSwapping ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-white"></span>
              Processing...
            </span>
          ) : !amount ? (
            "Enter an amount"
          ) : parseFloat(amount) > (selectedFromToken?.balance || 0) ? (
            "Insufficient balance"
          ) : (
            <span className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Swap
            </span>
          )}
        </Button>
      </div>
    </Card>
  );
}
