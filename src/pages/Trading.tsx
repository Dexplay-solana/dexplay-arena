
import { useState, useEffect } from "react";
import { MainNavbar } from "@/components/MainNavbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TradingChart } from "@/components/TradingChart";
import { TradingForm } from "@/components/TradingForm";
import { TradingPositions } from "@/components/TradingPositions";
import { TokenList } from "@/components/TokenList";

export default function Trading() {
  const [selectedToken, setSelectedToken] = useState({
    symbol: "DIO/SOL",
    name: "Decimated",
    price: 5.32,
    change24h: 7.8,
    volume24h: 1235621,
    roi: 12.4,
  });

  return (
    <div className="min-h-screen bg-dexplay-darkPurple">
      <MainNavbar />
      
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-white mb-2">
          <span className="gradient-text">Token Trading</span>
        </h1>
        <p className="text-gray-400 mb-6">
          Trade game tokens on the Solana network with leverage
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar - Token list */}
          <div className="lg:col-span-1">
            <TokenList 
              selectedToken={selectedToken.symbol} 
              onSelectToken={setSelectedToken} 
            />
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-6">
              {/* Market Info and Chart */}
              <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedToken.symbol}</h2>
                    <p className="text-gray-400">{selectedToken.name}</p>
                  </div>
                  <div className="flex flex-col items-end mt-2 md:mt-0">
                    <div className="text-2xl font-bold text-white">${selectedToken.price.toFixed(4)}</div>
                    <div className={`flex items-center ${selectedToken.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      <span>{selectedToken.change24h >= 0 ? '+' : ''}{selectedToken.change24h}%</span>
                      <span className="text-gray-400 ml-2">24h</span>
                    </div>
                  </div>
                </div>
                
                {/* Trading chart */}
                <TradingChart tokenSymbol={selectedToken.symbol} />
              </div>
              
              {/* Trading interface */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order form */}
                <TradingForm tokenSymbol={selectedToken.symbol} tokenPrice={selectedToken.price} />
                
                {/* Positions */}
                <TradingPositions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
