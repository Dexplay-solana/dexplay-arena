
import { useState, useEffect } from "react";
import { MainNavbar } from "@/components/MainNavbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

// Types
interface Player {
  id: string;
  rank: number;
  name: string;
  avatar: string;
  game: string;
  chain: string;
  tokenEarned: number;
  audience: number;
  staked: number;
  previousRank: number;
}

export default function Leaderboard() {
  const [leaderboardType, setLeaderboardType] = useState<"earnings" | "audience" | "staking">("earnings");
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly" | "alltime">("weekly");
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Generate mock data
  useEffect(() => {
    setIsLoading(true);
    
    // Mock player data
    const games = ["Decimated", "MixMob", "Mini Royale", "Aurory", "DeFi Land"];
    const chains = ["Solana", "Solana/ETH", "Solana/BNB", "Solana"];
    
    // Create the initial players array
    const initialPlayers: Player[] = Array.from({ length: 20 }).map((_, index) => {
      const randomGame = games[Math.floor(Math.random() * games.length)];
      const randomChain = chains[Math.floor(Math.random() * chains.length)];
      const randomTokens = Math.floor(Math.random() * 10000) + 500;
      const randomAudience = Math.floor(Math.random() * 15000) + 1000;
      const randomStaking = Math.floor(Math.random() * 50000) + 5000;
      
      return {
        id: `player-${index + 1}`,
        rank: index + 1,
        previousRank: index + 1,
        name: `Player${index + 1}`,
        avatar: `https://i.pravatar.cc/150?u=player${index + 1}`,
        game: randomGame,
        chain: randomChain,
        tokenEarned: randomTokens,
        audience: randomAudience,
        staked: randomStaking
      };
    });
    
    setPlayers(initialPlayers);
    setIsLoading(false);

    // Simulate rank changes every 30 seconds
    const interval = setInterval(() => {
      setPlayers(prevPlayers => {
        // Deep copy the players
        const newPlayers = JSON.parse(JSON.stringify(prevPlayers));
        
        // Update the rankings based on the selected leaderboard type
        const sortedPlayers = [...newPlayers].sort((a, b) => {
          if (leaderboardType === "audience") {
            return b.audience - a.audience;
          } else if (leaderboardType === "staking") {
            return b.staked - a.staked;
          } else {
            return b.tokenEarned - a.tokenEarned;
          }
        });
        
        // Store previous ranks before updating
        sortedPlayers.forEach(player => {
          const oldPlayer = newPlayers.find(p => p.id === player.id);
          if (oldPlayer) {
            player.previousRank = oldPlayer.rank;
          }
        });
        
        // Update ranks
        sortedPlayers.forEach((player, index) => {
          player.rank = index + 1;
        });
        
        // Simulate some changes to the metrics to make rankings dynamic
        sortedPlayers.forEach(player => {
          // Random changes to metrics
          const changeTokens = Math.floor(Math.random() * 500) - 200;
          const changeAudience = Math.floor(Math.random() * 800) - 300;
          const changeStake = Math.floor(Math.random() * 2000) - 800;
          
          player.tokenEarned = Math.max(100, player.tokenEarned + changeTokens);
          player.audience = Math.max(100, player.audience + changeAudience);
          player.staked = Math.max(1000, player.staked + changeStake);
        });
        
        return sortedPlayers;
      });
    }, 15000);
    
    return () => clearInterval(interval);
  }, [leaderboardType]); // Re-run when leaderboard type changes

  // Get ranking change status
  const getRankChange = (current: number, previous: number) => {
    if (current < previous) {
      return { status: "up", change: previous - current };
    } else if (current > previous) {
      return { status: "down", change: current - previous };
    }
    return { status: "same", change: 0 };
  };

  return (
    <div className="min-h-screen bg-dexplay-darkPurple relative overflow-hidden">
      <AnimatedBackground />
      <MainNavbar />
      
      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Player Leaderboard</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            Top performers across DexPlay gaming ecosystem, ranked by earnings, audience size, and staking volume
          </p>
        </div>
        
        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Tabs 
            value={leaderboardType} 
            onValueChange={(value) => setLeaderboardType(value as "earnings" | "audience" | "staking")}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 bg-black/40 border border-white/10">
              <TabsTrigger value="earnings" className="data-[state=active]:bg-dexplay-purple">
                Earnings
              </TabsTrigger>
              <TabsTrigger value="audience" className="data-[state=active]:bg-dexplay-purple">
                Audience
              </TabsTrigger>
              <TabsTrigger value="staking" className="data-[state=active]:bg-dexplay-purple">
                Staking
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Tabs 
            value={timeframe} 
            onValueChange={(value) => setTimeframe(value as "daily" | "weekly" | "monthly" | "alltime")}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 bg-black/40 border border-white/10">
              <TabsTrigger value="daily" className="data-[state=active]:bg-dexplay-purple">
                Daily
              </TabsTrigger>
              <TabsTrigger value="weekly" className="data-[state=active]:bg-dexplay-purple">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="data-[state=active]:bg-dexplay-purple">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="alltime" className="data-[state=active]:bg-dexplay-purple">
                All Time
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Leaderboard */}
        <Card className="glass-effect overflow-hidden border-white/10">
          <CardContent className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 bg-black/40">
                  <TableHead className="w-16 text-white">Rank</TableHead>
                  <TableHead className="text-white">Player</TableHead>
                  <TableHead className="text-white">Game</TableHead>
                  <TableHead className="text-white">Chain</TableHead>
                  <TableHead className="text-white text-right">
                    {leaderboardType === "earnings" && "Tokens Earned"}
                    {leaderboardType === "audience" && "Audience Size"}
                    {leaderboardType === "staking" && "Total Staked"}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-white/60">
                      Loading leaderboard data...
                    </TableCell>
                  </TableRow>
                ) : (
                  <AnimatePresence initial={false}>
                    {players.map((player) => {
                      const rankChange = getRankChange(player.rank, player.previousRank);
                      
                      return (
                        <motion.tr
                          key={player.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`border-white/5 hover:bg-white/5 ${player.rank <= 3 ? "bg-dexplay-purple/10" : ""}`}
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-1">
                              <span className={`
                                ${player.rank === 1 && "text-yellow-400"} 
                                ${player.rank === 2 && "text-gray-300"} 
                                ${player.rank === 3 && "text-amber-600"}
                                font-bold
                              `}>
                                {player.rank}
                              </span>
                              
                              {rankChange.status !== "same" && (
                                <span className={`text-xs ${rankChange.status === "up" ? "text-green-500" : "text-red-500"}`}>
                                  {rankChange.status === "up" ? "↑" : "↓"}{rankChange.change}
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 border-2 border-white/10">
                                <img src={player.avatar} alt={player.name} />
                              </Avatar>
                              <span className="font-medium text-white">{player.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-dexplay-purple/20 text-dexplay-purple border-none">
                              {player.game}
                            </Badge>
                          </TableCell>
                          <TableCell>{player.chain}</TableCell>
                          <TableCell className="text-right">
                            <span className="font-bold">
                              {leaderboardType === "earnings" && (
                                <>{player.tokenEarned.toLocaleString()} DEX</>
                              )}
                              {leaderboardType === "audience" && (
                                <>{player.audience.toLocaleString()} viewers</>
                              )}
                              {leaderboardType === "staking" && (
                                <>{player.staked.toLocaleString()} SOL</>
                              )}
                            </span>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="glass-effect border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-1">Total Players</h3>
              <p className="text-3xl font-bold text-dexplay-purple">12,456</p>
              <p className="text-white/60 text-sm mt-1">Across all tokenized games</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-1">Total Earnings</h3>
              <p className="text-3xl font-bold text-dexplay-purple">9.8M DEX</p>
              <p className="text-white/60 text-sm mt-1">Distributed to players this month</p>
            </CardContent>
          </Card>
          <Card className="glass-effect border-white/10">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-1">Staking TVL</h3>
              <p className="text-3xl font-bold text-dexplay-purple">46.3M SOL</p>
              <p className="text-white/60 text-sm mt-1">Locked in gaming ecosystem</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
