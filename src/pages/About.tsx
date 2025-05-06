
import { MainNavbar } from "@/components/MainNavbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
  Gamepad2, 
  Coins, 
  TrendingUp, 
  Users, 
  CircleUser,
  Award
} from "lucide-react";

export default function About() {
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
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-dexplay-darkPurple relative overflow-hidden">
      <AnimatedBackground />
      <MainNavbar />
      
      <div className="container mx-auto py-12 px-4 relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">DexPlay</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            The Future of Gaming Economy on Solana
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {/* Left Column */}
          <motion.div variants={fadeIn} className="flex flex-col gap-6">
            <Card className="glass-effect overflow-hidden border-white/10">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-dexplay-purple/20">
                    <Gamepad2 className="h-8 w-8 text-dexplay-purple" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Game Tokenization</h2>
                </div>
                <p className="text-white/70 mb-4">
                  DexPlay enables game developers to tokenize their platforms, creating
                  sustainable play-to-earn economies that reward players with real value
                  while they enjoy their favorite games.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                    Tokenize Games
                  </Badge>
                  <Badge variant="outline" className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                    Seamless Integration
                  </Badge>
                  <Badge variant="outline" className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                    Player Rewards
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-effect overflow-hidden border-white/10">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-dexplay-purple/20">
                    <Coins className="h-8 w-8 text-dexplay-purple" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Staking & P2P Trading</h2>
                </div>
                <p className="text-white/70 mb-4">
                  Stake gaming tokens to earn passive income or trade game assets directly
                  with other players through our secure P2P marketplace for both tokens and NFTs.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                    Token Staking
                  </Badge>
                  <Badge variant="outline" className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                    NFT Staking
                  </Badge>
                  <Badge variant="outline" className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                    P2P Trading
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Right Column */}
          <motion.div variants={fadeIn} className="flex flex-col gap-6">
            <Card className="glass-effect overflow-hidden border-white/10">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-dexplay-purple/20">
                    <TrendingUp className="h-8 w-8 text-dexplay-purple" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">DEX Trading Platform</h2>
                </div>
                <p className="text-white/70 mb-4">
                  Trade gaming tokens on our specialized decentralized exchange built on Solana,
                  featuring high throughput, low fees, and a focus on gaming economies.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                    Low Fees
                  </Badge>
                  <Badge variant="outline" className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                    High Liquidity
                  </Badge>
                  <Badge variant="outline" className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                    Solana Speed
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-effect overflow-hidden border-white/10">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-dexplay-purple/20">
                    <Award className="h-8 w-8 text-dexplay-purple" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Cross-Chain Gaming</h2>
                </div>
                <p className="text-white/70 mb-4">
                  Access gaming assets across multiple blockchains through our Solana-based
                  cross-chain solutions, expanding the ecosystem and opportunities for players.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                    NFT Bridge
                  </Badge>
                  <Badge variant="outline" className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                    Token Bridge
                  </Badge>
                  <Badge variant="outline" className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                    Unified Gaming
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Tabs Section */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <Tabs defaultValue="ecosystem" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/10 mb-8">
              <TabsTrigger value="ecosystem" className="data-[state=active]:bg-dexplay-purple">Ecosystem</TabsTrigger>
              <TabsTrigger value="technology" className="data-[state=active]:bg-dexplay-purple">Technology</TabsTrigger>
              <TabsTrigger value="roadmap" className="data-[state=active]:bg-dexplay-purple">Roadmap</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ecosystem" className="glass-effect rounded-lg border border-white/10 p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Gaming Ecosystem</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-black/40 border-white/10">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-white mb-2">Game Developers</h4>
                    <p className="text-white/70">
                      Access tools to tokenize games, create in-game economies, and connect with players who value digital ownership.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-black/40 border-white/10">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-white mb-2">Players</h4>
                    <p className="text-white/70">
                      Earn while you play, trade gaming assets, and build a portfolio of gaming investments across multiple titles.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-black/40 border-white/10">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-white mb-2">Investors</h4>
                    <p className="text-white/70">
                      Discover early opportunities in gaming tokens based on player engagement, development milestones, and market trends.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="technology" className="glass-effect rounded-lg border border-white/10 p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Solana Technology</h3>
              <p className="text-white/70 mb-6">
                DexPlay is built on Solana's high-performance blockchain, enabling:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-dexplay-purple/20 flex items-center justify-center">
                    <span className="text-dexplay-purple font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Lightning Fast Transactions</h4>
                    <p className="text-white/70">65,000 transactions per second with sub-second finality</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-dexplay-purple/20 flex items-center justify-center">
                    <span className="text-dexplay-purple font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Minimal Fees</h4>
                    <p className="text-white/70">Fractions of a cent per transaction</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-dexplay-purple/20 flex items-center justify-center">
                    <span className="text-dexplay-purple font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Energy Efficient</h4>
                    <p className="text-white/70">Environmentally friendly Proof-of-Stake consensus</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-dexplay-purple/20 flex items-center justify-center">
                    <span className="text-dexplay-purple font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Composable Ecosystem</h4>
                    <p className="text-white/70">Seamless integration with existing Solana applications</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="roadmap" className="glass-effect rounded-lg border border-white/10 p-6">
              <h3 className="text-2xl font-bold text-white mb-4">DexPlay Roadmap</h3>
              <div className="relative pl-10 before:content-[''] before:absolute before:left-3 before:top-2 before:w-1 before:h-[calc(100%-20px)] before:bg-dexplay-purple/30">
                <div className="mb-8 relative before:content-[''] before:absolute before:w-6 before:h-6 before:rounded-full before:bg-dexplay-purple before:left-[-30px] before:top-1">
                  <h4 className="text-xl font-bold text-white">Q2 2025: Platform Launch</h4>
                  <p className="text-white/70">Core DEX functionality, initial token listings, staking pools</p>
                </div>
                <div className="mb-8 relative before:content-[''] before:absolute before:w-6 before:h-6 before:rounded-full before:bg-dexplay-purple before:left-[-30px] before:top-1">
                  <h4 className="text-xl font-bold text-white">Q3 2025: P2P Marketplace</h4>
                  <p className="text-white/70">Trading for in-game assets, token swaps between players, NFT P2P market</p>
                </div>
                <div className="mb-8 relative before:content-[''] before:absolute before:w-6 before:h-6 before:rounded-full before:bg-dexplay-purple before:left-[-30px] before:top-1">
                  <h4 className="text-xl font-bold text-white">Q4 2025: Developer Tools</h4>
                  <p className="text-white/70">Game tokenization SDK, analytics dashboard, economy simulation tools</p>
                </div>
                <div className="relative before:content-[''] before:absolute before:w-6 before:h-6 before:rounded-full before:bg-dexplay-purple before:left-[-30px] before:top-1">
                  <h4 className="text-xl font-bold text-white">Q1 2026: Cross-Chain Integration</h4>
                  <p className="text-white/70">Expansion to additional blockchain bridges, multi-chain asset support</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
        >
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-4xl font-bold text-dexplay-purple mb-2">15+</h3>
              <p className="text-white">Games Tokenized</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-4xl font-bold text-dexplay-purple mb-2">100k+</h3>
              <p className="text-white">Active Players</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-4xl font-bold text-dexplay-purple mb-2">$5M+</h3>
              <p className="text-white">Trading Volume</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-white/10">
            <CardContent className="p-6">
              <h3 className="text-4xl font-bold text-dexplay-purple mb-2">4</h3>
              <p className="text-white">Blockchains</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
