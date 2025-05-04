
import { useState, useEffect } from "react";
import { MainNavbar } from "@/components/MainNavbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TradingChart } from "@/components/TradingChart";
import { TradingForm } from "@/components/TradingForm";
import { TradingPositions } from "@/components/TradingPositions";
import { TokenList } from "@/components/TokenList";
import { OrderBook } from "@/components/OrderBook";
import { Button } from "@/components/ui/button";
import { ChartCandlestick, History, List, ArrowDown, ArrowUp } from "lucide-react";

export default function Trading() {
  const [selectedToken, setSelectedToken] = useState({
    symbol: "DIO/SOL",
    name: "Decimated",
    price: 5.32,
    change24h: 7.8,
    volume24h: 1235621,
    roi: 12.4,
  });
  
  const [mobileView, setMobileView] = useState<"chart" | "orderbook" | "history" | "positions">("chart");
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-dexplay-darkPurple">
      <MainNavbar />
      
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-white mb-2">
          <span className="gradient-text">Token Staking</span>
        </h1>
        <p className="text-gray-400 mb-6">
          Stake game tokens on the Solana network to earn yield
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
            {/* Mobile view navigation */}
            {isMobile && (
              <div className="grid grid-cols-4 gap-2 mb-4">
                <Button 
                  variant={mobileView === "chart" ? "default" : "outline"}
                  className={mobileView === "chart" 
                    ? "bg-dexplay-purple" 
                    : "bg-black/20 border-white/10"
                  }
                  onClick={() => setMobileView("chart")}
                >
                  <ChartCandlestick className="w-5 h-5" />
                </Button>
                <Button 
                  variant={mobileView === "orderbook" ? "default" : "outline"}
                  className={mobileView === "orderbook" 
                    ? "bg-dexplay-purple" 
                    : "bg-black/20 border-white/10"
                  }
                  onClick={() => setMobileView("orderbook")}
                >
                  <List className="w-5 h-5" />
                </Button>
                <Button 
                  variant={mobileView === "history" ? "default" : "outline"}
                  className={mobileView === "history" 
                    ? "bg-dexplay-purple" 
                    : "bg-black/20 border-white/10"
                  }
                  onClick={() => setMobileView("history")}
                >
                  <History className="w-5 h-5" />
                </Button>
                <Button 
                  variant={mobileView === "positions" ? "default" : "outline"}
                  className={mobileView === "positions" 
                    ? "bg-dexplay-purple" 
                    : "bg-black/20 border-white/10"
                  }
                  onClick={() => setMobileView("positions")}
                >
                  <ArrowUp className="w-5 h-5" />
                </Button>
              </div>
            )}
            
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
                
                {/* Trading chart (conditionally rendered on mobile) */}
                {(!isMobile || mobileView === "chart") && (
                  <TradingChart tokenSymbol={selectedToken.symbol} />
                )}
              </div>
              
              {/* Desktop layout for the rest */}
              {!isMobile && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left column */}
                  <div className="space-y-6">
                    {/* Order book */}
                    <OrderBook />
                    
                    {/* Order form */}
                    <TradingForm tokenSymbol={selectedToken.symbol} tokenPrice={selectedToken.price} />
                  </div>
                  
                  {/* Right column - Positions */}
                  <TradingPositions />
                </div>
              )}
              
              {/* Mobile conditional rendering */}
              {isMobile && mobileView === "orderbook" && (
                <OrderBook />
              )}
              
              {isMobile && mobileView === "positions" && (
                <TradingPositions />
              )}
              
              {isMobile && mobileView === "history" && (
                <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-4">
                  <h3 className="text-white font-medium mb-4">Transaction History</h3>
                  <OrderBook defaultTab="trades" />
                </div>
              )}
              
              {/* Mobile trading form always visible at bottom */}
              {isMobile && (
                <div className="fixed bottom-0 left-0 right-0 bg-dexplay-darkPurple border-t border-white/10 p-4 z-10">
                  <TradingForm tokenSymbol={selectedToken.symbol} tokenPrice={selectedToken.price} compact={true} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
