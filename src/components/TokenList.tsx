
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { useState } from "react";

// Token data
const TOKENS = [
  {
    symbol: "DIO/SOL",
    name: "Decimated",
    price: 5.32,
    change24h: 7.8,
    volume24h: 1235621,
    roi: 12.4,
  },
  {
    symbol: "AURY/SOL",
    name: "Aurory",
    price: 0.1155,
    change24h: -2.3,
    volume24h: 982145,
    roi: 5.2,
  },
  {
    symbol: "DFL/SOL",
    name: "DeFi Land",
    price: 0.0001941,
    change24h: 1.4,
    volume24h: 456213,
    roi: 3.7,
  },
  {
    symbol: "GMT/SOL",
    name: "STEPN",
    price: 0.05509,
    change24h: -0.8,
    volume24h: 3214569,
    roi: 8.9,
  },
  {
    symbol: "RACEFI/SOL",
    name: "RaceFi",
    price: 0.0006672,
    change24h: 4.2,
    volume24h: 215698,
    roi: 6.1,
  },
  {
    symbol: "CAVE/SOL",
    name: "Minecraft",
    price: 0.009654,
    change24h: 2.1,
    volume24h: 784125,
    roi: 7.3,
  },
  {
    symbol: "FORGE/SOL",
    name: "MetalForge",
    price: 0.02341,
    change24h: 9.5,
    volume24h: 412569,
    roi: 14.2,
  },
  {
    symbol: "PIXEL/SOL",
    name: "Pixel Kingdom",
    price: 0.00789,
    change24h: -1.7,
    volume24h: 658741,
    roi: 4.9,
  }
];

interface TokenListProps {
  selectedToken: string;
  onSelectToken: (token: any) => void;
}

export function TokenList({ selectedToken, onSelectToken }: TokenListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter tokens based on search query
  const filteredTokens = TOKENS.filter(token => 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Card className="bg-black/20 backdrop-blur-sm border border-white/10 h-full">
      <div className="p-4 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search tokens..."
            className="pl-8 bg-black/40 border-white/10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="p-1">
          {filteredTokens.map((token) => (
            <button
              key={token.symbol}
              className={`w-full text-left p-3 rounded-md transition-colors ${
                selectedToken === token.symbol 
                  ? "bg-dexplay-purple/20 hover:bg-dexplay-purple/30" 
                  : "hover:bg-black/40"
              }`}
              onClick={() => onSelectToken(token)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-white">{token.symbol}</div>
                  <div className="text-xs text-gray-400">{token.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-white">${token.price.toFixed(4)}</div>
                  <div className={`text-xs ${token.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {token.change24h >= 0 ? "+" : ""}{token.change24h}%
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-xs">
                <span className="text-gray-400">Vol: ${(token.volume24h / 1000).toFixed(1)}K</span>
                <span className="text-dexplay-purple">ROI: {token.roi}%</span>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
