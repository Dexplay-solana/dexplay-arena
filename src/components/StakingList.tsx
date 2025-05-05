
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";
import { Coins, Lock, LockOpen, TrendingUp } from "lucide-react";

// Mock data for demonstration
const STAKING_TOKENS = [
  {
    id: "dio",
    name: "DIO",
    fullName: "Decimated",
    icon: "🎮",
    price: 5.32,
    apy: 12.5,
    totalStaked: 1235621,
    minStake: 10,
  },
  {
    id: "aury",
    name: "AURY",
    fullName: "Aurory",
    icon: "🌟",
    price: 0.1155,
    apy: 8.2,
    totalStaked: 982145,
    minStake: 100,
  },
  {
    id: "dfl",
    name: "DFL",
    fullName: "DeFi Land",
    icon: "🌾",
    price: 0.0001941,
    apy: 15.7,
    totalStaked: 456213000,
    minStake: 10000,
  },
  {
    id: "gmt",
    name: "GMT",
    fullName: "STEPN",
    icon: "👟",
    price: 0.05509,
    apy: 7.3,
    totalStaked: 3214569,
    minStake: 100,
  },
  {
    id: "racefi",
    name: "RACEFI",
    fullName: "RaceFi",
    icon: "🏎️",
    price: 0.0006672,
    apy: 19.2,
    totalStaked: 215698000,
    minStake: 5000,
  },
  {
    id: "cave",
    name: "CAVE",
    fullName: "Minecraft",
    icon: "🏔️",
    price: 0.009654,
    apy: 11.8,
    totalStaked: 784125,
    minStake: 500,
  },
];

export function StakingList() {
  const [activeTab, setActiveTab] = useState("available");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedToken, setSelectedToken] = useState(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakeDuration, setStakeDuration] = useState("3w");
  const [isStaking, setIsStaking] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [stakingPositions, setStakingPositions] = useState([]);
  
  // Filter tokens based on search query
  const filteredTokens = STAKING_TOKENS.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    token.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate APY based on staking duration
  const calculateAPY = (baseApy, duration) => {
    switch (duration) {
      case "3w": return baseApy;
      case "6w": return baseApy * 1.25;
      case "2m": return baseApy * 1.5;
      default: return baseApy;
    }
  };
  
  // Handle staking submission
  const handleStake = () => {
    if (!selectedToken) return;
    
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (parseFloat(stakeAmount) < selectedToken.minStake) {
      toast.error(`Minimum stake amount is ${selectedToken.minStake} ${selectedToken.name}`);
      return;
    }
    
    setIsStaking(true);
    
    // Simulate API call
    setTimeout(() => {
      const now = new Date();
      let unlockDate = new Date(now);
      
      if (stakeDuration === "3w") {
        unlockDate.setDate(now.getDate() + 21);
      } else if (stakeDuration === "6w") {
        unlockDate.setDate(now.getDate() + 42);
      } else if (stakeDuration === "2m") {
        unlockDate.setMonth(now.getMonth() + 2);
      }
      
      const newPosition = {
        id: `stake-${Date.now()}`,
        token: selectedToken,
        amount: parseFloat(stakeAmount),
        value: parseFloat(stakeAmount) * selectedToken.price,
        apy: calculateAPY(selectedToken.apy, stakeDuration),
        stakedAt: now.toISOString(),
        unlockDate: unlockDate.toISOString(),
        duration: stakeDuration,
      };
      
      setStakingPositions([...stakingPositions, newPosition]);
      toast.success("Tokens staked successfully!");
      setIsStaking(false);
      setIsDialogOpen(false);
      setStakeAmount("");
    }, 2000);
  };
  
  // Handle unstaking
  const handleUnstake = (positionId) => {
    // Find the position
    const position = stakingPositions.find(p => p.id === positionId);
    if (!position) return;
    
    // Check if the position is locked
    const now = new Date();
    const unlockDate = new Date(position.unlockDate);
    
    if (now < unlockDate) {
      toast.warning("This position is still locked until " + unlockDate.toLocaleDateString());
      return;
    }
    
    // Remove the position
    const updatedPositions = stakingPositions.filter(p => p.id !== positionId);
    setStakingPositions(updatedPositions);
    toast.success(`${position.amount} ${position.token.name} unstaked successfully!`);
  };
  
  // Format duration label
  const formatDuration = (duration) => {
    switch (duration) {
      case "3w": return "3 Weeks";
      case "6w": return "6 Weeks";
      case "2m": return "2 Months";
      default: return duration;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <Input
            placeholder="Search tokens..."
            className="bg-black/40 border-white/10 pl-9 w-full sm:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 absolute left-3 top-3 text-gray-400"
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="bg-black/40 border border-white/10">
            <TabsTrigger value="available">Available Pools</TabsTrigger>
            <TabsTrigger value="positions">My Positions</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TabsContent value="available" className="mt-0">
        <Card className="bg-black/20 backdrop-blur-sm border border-white/10 p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="text-gray-400">Token</TableHead>
                <TableHead className="text-gray-400 text-right">Price</TableHead>
                <TableHead className="text-gray-400 text-right">APY</TableHead>
                <TableHead className="text-gray-400 text-right">Total Staked</TableHead>
                <TableHead className="text-gray-400 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTokens.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-400">
                    No tokens found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTokens.map((token) => (
                  <TableRow key={token.id} className="border-white/10">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{token.icon}</span>
                        <div>
                          <div className="font-medium text-white">{token.name}</div>
                          <div className="text-xs text-gray-400">{token.fullName}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${token.price.toFixed(token.price < 0.01 ? 6 : 4)}
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-400">
                      {token.apy.toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-right text-gray-400">
                      {token.totalStaked > 1000000
                        ? `${(token.totalStaked / 1000000).toFixed(2)}M`
                        : token.totalStaked > 1000
                        ? `${(token.totalStaked / 1000).toFixed(2)}K`
                        : token.totalStaked}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog open={isDialogOpen && selectedToken?.id === token.id} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) setSelectedToken(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-dexplay-purple/20 hover:bg-dexplay-purple/30 border-dexplay-purple/50 text-white"
                            onClick={() => setSelectedToken(token)}
                          >
                            Stake
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-dexplay-darkPurple border-white/10 text-white">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold">
                              Stake {token.name} ({token.fullName})
                            </DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label className="text-sm text-gray-400">Stake Amount</label>
                              <div className="relative">
                                <Input 
                                  type="number" 
                                  placeholder={`Min: ${token.minStake}`}
                                  className="bg-black/40 border-white/10"
                                  value={stakeAmount}
                                  onChange={(e) => setStakeAmount(e.target.value)}
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                  <span className="text-gray-400">{token.name}</span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-400">
                                Estimated value: ${(parseFloat(stakeAmount || "0") * token.price).toFixed(2)}
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <label className="text-sm text-gray-400">Lock Duration</label>
                              <Select value={stakeDuration} onValueChange={setStakeDuration}>
                                <SelectTrigger className="bg-black/40 border-white/10">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-dexplay-darkPurple border-white/10">
                                  <SelectItem value="3w">3 Weeks - {token.apy.toFixed(1)}% APY</SelectItem>
                                  <SelectItem value="6w">6 Weeks - {(token.apy * 1.25).toFixed(1)}% APY</SelectItem>
                                  <SelectItem value="2m">2 Months - {(token.apy * 1.5).toFixed(1)}% APY</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="bg-black/30 p-4 rounded-md space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-400">APY</span>
                                <span className="text-green-400">
                                  {calculateAPY(token.apy, stakeDuration).toFixed(1)}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Lock Period</span>
                                <span className="text-white">{formatDuration(stakeDuration)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Unlock Date</span>
                                <span className="text-white">
                                  {new Date(
                                    stakeDuration === "3w"
                                      ? Date.now() + 21 * 24 * 60 * 60 * 1000
                                      : stakeDuration === "6w"
                                      ? Date.now() + 42 * 24 * 60 * 60 * 1000
                                      : Date.now() + 60 * 24 * 60 * 60 * 1000
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end gap-3">
                            <Button 
                              variant="outline" 
                              onClick={() => setIsDialogOpen(false)}
                              className="border-white/10 bg-black/40"
                            >
                              Cancel
                            </Button>
                            <Button 
                              className="bg-dexplay-purple hover:bg-dexplay-brightPurple"
                              disabled={isStaking || !stakeAmount || parseFloat(stakeAmount) < token.minStake}
                              onClick={handleStake}
                            >
                              {isStaking ? (
                                <span className="flex items-center gap-2">
                                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-white"></span>
                                  Processing...
                                </span>
                              ) : (
                                <span className="flex items-center gap-2">
                                  <Lock className="h-4 w-4" />
                                  Stake {token.name}
                                </span>
                              )}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </TabsContent>
      
      <TabsContent value="positions" className="mt-0">
        <Card className="bg-black/20 backdrop-blur-sm border border-white/10 p-0">
          {stakingPositions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <Coins className="h-12 w-12 text-gray-500 mb-3" />
              <h3 className="text-white text-lg font-medium">No Staking Positions</h3>
              <p className="text-gray-400 mt-1 max-w-md">
                You don't have any active staking positions. Start staking your tokens to earn passive rewards.
              </p>
              <Button 
                className="mt-4 bg-dexplay-purple hover:bg-dexplay-brightPurple"
                onClick={() => setActiveTab("available")}
              >
                Explore Staking Options
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-white/10">
                  <TableHead className="text-gray-400">Token</TableHead>
                  <TableHead className="text-gray-400 text-right">Amount</TableHead>
                  <TableHead className="text-gray-400 text-right">Value</TableHead>
                  <TableHead className="text-gray-400 text-right">APY</TableHead>
                  <TableHead className="text-gray-400 text-right">Unlock Date</TableHead>
                  <TableHead className="text-gray-400 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stakingPositions.map((position) => {
                  const now = new Date();
                  const unlockDate = new Date(position.unlockDate);
                  const isLocked = now < unlockDate;
                  
                  return (
                    <TableRow key={position.id} className="border-white/10">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{position.token.icon}</span>
                          <div>
                            <div className="font-medium text-white">{position.token.name}</div>
                            <div className="text-xs text-gray-400">{position.token.fullName}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {position.amount.toLocaleString()} {position.token.name}
                      </TableCell>
                      <TableCell className="text-right text-white">
                        ${position.value.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-green-400">
                        {position.apy.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right text-gray-400">
                        {new Date(position.unlockDate).toLocaleDateString()}
                        <div className="text-xs">
                          {formatDuration(position.duration)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={
                            isLocked
                              ? "bg-gray-500/20 hover:bg-gray-500/30 border-gray-500/50 text-gray-400 cursor-not-allowed"
                              : "bg-green-500/20 hover:bg-green-500/30 border-green-500/50 text-white"
                          }
                          disabled={isLocked}
                          onClick={() => handleUnstake(position.id)}
                        >
                          {isLocked ? (
                            <Lock className="h-3 w-3 mr-1 inline" />
                          ) : (
                            <LockOpen className="h-3 w-3 mr-1 inline" />
                          )}
                          {isLocked ? "Locked" : "Unstake"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Card>
      </TabsContent>
    </div>
  );
}
