
import { useState } from "react";
import { MainNavbar } from "@/components/MainNavbar";
import { P2PFilterBar } from "@/components/P2PFilterBar";
import { P2POfferCard } from "@/components/P2POfferCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const buyOffers = [
  {
    id: "1",
    type: "buy" as const,
    coin: "SOL",
    price: 95.50,
    minAmount: 10,
    maxAmount: 1000,
    paymentMethods: ["Bank Transfer", "PayPal"],
    trader: {
      name: "CryptoKing",
      rating: 4.9,
      ordersCompleted: 352,
      isOnline: true,
    },
  },
  {
    id: "2",
    type: "buy" as const,
    coin: "DIO",
    price: 0.45,
    minAmount: 20,
    maxAmount: 5000,
    paymentMethods: ["Bank Transfer"],
    trader: {
      name: "GameMaster",
      rating: 4.7,
      ordersCompleted: 123,
      isOnline: false,
    },
  },
  {
    id: "3",
    type: "buy" as const,
    coin: "SOL",
    price: 96.25,
    minAmount: 50,
    maxAmount: 2000,
    paymentMethods: ["Credit Card", "Crypto"],
    trader: {
      name: "SolTrader99",
      rating: 4.8,
      ordersCompleted: 287,
      isOnline: true,
    },
  },
  {
    id: "4",
    type: "buy" as const,
    coin: "DIO",
    price: 0.44,
    minAmount: 100,
    maxAmount: 10000,
    paymentMethods: ["PayPal", "Credit Card"],
    trader: {
      name: "DioWhale",
      rating: 4.6,
      ordersCompleted: 89,
      isOnline: true,
    },
  },
];

const sellOffers = [
  {
    id: "5",
    type: "sell" as const,
    coin: "SOL",
    price: 97.25,
    minAmount: 5,
    maxAmount: 500,
    paymentMethods: ["Bank Transfer"],
    trader: {
      name: "SolHodler",
      rating: 4.8,
      ordersCompleted: 201,
      isOnline: true,
    },
  },
  {
    id: "6",
    type: "sell" as const,
    coin: "DIO",
    price: 0.46,
    minAmount: 50,
    maxAmount: 8000,
    paymentMethods: ["PayPal", "Bank Transfer"],
    trader: {
      name: "DioMaster",
      rating: 4.9,
      ordersCompleted: 432,
      isOnline: true,
    },
  },
  {
    id: "7",
    type: "sell" as const,
    coin: "SOL",
    price: 96.75,
    minAmount: 20,
    maxAmount: 1500,
    paymentMethods: ["Credit Card"],
    trader: {
      name: "CryptoTrader",
      rating: 4.5,
      ordersCompleted: 167,
      isOnline: false,
    },
  },
  {
    id: "8",
    type: "sell" as const,
    coin: "DIO",
    price: 0.47,
    minAmount: 100,
    maxAmount: 5000,
    paymentMethods: ["Bank Transfer", "Cash"],
    trader: {
      name: "GameTokens",
      rating: 4.7,
      ordersCompleted: 298,
      isOnline: true,
    },
  },
];

export default function P2P() {
  const [currentTab, setCurrentTab] = useState("buy");
  
  return (
    <div className="min-h-screen bg-dexplay-darkPurple">
      <MainNavbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">P2P Trading</h1>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="border-dexplay-purple text-dexplay-purple hover:bg-dexplay-purple/20"
              asChild
            >
              <Link to="/p2p/nfts">NFT Marketplace</Link>
            </Button>
            <Button
              variant="outline"
              className="border-dexplay-purple text-dexplay-purple hover:bg-dexplay-purple/20"
              asChild
            >
              <Link to="/p2p/cross-game">Cross-Game NFTs</Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="buy" className="mb-6" onValueChange={setCurrentTab}>
          <TabsList className="grid grid-cols-2 w-full max-w-md bg-dexplay-darkPurple/50 border border-white/10">
            <TabsTrigger 
              value="buy"
              className={`${currentTab === "buy" ? "bg-green-600 text-white data-[state=active]:bg-green-600" : "text-gray-300"}`}
            >
              Buy Tokens
            </TabsTrigger>
            <TabsTrigger 
              value="sell"
              className={`${currentTab === "sell" ? "bg-red-600 text-white data-[state=active]:bg-red-600" : "text-gray-300"}`}
            >
              Sell Tokens
            </TabsTrigger>
          </TabsList>
          
          <P2PFilterBar />
          
          <TabsContent value="buy" className="mt-0">
            <div className="space-y-4">
              {buyOffers.map((offer) => (
                <P2POfferCard key={offer.id} {...offer} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sell" className="mt-0">
            <div className="space-y-4">
              {sellOffers.map((offer) => (
                <P2POfferCard key={offer.id} {...offer} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
