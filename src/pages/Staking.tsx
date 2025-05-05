
import { useState } from "react";
import { MainNavbar } from "@/components/MainNavbar";
import { StakingList } from "@/components/StakingList";
import { TrendingUp } from "lucide-react";

export default function Staking() {
  const [totalStakedValue, setTotalStakedValue] = useState(0); // This would normally be fetched from an API
  
  return (
    <div className="min-h-screen bg-dexplay-darkPurple">
      <MainNavbar />
      
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-white mb-2">
          <span className="gradient-text">Token Staking</span>
        </h1>
        <p className="text-gray-400 mb-6">
          Stake game tokens to earn yield and support the gaming ecosystem
        </p>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400">Total Value Locked</h3>
              <div className="bg-dexplay-purple/20 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-dexplay-purple" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mt-2">$132,456,789</div>
            <div className="text-green-400 text-sm mt-1">+5.7% past 24h</div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400">Average APY</h3>
              <div className="bg-dexplay-purple/20 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-dexplay-purple" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mt-2">12.4%</div>
            <div className="text-green-400 text-sm mt-1">+0.3% past 24h</div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-400">Your Staked Value</h3>
              <div className="bg-dexplay-purple/20 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-dexplay-purple" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mt-2">${totalStakedValue.toLocaleString()}</div>
            <div className="text-sm text-gray-400 mt-1">Across all tokens</div>
          </div>
        </div>
        
        {/* Staking List */}
        <div className="mb-10">
          <StakingList />
        </div>
        
        {/* Info Section */}
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">About Staking</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-dexplay-purple">Flexible Durations</h3>
              <p className="text-gray-400">
                Choose between 3-week, 6-week, or 2-month staking periods. Longer staking periods yield higher returns.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-dexplay-purple">Compound Rewards</h3>
              <p className="text-gray-400">
                Rewards are automatically compounded to maximize your yield. Stake once and watch your assets grow.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-dexplay-purple">Support Game Ecosystems</h3>
              <p className="text-gray-400">
                By staking game tokens, you help provide liquidity to the ecosystem and earn rewards for your contribution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
