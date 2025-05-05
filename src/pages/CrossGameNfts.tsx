
import { useState } from "react";
import { MainNavbar } from "@/components/MainNavbar";
import { NFTSwapCard } from "@/components/NFTSwapCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const nftPairs = [
  {
    id: "1",
    sourceNFT: {
      id: "src-1",
      name: "Aurory Pet #123",
      collection: "Aurory",
      image: "https://source.unsplash.com/random/300×300/?fantasy",
      game: "Aurory",
      attributes: [
        { trait_type: "Species", value: "Dragon" },
        { trait_type: "Attack", value: "87" },
        { trait_type: "Defense", value: "65" },
        { trait_type: "Speed", value: "92" },
      ],
    },
    targetNFT: {
      id: "tgt-1",
      name: "DeFi Land Tool #456",
      collection: "DeFi Land",
      image: "https://source.unsplash.com/random/300×300/?farm",
      game: "DeFi Land",
      attributes: [
        { trait_type: "Type", value: "Harvester" },
        { trait_type: "Power", value: "90" },
        { trait_type: "Shield", value: "60" },
        { trait_type: "Agility", value: "95" },
      ],
    },
    compatibilityScore: 87,
  },
  {
    id: "2",
    sourceNFT: {
      id: "src-2",
      name: "Star Atlas Ship #789",
      collection: "Star Atlas",
      image: "https://source.unsplash.com/random/300×300/?spaceship",
      game: "Star Atlas",
      attributes: [
        { trait_type: "Class", value: "Destroyer" },
        { trait_type: "Attack", value: "92" },
        { trait_type: "Defense", value: "78" },
        { trait_type: "Speed", value: "65" },
      ],
    },
    targetNFT: {
      id: "tgt-2",
      name: "Solana Monkey #234",
      collection: "Solana Monkey Business",
      image: "https://source.unsplash.com/random/300×300/?monkey",
      game: "MonkeyVerse",
      attributes: [
        { trait_type: "Species", value: "Golden" },
        { trait_type: "Power", value: "88" },
        { trait_type: "Shield", value: "82" },
        { trait_type: "Agility", value: "70" },
      ],
    },
    compatibilityScore: 78,
  },
  {
    id: "3",
    sourceNFT: {
      id: "src-3",
      name: "Genopets Spirit #345",
      collection: "Genopets",
      image: "https://source.unsplash.com/random/300×300/?spirit",
      game: "Genopets",
      attributes: [
        { trait_type: "Element", value: "Water" },
        { trait_type: "Attack", value: "75" },
        { trait_type: "Defense", value: "90" },
        { trait_type: "Speed", value: "85" },
      ],
    },
    targetNFT: {
      id: "tgt-3",
      name: "DexPlay Hero #678",
      collection: "DexPlay Heroes",
      image: "https://source.unsplash.com/random/300×300/?hero",
      game: "DexPlay",
      attributes: [
        { trait_type: "Class", value: "Mage" },
        { trait_type: "Power", value: "80" },
        { trait_type: "Shield", value: "85" },
        { trait_type: "Agility", value: "82" },
      ],
    },
    compatibilityScore: 85,
  },
  {
    id: "4",
    sourceNFT: {
      id: "src-4",
      name: "Cryowar Weapon #901",
      collection: "Cryowar",
      image: "https://source.unsplash.com/random/300×300/?weapon",
      game: "Cryowar",
      attributes: [
        { trait_type: "Type", value: "Sword" },
        { trait_type: "Attack", value: "95" },
        { trait_type: "Defense", value: "40" },
        { trait_type: "Speed", value: "75" },
      ],
    },
    targetNFT: {
      id: "tgt-4",
      name: "Frontier Shield #567",
      collection: "Star Atlas Frontier",
      image: "https://source.unsplash.com/random/300×300/?shield",
      game: "Star Atlas",
      attributes: [
        { trait_type: "Class", value: "Heavy" },
        { trait_type: "Power", value: "45" },
        { trait_type: "Shield", value: "98" },
        { trait_type: "Agility", value: "30" },
      ],
    },
    compatibilityScore: 62,
  },
];

export default function CrossGameNfts() {
  const [pairs, setPairs] = useState(nftPairs);

  return (
    <div className="min-h-screen bg-dexplay-darkPurple">
      <MainNavbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-4 md:mb-0">Cross-Game NFT Swapping</h1>
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
              <Link to="/p2p/nfts">NFT Marketplace</Link>
            </Button>
          </div>
        </div>
        
        <div className="bg-dexplay-darkPurple/60 border border-white/10 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-medium text-white mb-2">What is Cross-Game NFT Swapping?</h2>
          <p className="text-gray-300">
            Convert your NFTs between different Solana games while preserving their value and attributes. 
            Our metadata conversion logic ensures your in-game items maintain their utility across games.
          </p>
          <div className="mt-4 p-4 bg-gray-800/30 rounded-lg">
            <h3 className="text-white font-medium mb-2">How It Works:</h3>
            <ol className="list-decimal list-inside text-gray-300 space-y-2">
              <li>Connect your wallet to see your NFTs</li>
              <li>Select an NFT you want to swap</li>
              <li>Browse compatible NFTs from other games</li>
              <li>Review the attribute conversion preview</li>
              <li>Confirm the swap and receive your new NFT</li>
            </ol>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pairs.map((pair) => (
            <NFTSwapCard 
              key={pair.id}
              sourceNFT={pair.sourceNFT}
              targetNFT={pair.targetNFT}
              compatibilityScore={pair.compatibilityScore}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
