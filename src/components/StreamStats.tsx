
import { Progress } from "@/components/ui/progress";

interface StreamStatsProps {
  viewers: number;
  followers: number;
  tokenPrice: number;
  priceChange: number;
  stakedTotal: number;
  roi: number;
}

export function StreamStats({
  viewers = 1243,
  followers = 58500,
  tokenPrice = 5.32,
  priceChange = 7.8,
  stakedTotal = 25600,
  roi = 12.4
}: StreamStatsProps) {
  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-4">
      <h3 className="font-semibold text-white mb-3">Stream Stats</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">Current Viewers</p>
          <p className="font-semibold text-white text-lg">
            {viewers.toLocaleString()}
            <span className="text-xs text-green-500 ml-1">Live</span>
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-400">Followers</p>
          <p className="font-semibold text-white text-lg">{followers.toLocaleString()}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-400">Token Price</p>
          <div className="flex items-center">
            <p className="font-semibold text-white text-lg">${tokenPrice}</p>
            <span className={`text-xs ml-2 ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {priceChange >= 0 ? "+" : ""}{priceChange}%
            </span>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-400">Total Staked</p>
          <p className="font-semibold text-white text-lg">{stakedTotal.toLocaleString()} $DIO</p>
        </div>
      </div>
      
      <div className="mt-5">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm text-gray-400">ROI</p>
          <p className="text-sm text-green-500">{roi}%</p>
        </div>
        <Progress value={roi} className="h-2 bg-gray-800">
          <div className="h-full bg-gradient-to-r from-dexplay-purple to-dexplay-blue rounded-full" />
        </Progress>
      </div>
    </div>
  );
}
