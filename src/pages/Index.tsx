
import { MainNavbar } from "@/components/MainNavbar";
import { StreamPlayer } from "@/components/StreamPlayer";
import { StreamChat } from "@/components/StreamChat";
import { TokenVoting } from "@/components/TokenVoting";
import { OrderBook } from "@/components/OrderBook";
import { StreamStats } from "@/components/StreamStats";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Placeholder images for the stream
  const streamThumbnail = "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80";
  const tokenLogo = "https://via.placeholder.com/100/9b87f5/ffffff?text=DIO";

  return (
    <div className="min-h-screen bg-dexplay-darkPurple">
      <MainNavbar />
      
      <div className="container mx-auto py-6 px-4 sm:px-6">
        {isLoaded ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Stream + Chat */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <StreamPlayer 
                  thumbnail={streamThumbnail} 
                  isLive={true}
                  streamerName="CryptoGameMaster"
                  gameTitle="Decimated"
                />
                
                {/* Stream Title and Info */}
                <div className="mt-4">
                  <h1 className="text-2xl font-bold text-white">Epic Decimated Survival Gameplay | Web3 Gaming Session</h1>
                  <div className="flex flex-wrap items-center mt-2 gap-2">
                    <div className="bg-dexplay-purple/20 px-3 py-1 rounded-full text-sm text-dexplay-purple">
                      Solana Gaming
                    </div>
                    <div className="bg-dexplay-purple/20 px-3 py-1 rounded-full text-sm text-dexplay-purple">
                      Survival
                    </div>
                    <div className="bg-dexplay-purple/20 px-3 py-1 rounded-full text-sm text-dexplay-purple">
                      Web3
                    </div>
                  </div>
                </div>
              </div>

              {/* Token Voting and Stream Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TokenVoting 
                  gameTitle="Decimated" 
                  tokenSymbol="DIO" 
                  tokenLogo={tokenLogo}
                />
                <StreamStats 
                  viewers={1243}
                  followers={58500}
                  tokenPrice={5.32}
                  priceChange={7.8}
                  stakedTotal={25600}
                  roi={12.4}
                />
              </div>
              
              {/* Order Book */}
              <OrderBook />
            </div>
            
            {/* Sidebar - Chat */}
            <div className="h-[calc(100vh-10rem)]">
              <StreamChat />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-dexplay-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-white">Loading Stream...</h2>
              <p className="text-gray-400 mt-2">Connecting to the Dexplay network</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
