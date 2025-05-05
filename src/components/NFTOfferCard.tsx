
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { P2PChatMessage } from "./P2PChatMessage";
import { toast } from "@/components/ui/sonner";

interface NFTOfferCardProps {
  id: string;
  name: string;
  collection: string;
  price: number;
  currency: string;
  image: string;
  rarity: string;
  seller: {
    name: string;
    rating: number;
    isOnline: boolean;
  };
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
}

export function NFTOfferCard({
  id,
  name,
  collection,
  price,
  currency,
  image,
  rarity,
  seller,
  attributes = [],
}: NFTOfferCardProps) {
  const handlePurchase = () => {
    toast.success(`Purchase initiated for ${name}`);
  };

  return (
    <Card className="overflow-hidden bg-dexplay-darkPurple/60 border border-white/10">
      <div className="aspect-square w-full overflow-hidden relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <Badge
          className={`absolute top-2 right-2 ${
            rarity === "Legendary"
              ? "bg-yellow-500"
              : rarity === "Epic"
              ? "bg-purple-500"
              : rarity === "Rare"
              ? "bg-blue-500"
              : "bg-green-500"
          }`}
        >
          {rarity}
        </Badge>
      </div>

      <CardHeader className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs text-gray-400">{collection}</div>
            <CardTitle className="text-base text-white">{name}</CardTitle>
          </div>
          <P2PChatMessage user={seller.name} isOnline={seller.isOnline} />
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-0">
        <div className="mb-2">
          <div className="text-xs text-gray-400">Price</div>
          <div className="text-white font-bold flex items-center">
            {price} {currency}
            <span className="ml-1 text-xs text-gray-400">
              (${(price * (currency === "SOL" ? 100 : currency === "DIO" ? 0.5 : 1)).toFixed(2)})
            </span>
          </div>
        </div>

        {attributes.length > 0 && (
          <div className="mb-3">
            <div className="text-xs text-gray-400 mb-1">Attributes</div>
            <div className="flex flex-wrap gap-1">
              {attributes.slice(0, 3).map((attr, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-gray-800 border-gray-700 text-gray-300"
                >
                  {attr.trait_type}: {attr.value}
                </Badge>
              ))}
              {attributes.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs bg-gray-800 border-gray-700 text-gray-300"
                >
                  +{attributes.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-gray-300">
            Seller: <span className="text-white">{seller.name}</span>
            <span className="ml-1 text-yellow-400">★ {seller.rating}</span>
          </div>
          <Button
            className="bg-dexplay-purple hover:bg-dexplay-brightPurple text-white"
            size="sm"
            onClick={handlePurchase}
          >
            Buy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
