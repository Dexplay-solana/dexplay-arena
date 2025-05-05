
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { P2PChatMessage } from "./P2PChatMessage";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";

interface P2POfferCardProps {
  type: "buy" | "sell";
  coin: string;
  price: number;
  minAmount: number;
  maxAmount: number;
  paymentMethods: string[];
  trader: {
    name: string;
    rating: number;
    ordersCompleted: number;
    isOnline: boolean;
  };
}

export function P2POfferCard({
  type,
  coin,
  price,
  minAmount,
  maxAmount,
  paymentMethods,
  trader,
}: P2POfferCardProps) {
  const handleOffer = () => {
    toast(`${type === "buy" ? "Buy" : "Sell"} order submitted for ${coin}`);
  };

  return (
    <Card className="bg-dexplay-darkPurple/60 border border-white/10 mb-4">
      <CardHeader className="py-3 px-4 flex flex-row justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-dexplay-purple to-dexplay-blue flex items-center justify-center text-white font-bold">
            {coin.slice(0, 1)}
          </div>
          <span className="ml-2 font-medium text-white">{trader.name}</span>
          <span className="ml-2 text-yellow-400 text-sm">
            ★ {trader.rating.toFixed(1)}
          </span>
          <span className="ml-2 text-gray-400 text-xs">
            {trader.ordersCompleted}+ orders
          </span>
        </div>
        <P2PChatMessage user={trader.name} isOnline={trader.isOnline} />
      </CardHeader>
      <CardContent className="pt-0 pb-4 px-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-3 sm:col-span-1">
            <div className="text-gray-400 text-xs">Price</div>
            <div className="text-white font-medium">${price.toFixed(2)}</div>
          </div>
          <div className="col-span-3 sm:col-span-1">
            <div className="text-gray-400 text-xs">Limit</div>
            <div className="text-white">
              ${minAmount} - ${maxAmount}
            </div>
          </div>
          <div className="col-span-3 sm:col-span-1 flex flex-col sm:items-end">
            <div className="text-gray-400 text-xs mb-1">Payment</div>
            <div className="flex flex-wrap gap-1">
              {paymentMethods.map((method) => (
                <Badge
                  key={method}
                  variant="secondary"
                  className="text-xs bg-gray-800 text-gray-300"
                >
                  {method}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <Button
          variant="default"
          className={`w-full mt-4 ${
            type === "buy"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
          onClick={handleOffer}
        >
          {type === "buy" ? "Buy" : "Sell"} {coin}
        </Button>
      </CardContent>
    </Card>
  );
}
