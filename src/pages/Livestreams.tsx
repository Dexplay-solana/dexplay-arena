import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MainNavbar } from "@/components/MainNavbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Play } from "lucide-react";

// Mock data for livestreams
const CURRENT_STREAMS = [
  {
    id: "1",
    title: "Epic Decimated Survival Gameplay",
    game: "Decimated",
    network: "Solana",
    viewers: 1243,
    creator: {
      id: "crypto-master",
      name: "CryptoGameMaster",
      avatar: "https://i.pravatar.cc/150?u=cryptomaster"
    },
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    tags: ["Survival", "Web3", "Solana"]
  },
  {
    id: "2",
    title: "MixMob Racing Tournament Finals",
    game: "MixMob",
    network: "Solana",
    viewers: 856,
    creator: {
      id: "racerx",
      name: "RacerX",
      avatar: "https://i.pravatar.cc/150?u=racerx"
    },
    thumbnail: "https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    tags: ["Racing", "Tournament", "Web3"]
  },
  {
    id: "3",
    title: "Mini Royale Squad Matches",
    game: "Mini Royale",
    network: "Solana",
    viewers: 1782,
    creator: {
      id: "battlequeen",
      name: "BattleQueen",
      avatar: "https://i.pravatar.cc/150?u=battlequeen"
    },
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    tags: ["FPS", "Battle Royale", "Competition"]
  },
  {
    id: "4",
    title: "Aurory Adventure Mode Playthrough",
    game: "Aurory",
    network: "Solana",
    viewers: 935,
    creator: {
      id: "nftcollector",
      name: "NFTCollector",
      avatar: "https://i.pravatar.cc/150?u=nftcollector"
    },
    thumbnail: "https://images.unsplash.com/photo-1633169570682-72d2a80802ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    tags: ["Adventure", "RPG", "Play-to-Earn"]
  }
];

const SCHEDULED_STREAMS = [
  {
    id: "5",
    title: "DeFi Land Farming Competition",
    game: "DeFi Land",
    network: "Solana",
    scheduledTime: "2025-05-04T18:00:00",
    creator: {
      id: "farmking",
      name: "FarmKing",
      avatar: "https://i.pravatar.cc/150?u=farmking"
    },
    thumbnail: "https://images.unsplash.com/photo-1530683238104-3cf94aaef563?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    tags: ["Farming", "Competition", "Play-to-Earn"]
  },
  {
    id: "6",
    title: "Decimated Clan Wars",
    game: "Decimated",
    network: "Solana",
    scheduledTime: "2025-05-05T20:00:00",
    creator: {
      id: "crypto-master",
      name: "CryptoGameMaster",
      avatar: "https://i.pravatar.cc/150?u=cryptomaster"
    },
    thumbnail: "https://images.unsplash.com/photo-1618046120293-09933ee4c9e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    tags: ["Clan Wars", "PvP", "Survival"]
  },
  {
    id: "7",
    title: "Aurory PvP Tournament",
    game: "Aurory",
    network: "Solana",
    scheduledTime: "2025-05-06T19:00:00",
    creator: {
      id: "pvpmaster",
      name: "PvPMaster",
      avatar: "https://i.pravatar.cc/150?u=pvpmaster"
    },
    thumbnail: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
    tags: ["Tournament", "PvP", "Competition"]
  }
];

interface GameStreamCardProps {
  id: string;
  title: string;
  game: string;
  network: string;
  thumbnail: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  tags: string[];
  viewers?: number;
  scheduledTime?: string;
}

const GameStreamCard = ({ id, title, game, network, thumbnail, creator, tags, viewers, scheduledTime }: GameStreamCardProps) => {
  const navigate = useNavigate();
  const isLive = !!viewers;

  const formatScheduledTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const handleWatchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLive) {
      navigate(`/livestream/${id}`, { state: { stream: { id, title, game, network, thumbnail, creator, tags, viewers } } });
    } else {
      // Set reminder logic would go here
      console.log(`Set reminder for scheduled stream: ${id}`);
    }
  };

  return (
    <div className="block">
      <Card className="overflow-hidden border-white/10 bg-black/40 transition-all hover:border-dexplay-purple hover:card-glow">
        <div className="relative">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full aspect-video object-cover"
          />
          {isLive ? (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">LIVE</Badge>
          ) : (
            <Badge className="absolute top-2 left-2 bg-gray-700 text-white">SCHEDULED</Badge>
          )}
          <Badge className="absolute top-2 right-2 bg-dexplay-purple/80 backdrop-blur-sm text-white">{game}</Badge>
          
          {isLive && (
            <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded-md text-white text-xs flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-1 animate-pulse"></div>
              {viewers.toLocaleString()} viewers
            </div>
          )}
          
          {!isLive && scheduledTime && (
            <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded-md text-white text-xs flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {formatScheduledTime(scheduledTime)}
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button 
              className="bg-dexplay-purple hover:bg-dexplay-brightPurple"
              onClick={handleWatchClick}
            >
              <Play className="mr-1 h-4 w-4" />
              {isLive ? 'Watch Now' : 'Set Reminder'}
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-6 w-6">
              <img src={creator.avatar} alt={creator.name} />
            </Avatar>
            <span className="text-sm font-medium text-white">{creator.name}</span>
          </div>
          <h3 className="text-white font-medium mb-2 line-clamp-2">{title}</h3>
          <div className="flex flex-wrap gap-1">
            {tags.map(tag => (
              <span key={tag} className="text-xs bg-dexplay-purple/20 text-dexplay-purple px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Filter component
const GameFilter = ({ onChange }: { onChange: (filter: string) => void }) => {
  const games = ["All Games", "Decimated", "MixMob", "Mini Royale", "Aurory", "DeFi Land"];
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {games.map(game => (
        <Button 
          key={game}
          variant="outline" 
          size="sm"
          onClick={() => onChange(game === "All Games" ? "" : game)}
          className="border-white/10 bg-black/40 text-white hover:bg-dexplay-purple/20 hover:border-dexplay-purple"
        >
          {game}
        </Button>
      ))}
    </div>
  );
};

export default function Livestreams() {
  const [filter, setFilter] = useState("");
  const [filteredCurrentStreams, setFilteredCurrentStreams] = useState(CURRENT_STREAMS);
  const [filteredScheduledStreams, setFilteredScheduledStreams] = useState(SCHEDULED_STREAMS);

  useEffect(() => {
    if (filter) {
      setFilteredCurrentStreams(CURRENT_STREAMS.filter(stream => stream.game === filter));
      setFilteredScheduledStreams(SCHEDULED_STREAMS.filter(stream => stream.game === filter));
    } else {
      setFilteredCurrentStreams(CURRENT_STREAMS);
      setFilteredScheduledStreams(SCHEDULED_STREAMS);
    }
  }, [filter]);

  return (
    <div className="min-h-screen bg-dexplay-darkPurple">
      <MainNavbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-white mb-2">
          <span className="gradient-text">Livestreams</span>
        </h1>
        <p className="text-gray-400 mb-6">
          Watch your favorite creators play web3 games on Solana and earn rewards by participating
        </p>
        
        <GameFilter onChange={setFilter} />
        
        <Tabs defaultValue="live" className="mb-8">
          <TabsList className="bg-black/40 border border-white/10">
            <TabsTrigger value="live" className="data-[state=active]:bg-dexplay-purple">Live Now</TabsTrigger>
            <TabsTrigger value="scheduled" className="data-[state=active]:bg-dexplay-purple">Scheduled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="live" className="mt-6">
            {filteredCurrentStreams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCurrentStreams.map((stream) => (
                  <GameStreamCard key={stream.id} {...stream} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No live streams found for this filter.</p>
                <Button 
                  variant="outline" 
                  className="mt-4 border-dexplay-purple text-dexplay-purple"
                  onClick={() => setFilter("")}
                >
                  Clear Filter
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-6">
            {filteredScheduledStreams.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredScheduledStreams.map((stream) => (
                  <GameStreamCard key={stream.id} {...stream} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No scheduled streams found for this filter.</p>
                <Button 
                  variant="outline" 
                  className="mt-4 border-dexplay-purple text-dexplay-purple"
                  onClick={() => setFilter("")}
                >
                  Clear Filter
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
