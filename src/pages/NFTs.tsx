
import { useState } from "react";
import { MainNavbar } from "@/components/MainNavbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { NFTOfferCard } from "@/components/NFTOfferCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Upload, ImageIcon, FilterIcon } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export default function NFTs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // NFT data
  const nfts = [
    {
      id: "nft1",
      name: "Cyber Samurai #217",
      collection: "Cyber Samurai",
      price: 15,
      currency: "SOL",
      image: "https://images.unsplash.com/photo-1592492152545-9695d3f473f4?q=80&w=500&auto=format&fit=crop",
      rarity: "Legendary",
      seller: {
        name: "CryptoWarrior",
        rating: 4.9,
        isOnline: true,
      },
      attributes: [
        { trait_type: "Weapon", value: "Plasma Katana" },
        { trait_type: "Armor", value: "Neo-Steel" },
        { trait_type: "Rank", value: "Commander" },
      ],
      category: "RPG",
      audience: 12500,
    },
    {
      id: "nft2",
      name: "Space Explorer #089",
      collection: "Cosmic Voyagers",
      price: 8.5,
      currency: "SOL",
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=500&auto=format&fit=crop",
      rarity: "Epic",
      seller: {
        name: "GalacticTrader",
        rating: 4.7,
        isOnline: false,
      },
      attributes: [
        { trait_type: "Ship", value: "StarCruiser" },
        { trait_type: "Ability", value: "Warp Drive" },
        { trait_type: "Origin", value: "Andromeda" },
      ],
      category: "Strategy",
      audience: 8700,
    },
    {
      id: "nft3",
      name: "Mystic Mage #452",
      collection: "Arcane Masters",
      price: 12,
      currency: "SOL",
      image: "https://images.unsplash.com/photo-1560015534-cee980ba7e13?q=80&w=500&auto=format&fit=crop",
      rarity: "Rare",
      seller: {
        name: "SpellCaster",
        rating: 4.5,
        isOnline: true,
      },
      attributes: [
        { trait_type: "Element", value: "Fire" },
        { trait_type: "Familiar", value: "Phoenix" },
        { trait_type: "Spell Power", value: "87/100" },
      ],
      category: "RPG",
      audience: 9300,
    },
    {
      id: "nft4",
      name: "Race Champion #023",
      collection: "Velocity Kings",
      price: 6.25,
      currency: "SOL",
      image: "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=500&auto=format&fit=crop",
      rarity: "Epic",
      seller: {
        name: "SpeedDemon",
        rating: 4.8,
        isOnline: true,
      },
      attributes: [
        { trait_type: "Vehicle", value: "Quantum Racer" },
        { trait_type: "Top Speed", value: "950 km/h" },
        { trait_type: "Acceleration", value: "2.1s" },
      ],
      category: "Racing",
      audience: 7850,
    },
    {
      id: "nft5",
      name: "Battle Mech #781",
      collection: "Steel Warriors",
      price: 18.5,
      currency: "SOL",
      image: "https://images.unsplash.com/photo-1568229654880-42067dc0f6ff?q=80&w=500&auto=format&fit=crop",
      rarity: "Legendary",
      seller: {
        name: "MechLord",
        rating: 5.0,
        isOnline: false,
      },
      attributes: [
        { trait_type: "Class", value: "Assault" },
        { trait_type: "Firepower", value: "95/100" },
        { trait_type: "Durability", value: "88/100" },
      ],
      category: "Action",
      audience: 14200,
    },
    {
      id: "nft6",
      name: "Digital Land #112",
      collection: "MetaRealms",
      price: 32,
      currency: "SOL",
      image: "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=500&auto=format&fit=crop",
      rarity: "Legendary",
      seller: {
        name: "VirtualMogul",
        rating: 4.9,
        isOnline: true,
      },
      attributes: [
        { trait_type: "Size", value: "12 acres" },
        { trait_type: "Region", value: "Eternal Forest" },
        { trait_type: "Resources", value: "Diamond Mine" },
      ],
      category: "Metaverse",
      audience: 18600,
    },
    {
      id: "nft7",
      name: "Pixel Warrior #345",
      collection: "Retro Fighters",
      price: 3.8,
      currency: "SOL",
      image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=500&auto=format&fit=crop",
      rarity: "Rare",
      seller: {
        name: "OldSchoolGamer",
        rating: 4.6,
        isOnline: false,
      },
      attributes: [
        { trait_type: "Class", value: "Archer" },
        { trait_type: "Level", value: "76" },
        { trait_type: "Special Move", value: "Pixel Storm" },
      ],
      category: "Retro",
      audience: 6400,
    },
    {
      id: "nft8",
      name: "Sport Legend #089",
      collection: "Digital Athletes",
      price: 7.2,
      currency: "SOL",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=500&auto=format&fit=crop",
      rarity: "Epic",
      seller: {
        name: "SportsFan",
        rating: 4.7,
        isOnline: true,
      },
      attributes: [
        { trait_type: "Sport", value: "Basketball" },
        { trait_type: "Position", value: "Point Guard" },
        { trait_type: "Rating", value: "95/100" },
      ],
      category: "Sports",
      audience: 9100,
    },
  ];

  // Filter and search NFTs
  const filteredNFTs = nfts.filter((nft) => {
    const matchesCategory = category === "all" || nft.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          nft.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          nft.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("NFT uploaded successfully!");
    setUploadDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-dexplay-darkPurple relative overflow-hidden">
      <AnimatedBackground />
      <MainNavbar />
      
      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="gradient-text">NFT Marketplace</span>
            </h1>
            <p className="text-gray-400">Discover and collect rare digital gaming assets</p>
          </motion.div>
          
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-dexplay-purple hover:bg-dexplay-brightPurple">
                <Upload className="h-4 w-4 mr-2" />
                Upload NFT
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-dexplay-darkPurple/95 backdrop-blur-sm border border-white/10 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text">Upload NFT</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create your gaming NFT and list it on the DexPlay marketplace
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-4 mt-4">
                <div className="grid w-full place-items-center cursor-pointer p-6 border-2 border-dashed rounded-lg border-white/20 hover:border-dexplay-purple/50 transition-colors">
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="h-12 w-12 text-white/50" />
                    <p className="text-sm text-gray-400">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 10MB)</p>
                    <Input 
                      id="nft-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/png,image/jpeg,image/gif" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nft-name">NFT Name</Label>
                    <Input 
                      id="nft-name" 
                      placeholder="Enter NFT name" 
                      className="bg-black/20 border-white/20 text-white placeholder:text-gray-500" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="collection">Collection</Label>
                    <Input 
                      id="collection" 
                      placeholder="Enter collection name" 
                      className="bg-black/20 border-white/20 text-white placeholder:text-gray-500" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input 
                      id="price" 
                      type="number" 
                      placeholder="0.00" 
                      className="bg-black/20 border-white/20 text-white placeholder:text-gray-500" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Game Category</Label>
                    <Select>
                      <SelectTrigger className="bg-black/20 border-white/20 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-dexplay-darkPurple border-white/20">
                        <SelectItem value="rpg">RPG</SelectItem>
                        <SelectItem value="action">Action</SelectItem>
                        <SelectItem value="strategy">Strategy</SelectItem>
                        <SelectItem value="racing">Racing</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="metaverse">Metaverse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="attributes">Attributes (comma separated)</Label>
                  <Input 
                    id="attributes" 
                    placeholder="Strength: 90, Speed: 75, Luck: 60" 
                    className="bg-black/20 border-white/20 text-white placeholder:text-gray-500" 
                  />
                </div>
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-dexplay-purple hover:bg-dexplay-brightPurple"
                  >
                    Upload and List NFT
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters and Search */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeIn}
          className="mb-8 flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1">
            <div className="relative">
              <Input
                placeholder="Search NFTs, collections, or creators"
                className="bg-black/20 border-white/20 text-white placeholder:text-gray-500 pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <FilterIcon className="h-5 w-5 text-gray-400" />
            <span className="text-gray-400 text-sm">Filter:</span>
          </div>

          <Tabs 
            defaultValue="all" 
            value={category} 
            onValueChange={setCategory}
            className="flex-shrink-0"
          >
            <TabsList className="bg-black/40 border border-white/10">
              <TabsTrigger value="all" className="data-[state=active]:bg-dexplay-purple text-sm">All</TabsTrigger>
              <TabsTrigger value="rpg" className="data-[state=active]:bg-dexplay-purple text-sm">RPG</TabsTrigger>
              <TabsTrigger value="action" className="data-[state=active]:bg-dexplay-purple text-sm">Action</TabsTrigger>
              <TabsTrigger value="strategy" className="data-[state=active]:bg-dexplay-purple text-sm">Strategy</TabsTrigger>
              <TabsTrigger value="racing" className="data-[state=active]:bg-dexplay-purple text-sm">Racing</TabsTrigger>
              <TabsTrigger value="metaverse" className="data-[state=active]:bg-dexplay-purple text-sm">Metaverse</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* NFT Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredNFTs.map((nft) => (
            <motion.div key={nft.id} variants={fadeIn}>
              <NFTOfferCard
                id={nft.id}
                name={nft.name}
                collection={nft.collection}
                price={nft.price}
                currency={nft.currency}
                image={nft.image}
                rarity={nft.rarity}
                seller={nft.seller}
                attributes={nft.attributes}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredNFTs.length === 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="py-16 text-center"
          >
            <ImageIcon className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl text-white font-medium">No NFTs Found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
