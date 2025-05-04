
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MainNavbar } from "@/components/MainNavbar";
import { StreamPlayer } from "@/components/StreamPlayer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TradingForm } from "@/components/TradingForm";
import { OrderBook } from "@/components/OrderBook";
import { Coins, MessageSquare } from "lucide-react";

export default function LivestreamView() {
  const { id } = useParams();
  const location = useLocation();
  const stream = location.state?.stream || {
    id: "1",
    title: "Epic Decimated Survival Gameplay",
    game: "Decimated",
    network: "Solana",
    viewers: 1243,
    creator: {
      id: "crypto-master",
      name: "CryptoGameMaster",
      avatar: "https://i.pravatar.cc/150?u=cryptomaster"
    },
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    tags: ["Survival", "Web3", "Solana"]
  };
  
  const [activeTab, setActiveTab] = useState<"chat" | "trade">("chat");
  
  const tokenData = {
    symbol: `${stream.game}/SOL`,
    name: stream.game,
    price: 5.32,
    change24h: 7.8,
  };

  return (
    <div className="min-h-screen bg-dexplay-darkPurple">
      <MainNavbar />
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main stream area */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-white mb-2">{stream.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <img src={stream.creator.avatar} alt={stream.creator.name} className="w-8 h-8 rounded-full" />
              <span className="text-white">{stream.creator.name}</span>
              <span className="ml-auto text-gray-400">
                <span className="bg-red-600 px-2 py-0.5 rounded text-white text-xs">{stream.viewers.toLocaleString()} watching</span>
              </span>
            </div>
            
            {/* Stream player */}
            <div className="mb-6">
              <StreamPlayer 
                thumbnail={stream.thumbnail} 
                isLive={true}
                streamerName={stream.creator.name}
                gameTitle={stream.game}
              />
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {stream.tags.map(tag => (
                <span key={tag} className="bg-dexplay-purple/20 text-dexplay-purple px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Sidebar for chat/trading */}
          <div className="lg:col-span-1">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
              <div className="flex">
                <button 
                  className={`flex-1 py-3 flex justify-center items-center gap-2 ${activeTab === "chat" ? "bg-dexplay-purple text-white" : "text-gray-400"}`}
                  onClick={() => setActiveTab("chat")}
                >
                  <MessageSquare className="w-4 h-4" /> 
                  Chat
                </button>
                <button 
                  className={`flex-1 py-3 flex justify-center items-center gap-2 ${activeTab === "trade" ? "bg-dexplay-purple text-white" : "text-gray-400"}`}
                  onClick={() => setActiveTab("trade")}
                >
                  <Coins className="w-4 h-4" /> 
                  Trade
                </button>
              </div>
              
              <div className="p-4">
                {activeTab === "chat" ? (
                  <div className="h-[500px] overflow-y-auto">
                    <div className="text-center text-gray-400 py-4">
                      <p>Chat functionality will be added soon!</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-white font-medium">{tokenData.symbol}</h3>
                        <div className="text-right">
                          <div className="text-xl font-bold text-white">${tokenData.price}</div>
                          <div className={tokenData.change24h >= 0 ? "text-green-500" : "text-red-500"}>
                            {tokenData.change24h >= 0 ? "+" : ""}{tokenData.change24h}%
                          </div>
                        </div>
                      </div>
                      
                      <TradingForm
                        tokenSymbol={tokenData.symbol}
                        tokenPrice={tokenData.price}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
