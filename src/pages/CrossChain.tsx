
import { MainNavbar } from "@/components/MainNavbar";
import { CrossChainSwap } from "@/components/CrossChainSwap";
import { NFTSwapCard } from "@/components/NFTSwapCard";

export default function CrossChain() {
  // Mock data for NFT swaps
  const nftSwap = {
    sourceNFT: {
      id: "nft-123",
      name: "Cosmic Fighter #7845",
      collection: "Cosmic Fighters",
      image: "https://placehold.co/400x400/9b87f5/FFFFFF/png?text=Cosmic+Fighter",
      game: "StarQuest",
      attributes: [
        { trait_type: "Attack", value: "87" },
        { trait_type: "Defense", value: "65" },
        { trait_type: "Speed", value: "92" },
      ],
    },
    targetNFT: {
      id: "nft-456",
      name: "MoonBeast #1234",
      collection: "Moon Beasts",
      image: "https://placehold.co/400x400/8B5CF6/FFFFFF/png?text=Moon+Beast",
      game: "Lunar Legends",
      attributes: [
        { trait_type: "Power", value: "84" },
        { trait_type: "Shield", value: "68" },
        { trait_type: "Agility", value: "90" },
      ],
    },
    compatibilityScore: 89,
  };

  return (
    <div className="min-h-screen bg-dexplay-darkPurple">
      <MainNavbar />
      
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-white mb-2">
          <span className="gradient-text">Cross-Chain Exchange</span>
        </h1>
        <p className="text-gray-400 mb-6">
          Swap tokens across different blockchains and game ecosystems
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CrossChainSwap />
          
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Cross-Game NFT Swap</h2>
            <p className="text-gray-400 mb-4">
              Convert your game NFTs across different game ecosystems while preserving attributes
            </p>
            <NFTSwapCard 
              sourceNFT={nftSwap.sourceNFT}
              targetNFT={nftSwap.targetNFT}
              compatibilityScore={nftSwap.compatibilityScore}
            />
          </div>
        </div>
        
        <div className="mt-12 bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">About Cross-Chain Exchange</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-dexplay-purple">Seamless Token Swaps</h3>
              <p className="text-gray-400">
                Exchange tokens across different blockchains with low fees and fast transaction times. Supporting Solana, Ethereum, Polygon, and more.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-dexplay-purple">Game Asset Portability</h3>
              <p className="text-gray-400">
                Transfer your in-game assets and NFTs between different game ecosystems while preserving their value and attributes.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-dexplay-purple">Secure Transactions</h3>
              <p className="text-gray-400">
                All cross-chain operations are secured by smart contracts and multi-signature protocols to ensure the safety of your assets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
