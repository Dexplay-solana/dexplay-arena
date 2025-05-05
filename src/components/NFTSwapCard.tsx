
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface NFTSwapCardProps {
  sourceNFT: {
    id: string;
    name: string;
    collection: string;
    image: string;
    game: string;
    attributes: Array<{
      trait_type: string;
      value: string;
    }>;
  };
  targetNFT: {
    id: string;
    name: string;
    collection: string;
    image: string;
    game: string;
    attributes: Array<{
      trait_type: string;
      value: string;
    }>;
  };
  compatibilityScore: number;
}

export function NFTSwapCard({
  sourceNFT,
  targetNFT,
  compatibilityScore,
}: NFTSwapCardProps) {
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      toast.success("NFT swap completed successfully!");
    }, 2000);
  };

  // Map attributes to simulated conversion
  const attributeMapping: Record<string, { source: string; target: string; }[]> = {
    "Attack": [
      { source: sourceNFT.attributes.find(a => a.trait_type === "Attack")?.value || "N/A", 
        target: targetNFT.attributes.find(a => a.trait_type === "Power")?.value || "N/A" },
    ],
    "Defense": [
      { source: sourceNFT.attributes.find(a => a.trait_type === "Defense")?.value || "N/A", 
        target: targetNFT.attributes.find(a => a.trait_type === "Shield")?.value || "N/A" },
    ],
    "Speed": [
      { source: sourceNFT.attributes.find(a => a.trait_type === "Speed")?.value || "N/A", 
        target: targetNFT.attributes.find(a => a.trait_type === "Agility")?.value || "N/A" },
    ],
  };

  return (
    <Card className="overflow-hidden bg-dexplay-darkPurple/60 border border-white/10">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg text-white flex justify-between items-center">
          Cross-Game NFT Swap
          <Badge 
            className={
              compatibilityScore > 80 
                ? "bg-green-500" 
                : compatibilityScore > 60 
                  ? "bg-yellow-500" 
                  : "bg-red-500"
            }
          >
            {compatibilityScore}% Compatible
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <div className="grid gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Source NFT */}
            <div className="space-y-2">
              <div className="text-sm text-gray-400">You're Trading</div>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <img
                  src={sourceNFT.image}
                  alt={sourceNFT.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-dexplay-purple">
                  {sourceNFT.game}
                </Badge>
              </div>
              <div>
                <div className="text-white font-medium">{sourceNFT.name}</div>
                <div className="text-sm text-gray-400">{sourceNFT.collection}</div>
              </div>
              <div className="space-y-1">
                {sourceNFT.attributes.map((attr, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-400">{attr.trait_type}:</span>
                    <span className="text-white">{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target NFT */}
            <div className="space-y-2">
              <div className="text-sm text-gray-400">You'll Receive</div>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                <img
                  src={targetNFT.image}
                  alt={targetNFT.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-accent">
                  {targetNFT.game}
                </Badge>
              </div>
              <div>
                <div className="text-white font-medium">{targetNFT.name}</div>
                <div className="text-sm text-gray-400">{targetNFT.collection}</div>
              </div>
              <div className="space-y-1">
                {targetNFT.attributes.map((attr, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-400">{attr.trait_type}:</span>
                    <span className="text-white">{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Metadata Conversion Preview */}
          <div className="bg-gray-800/50 rounded-lg p-3 space-y-2">
            <div className="text-sm text-gray-300 font-medium">Metadata Conversion Preview</div>
            <div className="space-y-2">
              {Object.entries(attributeMapping).map(([key, values], idx) => (
                <div key={idx} className="grid grid-cols-3 text-sm">
                  <div className="text-gray-400">{key}</div>
                  <div className="text-center text-white flex items-center justify-center">
                    {values[0].source} <ArrowDown className="h-3 w-3 mx-1" />
                  </div>
                  <div className="text-right text-green-400">
                    {values[0].target}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-dexplay-purple hover:bg-dexplay-brightPurple text-white"
          disabled={isSwapping}
          onClick={handleSwap}
        >
          {isSwapping ? "Processing Swap..." : "Confirm NFT Swap"}
        </Button>
      </CardFooter>
    </Card>
  );
}
