
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GamepadIcon, UserIcon, Menu, X } from "lucide-react";

const NavItems = [
  { name: "Home", path: "/" },
  { name: "Cross Chain", path: "/cross-chain" },
  { name: "Stake", path: "/stake" },
  { name: "Trading", path: "/trading" },
  { name: "P2P", path: "/p2p" },
  { name: "NFTs", path: "/nfts" },
  { name: "Leaderboard", path: "/leaderboard" },
  { name: "Competitions", path: "/competitions" },
  { name: "Token Creation", path: "/token-creation" },
  { name: "About", path: "/about" },
];

export function MainNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-dexplay-darkPurple/90 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GamepadIcon className="h-8 w-8 text-dexplay-purple" />
              <span className="text-xl font-bold gradient-text">DEXPLAY</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {NavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-dexplay-purple px-2 py-1 text-sm rounded-md transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="hidden sm:flex border-dexplay-purple text-dexplay-purple hover:bg-dexplay-purple/20">
              Connect Wallet
            </Button>
            <Button variant="default" className="hidden sm:flex bg-dexplay-purple hover:bg-dexplay-brightPurple text-white">
              <UserIcon className="mr-2 h-4 w-4" />
              Sign In
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-dexplay-purple" />
              ) : (
                <Menu className="h-6 w-6 text-dexplay-purple" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dexplay-darkPurple border-t border-white/10 animate-slide-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-300 hover:text-dexplay-purple block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="border-dexplay-purple text-dexplay-purple hover:bg-dexplay-purple/20 w-full">
                Connect Wallet
              </Button>
              <Button variant="default" className="bg-dexplay-purple hover:bg-dexplay-brightPurple text-white w-full">
                <UserIcon className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
