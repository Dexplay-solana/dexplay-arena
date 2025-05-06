
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
          <span className="gradient-text">Solana Token Exchange</span>
        </h1>
        <p className="text-gray-400 mb-6">
          Swap tokens within the Solana ecosystem and between game environments
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
          <h2 className="text-2xl font-bold text-white mb-4">About Solana Token Exchange</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-dexplay-purple">Fast Token Swaps</h3>
              <p className="text-gray-400">
                Exchange tokens within the Solana ecosystem with low fees and lightning-fast transaction times, typically under 2 seconds.
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
                All operations are secured by Solana's high-performance blockchain and multi-signature protocols to ensure the safety of your assets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
