
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gamepad, ChartBar, Trophy, Zap } from "lucide-react";

export function TokenCreationHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const features = [
    "Create Gaming Tokens",
    "Build Play-to-Earn Economies",
    "List on DEXPlay Exchange",
    "Enable Player Rewards"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <Badge variant="outline" className="mb-4 bg-dexplay-purple/10 text-dexplay-purple border-dexplay-purple/20 px-3 py-1">
              DEXPlay Token Creation
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="gradient-text">Tokenize Your Game</span> <br /> 
              Build a Player-Powered Economy
            </h1>
            
            <div className="h-16 my-4">
              <motion.div
                key={currentIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center text-xl md:text-2xl text-gray-300"
              >
                <Zap className="mr-2 h-5 w-5 text-dexplay-purple" />
                {features[currentIndex]}
              </motion.div>
            </div>
            
            <p className="text-gray-300 mb-8 text-lg">
              Transform your game into a thriving economy where players earn, trade, and invest.
              Launch your custom token on Solana with DEXPlay's all-in-one platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-dexplay-purple hover:bg-dexplay-brightPurple text-white text-lg px-8 py-6">
                Create Your Token
              </Button>
              <Button variant="outline" className="border-dexplay-purple text-dexplay-purple hover:bg-dexplay-purple/20 text-lg px-8 py-6">
                Learn More
              </Button>
            </div>
            
            <div className="flex items-center mt-8 space-x-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-dexplay-purple flex items-center justify-center text-white text-xs">
                  150+
                </div>
                <div className="w-10 h-10 rounded-full bg-dexplay-blue flex items-center justify-center text-white text-xs">
                  45M+
                </div>
                <div className="w-10 h-10 rounded-full bg-dexplay-green flex items-center justify-center text-white text-xs">
                  3.2B+
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                <span className="text-white">150+ games</span> tokenized • <span className="text-white">45M+</span> players • <span className="text-white">$3.2B+</span> trading volume
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-full aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-dexplay-purple via-dexplay-blue to-dexplay-purple/50 rounded-full opacity-20 animate-pulse-slow blur-3xl"></div>
              
              <motion.div 
                className="absolute w-full h-full flex items-center justify-center"
                animate={{ 
                  rotate: 360,
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-full h-full p-10">
                  <div className="relative w-full h-full">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute w-4 h-4 bg-dexplay-purple rounded-full"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `rotate(${i * 30}deg) translate(140px) rotate(-${i * 30}deg)`,
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 backdrop-blur-sm w-40 h-40 rounded-full border border-dexplay-purple/50 flex items-center justify-center">
                  <Gamepad className="h-20 w-20 text-dexplay-purple" />
                </div>
              </div>
              
              <motion.div 
                className="absolute top-10 left-10 bg-black/40 backdrop-blur-sm p-3 rounded-lg border border-white/10"
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ChartBar className="h-10 w-10 text-dexplay-green" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-10 right-10 bg-black/40 backdrop-blur-sm p-3 rounded-lg border border-white/10"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Trophy className="h-10 w-10 text-dexplay-orange" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
