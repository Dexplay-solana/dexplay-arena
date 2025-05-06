
import { useState } from "react";
import { motion } from "framer-motion";
import { MainNavbar } from "@/components/MainNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Gamepad, Coins, Rocket, Trophy, Shield, Zap, Star } from "lucide-react";
import { TokenCreationHero } from "@/components/TokenCreationHero";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function TokenCreation() {
  const [selectedTab, setSelectedTab] = useState("create");

  return (
    <div className="min-h-screen bg-dexplay-darkPurple relative overflow-hidden">
      <AnimatedBackground />
      <MainNavbar />
      
      <TokenCreationHero />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Tabs defaultValue="create" className="w-full" onValueChange={setSelectedTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-3xl bg-black/30 backdrop-blur-sm border border-white/10">
              <TabsTrigger value="create" className="data-[state=active]:bg-dexplay-purple/20 data-[state=active]:text-dexplay-purple">
                Create Token
              </TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-dexplay-purple/20 data-[state=active]:text-dexplay-purple">
                Features
              </TabsTrigger>
              <TabsTrigger value="ecosystem" className="data-[state=active]:bg-dexplay-purple/20 data-[state=active]:text-dexplay-purple">
                Ecosystem
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="create" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="bg-dexplay-purple/20 p-2 rounded-full">
                      <Rocket className="h-6 w-6 text-dexplay-purple" />
                    </div>
                    <CardTitle>Launch Your Token</CardTitle>
                  </div>
                  <CardDescription>
                    Create your game token in minutes with our simple wizard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2" />
                      <span>Solana-based SPL tokens</span>
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2" />
                      <span>Custom supply and tokenomics</span>
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2" />
                      <span>Auto-generated distribution</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-dexplay-purple hover:bg-dexplay-brightPurple">
                    Start Creating
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="bg-dexplay-purple/20 p-2 rounded-full">
                      <Coins className="h-6 w-6 text-dexplay-purple" />
                    </div>
                    <CardTitle>Economy Design</CardTitle>
                  </div>
                  <CardDescription>
                    Design a sustainable play-to-earn economy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2" />
                      <span>Balanced reward systems</span>
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2" />
                      <span>Multiple earning mechanisms</span>
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2" />
                      <span>Anti-inflation protection</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-dexplay-purple hover:bg-dexplay-brightPurple">
                    Design Economy
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="bg-dexplay-purple/20 p-2 rounded-full">
                      <Trophy className="h-6 w-6 text-dexplay-purple" />
                    </div>
                    <CardTitle>Rewards & Integration</CardTitle>
                  </div>
                  <CardDescription>
                    Connect your token to game achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2" />
                      <span>API integration tools</span>
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2" />
                      <span>Achievement-based rewards</span>
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2" />
                      <span>Leaderboard competitions</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-dexplay-purple hover:bg-dexplay-brightPurple">
                    Configure Rewards
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle>Get Listed on DEXPlay</CardTitle>
                <CardDescription>
                  List your token on our exchange and unlock powerful growth tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                    <h3 className="text-lg font-semibold text-dexplay-purple mb-2 flex items-center">
                      <Shield className="h-4 w-4 mr-2" /> Visibility
                    </h3>
                    <p className="text-sm text-gray-300">
                      Get discovered by thousands of active traders and players on the DEXPlay platform.
                    </p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                    <h3 className="text-lg font-semibold text-dexplay-purple mb-2 flex items-center">
                      <Star className="h-4 w-4 mr-2" /> Liquidity
                    </h3>
                    <p className="text-sm text-gray-300">
                      Access our liquidity pools to ensure smooth trading and price stability for your token.
                    </p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                    <h3 className="text-lg font-semibold text-dexplay-purple mb-2 flex items-center">
                      <Coins className="h-4 w-4 mr-2" /> Staking
                    </h3>
                    <p className="text-sm text-gray-300">
                      Offer staking options to your community and enable passive income for holders.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-dexplay-purple hover:bg-dexplay-brightPurple">
                  Apply for Listing
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-dexplay-purple/20 p-3 rounded-full">
                    <Gamepad className="h-8 w-8 text-dexplay-purple" />
                  </div>
                  <h3 className="text-2xl font-bold">Gaming Economy</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Create a self-sustaining economy where players can earn while playing,
                  trading items, and contributing to the game ecosystem.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Badge className="justify-center py-2 bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30 hover:bg-dexplay-purple/30">
                    Play-to-Earn
                  </Badge>
                  <Badge className="justify-center py-2 bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30 hover:bg-dexplay-purple/30">
                    NFT Integration
                  </Badge>
                  <Badge className="justify-center py-2 bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30 hover:bg-dexplay-purple/30">
                    In-Game Currency
                  </Badge>
                  <Badge className="justify-center py-2 bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30 hover:bg-dexplay-purple/30">
                    Marketplace
                  </Badge>
                </div>
              </div>
              
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-dexplay-purple/20 p-3 rounded-full">
                    <Coins className="h-8 w-8 text-dexplay-purple" />
                  </div>
                  <h3 className="text-2xl font-bold">Tokenomics</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Design balanced tokenomics with built-in utility, scarcity mechanisms,
                  and sustainable reward structures for long-term growth.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Badge className="justify-center py-2 bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30 hover:bg-dexplay-purple/30">
                    Deflationary
                  </Badge>
                  <Badge className="justify-center py-2 bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30 hover:bg-dexplay-purple/30">
                    Governance
                  </Badge>
                  <Badge className="justify-center py-2 bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30 hover:bg-dexplay-purple/30">
                    Staking Rewards
                  </Badge>
                  <Badge className="justify-center py-2 bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30 hover:bg-dexplay-purple/30">
                    Utility Focus
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Token Utility Examples</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-dexplay-purple">In-Game</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2 mt-1" />
                      <span>Purchase special items and cosmetics</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2 mt-1" />
                      <span>Unlock premium game content and features</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2 mt-1" />
                      <span>Enter special tournaments with token-based entry fees</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-dexplay-purple">Community</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2 mt-1" />
                      <span>Voting rights on game development decisions</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2 mt-1" />
                      <span>Access to exclusive community channels and events</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2 mt-1" />
                      <span>Early access to new game releases and features</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-xl font-semibold text-dexplay-purple">Financial</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2 mt-1" />
                      <span>Stake for passive income and platform rewards</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2 mt-1" />
                      <span>Provide liquidity to earn trading fee shares</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="h-4 w-4 text-dexplay-purple mr-2 mt-1" />
                      <span>Participate in yield farming programs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ecosystem" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-1 lg:col-span-2 bg-black/20 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle>The DEXPlay Ecosystem</CardTitle>
                  <CardDescription>
                    Join our growing network of tokenized games and platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold gradient-text">Trading Platform</h3>
                      <p className="text-gray-300 text-sm">
                        List your token on our exchange with deep liquidity pools and advanced
                        trading features optimized for gaming tokens.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-dexplay-orange/20 text-dexplay-orange border-dexplay-orange/30">
                          Low Fees
                        </Badge>
                        <Badge className="bg-dexplay-orange/20 text-dexplay-orange border-dexplay-orange/30">
                          Fast Settlement
                        </Badge>
                        <Badge className="bg-dexplay-orange/20 text-dexplay-orange border-dexplay-orange/30">
                          Cross-Chain
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold gradient-text">Staking Platform</h3>
                      <p className="text-gray-300 text-sm">
                        Enable passive income for your token holders through our flexible
                        staking programs with competitive APY rates.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-dexplay-green/20 text-dexplay-green border-dexplay-green/30">
                          Flexible Durations
                        </Badge>
                        <Badge className="bg-dexplay-green/20 text-dexplay-green border-dexplay-green/30">
                          Auto-Compound
                        </Badge>
                        <Badge className="bg-dexplay-green/20 text-dexplay-green border-dexplay-green/30">
                          Reward Boosting
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold gradient-text">P2P Marketplace</h3>
                      <p className="text-gray-300 text-sm">
                        Allow players to trade in-game assets, NFTs, and tokens directly with
                        each other in a secure, fee-optimized environment.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-dexplay-blue/20 text-dexplay-blue border-dexplay-blue/30">
                          Escrow Service
                        </Badge>
                        <Badge className="bg-dexplay-blue/20 text-dexplay-blue border-dexplay-blue/30">
                          Cross-Game Trading
                        </Badge>
                        <Badge className="bg-dexplay-blue/20 text-dexplay-blue border-dexplay-blue/30">
                          Low Fees
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold gradient-text">Livestreaming</h3>
                      <p className="text-gray-300 text-sm">
                        Integrate with our streaming platform to showcase gameplay, host
                        tournaments, and boost token exposure through engagement.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                          Token Tipping
                        </Badge>
                        <Badge className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                          Tournament Hosting
                        </Badge>
                        <Badge className="bg-dexplay-purple/20 text-dexplay-purple border-dexplay-purple/30">
                          Watch-to-Earn
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle>Success Stories</CardTitle>
                  <CardDescription>
                    Games that thrived on DEXPlay
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-white/10 rounded-lg p-4 bg-black/30">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-dexplay-purple to-dexplay-blue flex items-center justify-center">
                        <span className="font-bold text-white">CS</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Crypto Speedway</h4>
                        <p className="text-xs text-gray-400">Racing Game</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">
                      "Our player retention increased by 230% after implementing
                      the DEXPlay token economy. Players now earn while racing
                      and trading their custom cars as NFTs."
                    </p>
                  </div>
                  
                  <div className="border border-white/10 rounded-lg p-4 bg-black/30">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-dexplay-orange to-dexplay-red flex items-center justify-center">
                        <span className="font-bold text-white">MQ</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Mystic Quest</h4>
                        <p className="text-xs text-gray-400">Fantasy MMORPG</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">
                      "Listing our token on DEXPlay increased our daily active
                      users by 180%. The staking system gives our players passive
                      income while they're offline."
                    </p>
                  </div>
                  
                  <div className="border border-white/10 rounded-lg p-4 bg-black/30">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-dexplay-green to-dexplay-blue flex items-center justify-center">
                        <span className="font-bold text-white">SB</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Space Battlers</h4>
                        <p className="text-xs text-gray-400">Sci-Fi Strategy</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">
                      "The DEXPlay ecosystem provided the perfect launchpad for
                      our game economy. Our token value increased 400% within
                      3 months of listing."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm border border-dexplay-purple/20 rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold gradient-text mb-4">Ready to Tokenize Your Game?</h2>
              <p className="text-gray-300 max-w-3xl mx-auto mb-6">
                Join over 150+ game studios that have successfully launched tokens on the DEXPlay
                platform and created sustainable play-to-earn economies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <Button className="w-full sm:w-auto bg-dexplay-purple hover:bg-dexplay-brightPurple text-white">
                  <Rocket className="mr-2 h-4 w-4" />
                  Create Your Token
                </Button>
                <Button variant="outline" className="w-full sm:w-auto border-dexplay-purple text-dexplay-purple hover:bg-dexplay-purple/20">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
