
import { useState } from "react";
import { MainNavbar } from "@/components/MainNavbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  PieChart,
  LineChart,
  TrendingUp,
  Gamepad2,
  Wallet,
  Users,
  Star,
  Image as ImageIcon,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Dashboard() {
  const [activeMode, setActiveMode] = useState("creator");

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

  const creatorStats = [
    { title: "Total Earnings", value: "12,450", unit: "SOL", change: "+5.4%", isPositive: true },
    { title: "Active Viewers", value: "8,273", unit: "", change: "+12.3%", isPositive: true },
    { title: "Stream Hours", value: "426", unit: "hrs", change: "-2.1%", isPositive: false },
    { title: "Engagement Rate", value: "18.7", unit: "%", change: "+3.5%", isPositive: true },
  ];

  const traderStats = [
    { title: "Portfolio Value", value: "38,750", unit: "SOL", change: "+8.2%", isPositive: true },
    { title: "Active Stakes", value: "12,600", unit: "SOL", change: "+4.7%", isPositive: true },
    { title: "NFTs Owned", value: "17", unit: "", change: "+2", isPositive: true },
    { title: "Trading Volume", value: "5,432", unit: "SOL", change: "-1.3%", isPositive: false },
  ];

  const recentStreams = [
    { id: 1, title: "Solana Speedrun Tournament", viewers: 1245, earnings: 342, date: "2025-05-02" },
    { id: 2, title: "Crypto Gaming Weekly", viewers: 876, earnings: 198, date: "2025-05-01" },
    { id: 3, title: "DexPlay Staking Tutorial", viewers: 1532, earnings: 412, date: "2025-04-29" },
    { id: 4, title: "NFT Trading Masterclass", viewers: 943, earnings: 267, date: "2025-04-27" },
  ];

  const recentTrades = [
    { id: 1, token: "DPLAY", type: "Buy", amount: 1500, price: 2.4, date: "2025-05-03" },
    { id: 2, token: "SGEM", type: "Sell", amount: 800, price: 0.85, date: "2025-05-02" },
    { id: 3, token: "ATLAS", type: "Buy", amount: 2000, price: 1.2, date: "2025-05-01" },
    { id: 4, token: "SOL", type: "Buy", amount: 10, price: 146.8, date: "2025-04-30" },
  ];

  const stakedTokens = [
    { token: "DPLAY", amount: 5000, apy: 18.5, value: 12500 },
    { token: "SOL", amount: 25, apy: 7.2, value: 3670 },
    { token: "SGEM", amount: 12500, apy: 14.8, value: 10625 },
  ];

  return (
    <div className="min-h-screen bg-dexplay-darkPurple relative overflow-hidden">
      <AnimatedBackground />
      <MainNavbar />
      
      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-gray-400">Manage your creator and trading activities</p>
          </div>

          <Tabs 
            defaultValue="creator" 
            value={activeMode} 
            onValueChange={setActiveMode}
            className="mt-4 md:mt-0"
          >
            <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-white/10">
              <TabsTrigger value="creator" className="data-[state=active]:bg-dexplay-purple">
                <Gamepad2 className="h-4 w-4 mr-2" />
                Creator Mode
              </TabsTrigger>
              <TabsTrigger value="trader" className="data-[state=active]:bg-dexplay-purple">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trader Mode
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Creator Mode Content */}
        {activeMode === "creator" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Stats Overview */}
            <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {creatorStats.map((stat, index) => (
                <Card key={index} className="bg-black/20 backdrop-blur-sm border border-white/10">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                        <div className="flex items-baseline">
                          <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                          {stat.unit && <span className="ml-1 text-gray-400 text-sm">{stat.unit}</span>}
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${stat.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {stat.change}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Charts and Recent Streams */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <motion.div variants={fadeIn} className="lg:col-span-2">
                <Card className="bg-black/20 backdrop-blur-sm border border-white/10 h-full">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
                    <CardTitle className="text-lg text-white">Earnings Overview</CardTitle>
                    <LineChart className="h-5 w-5 text-gray-400" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="w-full h-full relative">
                        {/* Chart placeholder - would use recharts here */}
                        <div className="absolute bottom-0 left-0 w-full">
                          <div className="flex justify-between">
                            <div className="h-[180px] w-8 bg-gradient-to-t from-dexplay-purple to-transparent rounded-sm"></div>
                            <div className="h-[120px] w-8 bg-gradient-to-t from-dexplay-purple to-transparent rounded-sm"></div>
                            <div className="h-[220px] w-8 bg-gradient-to-t from-dexplay-purple to-transparent rounded-sm"></div>
                            <div className="h-[140px] w-8 bg-gradient-to-t from-dexplay-purple to-transparent rounded-sm"></div>
                            <div className="h-[190px] w-8 bg-gradient-to-t from-dexplay-purple to-transparent rounded-sm"></div>
                            <div className="h-[240px] w-8 bg-gradient-to-t from-dexplay-purple to-transparent rounded-sm"></div>
                            <div className="h-[160px] w-8 bg-gradient-to-t from-dexplay-purple to-transparent rounded-sm"></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <div>Apr 28</div>
                            <div>Apr 29</div>
                            <div>Apr 30</div>
                            <div>May 1</div>
                            <div>May 2</div>
                            <div>May 3</div>
                            <div>May 4</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={fadeIn}>
                <Card className="bg-black/20 backdrop-blur-sm border border-white/10 h-full">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
                    <CardTitle className="text-lg text-white">Recent Streams</CardTitle>
                    <Gamepad2 className="h-5 w-5 text-gray-400" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {recentStreams.map((stream) => (
                        <div key={stream.id} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                            <div className="text-white font-medium truncate max-w-[70%]">{stream.title}</div>
                            <div className="text-gray-400 text-xs">{stream.date}</div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center text-gray-400">
                              <Users className="h-3 w-3 mr-1" />
                              {stream.viewers.toLocaleString()}
                            </div>
                            <div className="text-dexplay-purple font-medium">{stream.earnings} SOL</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Audience Insights */}
            <motion.div variants={fadeIn}>
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10 mb-8">
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
                  <CardTitle className="text-lg text-white">Audience Insights</CardTitle>
                  <Users className="h-5 w-5 text-gray-400" />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Age Group</span>
                        <span className="text-xs text-white">18-24</span>
                      </div>
                      <Progress value={65} className="h-2 bg-white/10" indicatorClassName="bg-dexplay-purple" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>25-34: 22%</span>
                        <span>35+: 13%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Platform</span>
                        <span className="text-xs text-white">Mobile</span>
                      </div>
                      <Progress value={58} className="h-2 bg-white/10" indicatorClassName="bg-dexplay-purple" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Desktop: 32%</span>
                        <span>Tablet: 10%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Watch Time</span>
                        <span className="text-xs text-white">15-30 mins</span>
                      </div>
                      <Progress value={42} className="h-2 bg-white/10" indicatorClassName="bg-dexplay-purple" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0-15 mins: 38%</span>
                        <span>30+ mins: 20%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Engagement</span>
                        <span className="text-xs text-white">Comments</span>
                      </div>
                      <Progress value={70} className="h-2 bg-white/10" indicatorClassName="bg-dexplay-purple" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Likes: 20%</span>
                        <span>Shares: 10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Button className="bg-dexplay-purple hover:bg-dexplay-brightPurple text-white">
                <Upload className="h-4 w-4 mr-2" />
                Start New Stream
              </Button>
              <Button variant="outline" className="border-dexplay-purple text-dexplay-purple hover:bg-dexplay-purple/20">
                <ImageIcon className="h-4 w-4 mr-2" />
                Upload Content
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Trader Mode Content */}
        {activeMode === "trader" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Stats Overview */}
            <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {traderStats.map((stat, index) => (
                <Card key={index} className="bg-black/20 backdrop-blur-sm border border-white/10">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-400 text-sm">{stat.title}</p>
                        <div className="flex items-baseline">
                          <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                          {stat.unit && <span className="ml-1 text-gray-400 text-sm">{stat.unit}</span>}
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${stat.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {stat.change}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Portfolio and Recent Trades */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <motion.div variants={fadeIn} className="lg:col-span-2">
                <Card className="bg-black/20 backdrop-blur-sm border border-white/10 h-full">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
                    <CardTitle className="text-lg text-white">Portfolio Distribution</CardTitle>
                    <PieChart className="h-5 w-5 text-gray-400" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[300px] flex items-center justify-center">
                      {/* Chart placeholder */}
                      <div className="relative h-52 w-52">
                        <div className="absolute inset-0 rounded-full border-[16px] border-t-dexplay-purple border-r-dexplay-brightPurple border-b-blue-500 border-l-indigo-500 rotate-45"></div>
                        <div className="absolute inset-8 bg-dexplay-darkPurple rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">38,750 SOL</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-dexplay-purple rounded-full"></div>
                        <span className="text-sm text-gray-400">DPLAY (48%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-dexplay-brightPurple rounded-full"></div>
                        <span className="text-sm text-gray-400">SOL (32%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-400">SGEM (15%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                        <span className="text-sm text-gray-400">Others (5%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={fadeIn}>
                <Card className="bg-black/20 backdrop-blur-sm border border-white/10 h-full">
                  <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
                    <CardTitle className="text-lg text-white">Recent Trades</CardTitle>
                    <TrendingUp className="h-5 w-5 text-gray-400" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {recentTrades.map((trade) => (
                        <div key={trade.id} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center">
                              <Badge className={`mr-2 ${trade.type === 'Buy' ? 'bg-green-500/30 text-green-400 hover:bg-green-500/40' : 'bg-red-500/30 text-red-400 hover:bg-red-500/40'}`}>
                                {trade.type}
                              </Badge>
                              <span className="text-white font-medium">{trade.token}</span>
                            </div>
                            <div className="text-gray-400 text-xs">{trade.date}</div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="text-gray-400">{trade.amount.toLocaleString()} tokens</div>
                            <div className="text-dexplay-purple font-medium">${trade.price.toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Staking Overview */}
            <motion.div variants={fadeIn}>
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10 mb-8">
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
                  <CardTitle className="text-lg text-white">Staked Tokens</CardTitle>
                  <Wallet className="h-5 w-5 text-gray-400" />
                </CardHeader>
                <CardContent className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-gray-400">Token</TableHead>
                        <TableHead className="text-gray-400">Amount</TableHead>
                        <TableHead className="text-gray-400">APY</TableHead>
                        <TableHead className="text-gray-400 text-right">Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stakedTokens.map((token, index) => (
                        <TableRow key={index} className="border-white/10">
                          <TableCell className="font-medium text-white">{token.token}</TableCell>
                          <TableCell>{token.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-green-400">{token.apy}%</TableCell>
                          <TableCell className="text-right">{token.value.toLocaleString()} SOL</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>

            {/* NFT Portfolio Preview */}
            <motion.div variants={fadeIn} className="mb-8">
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-6 px-6">
                  <CardTitle className="text-lg text-white">NFT Portfolio</CardTitle>
                  <ImageIcon className="h-5 w-5 text-gray-400" />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="relative group">
                        <div className="aspect-square bg-gradient-to-br from-dexplay-purple/30 to-dexplay-brightPurple/30 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ImageIcon className="h-10 w-10 text-white/50" />
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="text-white text-sm font-medium">CryptoWarrior #{item}</div>
                          <div className="text-gray-400 text-xs">Game: Ethernal Clash</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-6">
                    <Button variant="outline" className="border-dexplay-purple text-dexplay-purple hover:bg-dexplay-purple/20">
                      View All NFTs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Button className="bg-dexplay-purple hover:bg-dexplay-brightPurple text-white">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trade Tokens
              </Button>
              <Button variant="outline" className="border-dexplay-purple text-dexplay-purple hover:bg-dexplay-purple/20">
                <Star className="h-4 w-4 mr-2" />
                Stake Tokens
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
