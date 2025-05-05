
import { useState } from "react";
import { MainNavbar } from "@/components/MainNavbar";
import { NFTOfferCard } from "@/components/NFTOfferCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const nfts = [
  {
    id: "1",
    name: "Solana Monkey #123",
    collection: "Solana Monkey Business",
    price: 15.5,
    currency: "SOL",
    image: "https://source.unsplash.com/random/300×300/?monkey",
    rarity: "Legendary",
    seller: {
      name: "NFTWhale",
      rating: 4.9,
      isOnline: true,
    },
    attributes: [
      { trait_type: "Background", value: "Galaxy" },
      { trait_type: "Eyes", value: "Laser" },
      { trait_type: "Mouth", value: "Gold Teeth" },
    ],
  },
  {
    id: "2",
    name: "DexPlay Dragon #007",
    collection: "DexPlay Dragons",
    price: 1000,
    currency: "DIO",
    image: "https://source.unsplash.com/random/300×300/?dragon",
    rarity: "Epic",
    seller: {
      name: "GameCollector",
      rating: 4.7,
      isOnline: true,
    },
    attributes: [
      { trait_type: "Color", value: "Emerald" },
      { trait_type: "Wings", value: "Armored" },
      { trait_type: "Breath", value: "Ice" },
    ],
  },
  {
    id: "3",
    name: "Degenerate Ape #456",
    collection: "Degenerate Ape Academy",
    price: 8.2,
    currency: "SOL",
    image: "https://source.unsplash.com/random/300×300/?ape",
    rarity: "Rare",
    seller: {
      name: "SolTrader",
      rating: 4.8,
      isOnline: false,
    },
    attributes: [
      { trait_type: "Clothes", value: "Tuxedo" },
      { trait_type: "Hat", value: "Top Hat" },
      { trait_type: "Accessory", value: "Cigar" },
    ],
  },
  {
    id: "4",
    name: "Magic Sword #234",
    collection: "Game Assets",
    price: 500,
    currency: "DIO",
    image: "https://source.unsplash.com/random/300×300/?sword",
    rarity: "Uncommon",
    seller: {
      name: "GameItemTrader",
      rating: 4.5,
      isOnline: true,
    },
    attributes: [
      { trait_type: "Damage", value: "50-75" },
      { trait_type: "Element", value: "Fire" },
      { trait_type: "Level", value: "Rare" },
    ],
  },
  {
    id: "5",
    name: "Space Explorer #789",
    collection: "Cosmic Voyagers",
    price: 12.8,
    currency: "SOL",
    image: "https://source.unsplash.com/random/300×300/?space",
    rarity: "Epic",
    seller: {
      name: "CosmicDealer",
      rating: 4.6,
      isOnline: true,
    },
    attributes: [
      { trait_type: "Helmet", value: "Nebula Glass" },
      { trait_type: "Suit", value: "Anti-Gravity" },
      { trait_type: "Tool", value: "Plasma Cutter" },
    ],
  },
  {
    id: "6",
    name: "Mystic Potion #567",
    collection: "Alchemy Items",
    price: 750,
    currency: "DIO",
    image: "https://source.unsplash.com/random/300×300/?potion",
    rarity: "Legendary",
    seller: {
      name: "MysticTrader",
      rating: 4.9,
      isOnline: false,
    },
    attributes: [
      { trait_type: "Effect", value: "Invisibility" },
      { trait_type: "Duration", value: "30 min" },
      { trait_type: "Rarity", value: "Ultra Rare" },
    ],
  },
  {
    id: "7",
    name: "Cyber Cat #321",
    collection: "Cyberpunk Pets",
    price: 6.4,
    currency: "SOL",
    image: "https://source.unsplash.com/random/300×300/?cyborg",
    rarity: "Rare",
    seller: {
      name: "CyberCollector",
      rating: 4.7,
      isOnline: true,
    },
    attributes: [
      { trait_type: "Implants", value: "Neural Link" },
      { trait_type: "Eyes", value: "LED Red" },
      { trait_type: "Power", value: "Electric Dash" },
    ],
  },
  {
    id: "8",
    name: "Ancient Relic #888",
    collection: "Lost Treasures",
    price: 2500,
    currency: "DIO",
    image: "https://source.unsplash.com/random/300×300/?artifact",
    rarity: "Legendary",
    seller: {
      name: "ArtifactHunter",
      rating: 5.0,
      isOnline: true,
    },
    attributes: [
      { trait_type: "Age", value: "Millennia" },
      { trait_type: "Material", value: "Unknown Alloy" },
      { trait_type: "Power", value: "Time Manipulation" },
      { trait_type: "Origin", value: "Lost City" },
    ],
  },
];

export default function P2PNfts() {
  const [currentTab, setCurrentTab] = useState("buy");
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>(["SOL", "DIO"]);
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  
  const handleCurrencyToggle = (currency: string) => {
    if (selectedCurrencies.includes(currency)) {
      setSelectedCurrencies(selectedCurrencies.filter(c => c !== currency));
    } else {
      setSelectedCurrencies([...selectedCurrencies, currency]);
    }
  };
  
  const handleRarityToggle = (rarity: string) => {
    if (selectedRarities.includes(rarity)) {
      setSelectedRarities(selectedRarities.filter(r => r !== rarity));
    } else {
      setSelectedRarities([...selectedRarities, rarity]);
    }
  };
  
  const filteredNfts = nfts.filter(nft => {
    // Filter by search term
    if (searchTerm && !nft.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !nft.collection.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by currency
    if (selectedCurrencies.length && !selectedCurrencies.includes(nft.currency)) {
      return false;
    }
    
    // Filter by price
    if (nft.currency === "SOL" && (nft.price < priceRange[0] || nft.price > priceRange[1])) {
      return false;
    }
    
    // Filter by rarity
    if (selectedRarities.length && !selectedRarities.includes(nft.rarity)) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-dexplay-darkPurple">
      <MainNavbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">NFT Marketplace</h1>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="border-dexplay-purple text-dexplay-purple hover:bg-dexplay-purple/20"
              asChild
            >
              <Link to="/p2p">P2P Trading</Link>
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
              Buy NFTs
            </TabsTrigger>
            <TabsTrigger 
              value="sell"
              className={`${currentTab === "sell" ? "bg-red-600 text-white data-[state=active]:bg-red-600" : "text-gray-300"}`}
            >
              Sell NFTs
            </TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            {/* Filters Sidebar */}
            <div className="col-span-1 bg-dexplay-darkPurple/60 border border-white/10 rounded-lg p-4 h-fit">
              <h2 className="text-lg font-medium text-white mb-4">Filters</h2>
              
              <div className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input 
                      placeholder="Search NFTs or collections" 
                      className="pl-9 bg-gray-900 border-gray-700 text-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-300">Price Range (SOL)</span>
                    <span className="text-sm text-white">
                      {priceRange[0]} - {priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 20]}
                    max={20}
                    step={0.1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                </div>
                
                <Separator className="bg-gray-700" />
                
                {/* Currency */}
                <div className="space-y-2">
                  <span className="text-sm text-gray-300">Currency</span>
                  <div className="grid grid-cols-2 gap-2">
                    {["SOL", "DIO", "USDC", "ETH"].map((currency) => (
                      <div key={currency} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`currency-${currency}`}
                          checked={selectedCurrencies.includes(currency)}
                          onCheckedChange={() => handleCurrencyToggle(currency)}
                        />
                        <Label 
                          htmlFor={`currency-${currency}`}
                          className="text-white text-sm"
                        >
                          {currency}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="bg-gray-700" />
                
                {/* Rarity */}
                <div className="space-y-2">
                  <span className="text-sm text-gray-300">Rarity</span>
                  <div className="space-y-1">
                    {["Legendary", "Epic", "Rare", "Uncommon"].map((rarity) => (
                      <div key={rarity} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`rarity-${rarity}`}
                          checked={selectedRarities.includes(rarity)}
                          onCheckedChange={() => handleRarityToggle(rarity)}
                        />
                        <Label 
                          htmlFor={`rarity-${rarity}`}
                          className="text-white text-sm"
                        >
                          {rarity}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setPriceRange([0, 20]);
                    setSelectedCurrencies(["SOL", "DIO"]);
                    setSelectedRarities([]);
                  }}
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
            
            {/* NFT Grid */}
            <div className="col-span-1 md:col-span-3">
              <TabsContent value="buy" className="mt-0">
                {filteredNfts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredNfts.map((nft) => (
                      <NFTOfferCard key={nft.id} {...nft} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <p className="text-gray-400 text-lg">No NFTs found matching your filters</p>
                    <Button 
                      variant="link"
                      onClick={() => {
                        setSearchTerm("");
                        setPriceRange([0, 20]);
                        setSelectedCurrencies(["SOL", "DIO"]);
                        setSelectedRarities([]);
                      }}
                      className="text-dexplay-purple mt-2"
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="sell" className="mt-0">
                <div className="bg-dexplay-darkPurple/60 border border-white/10 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-medium text-white mb-3">Sell Your NFTs</h3>
                  <p className="text-gray-300 mb-6">
                    List your NFTs for sale and reach thousands of potential buyers.
                  </p>
                  <Button className="bg-dexplay-purple hover:bg-dexplay-brightPurple text-white">
                    Connect Wallet to Sell
                  </Button>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
