
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Order {
  id: string;
  type: "buy" | "sell";
  price: number;
  amount: number;
  total: number;
  timestamp: Date;
}

interface OrderBookProps {
  defaultTab?: "orders" | "trades";
}

export function OrderBook({ defaultTab = "orders" }: OrderBookProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Generate mock order data
  useEffect(() => {
    const generateOrder = (type: "buy" | "sell", index: number): Order => {
      // Base price for buy/sell with some variance
      const basePrice = type === "buy" ? 5.25 - index * 0.05 : 5.35 + index * 0.05;
      const price = parseFloat(basePrice.toFixed(2));
      
      // Random amount between 100-1000
      const amount = parseFloat((Math.random() * 900 + 100).toFixed(2));
      
      return {
        id: `${type}-${Date.now()}-${index}`,
        type,
        price,
        amount,
        total: parseFloat((price * amount).toFixed(2)),
        timestamp: new Date(Date.now() - index * 30000),
      };
    };

    const mockOrders: Order[] = [];
    
    // Generate buy orders
    for (let i = 0; i < 15; i++) {
      mockOrders.push(generateOrder("buy", i));
    }
    
    // Generate sell orders
    for (let i = 0; i < 15; i++) {
      mockOrders.push(generateOrder("sell", i));
    }
    
    // Sort by price (descending)
    mockOrders.sort((a, b) => b.price - a.price);
    
    setOrders(mockOrders);
  }, []);

  const buyOrders = orders.filter((order) => order.type === "buy");
  const sellOrders = orders.filter((order) => order.type === "sell");

  // Format time for display
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 h-full">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">Transaction History</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="text-xs border-white/20 hover:bg-white/5">
              More
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue={defaultTab} className="w-full" onValueChange={(value) => setActiveTab(value as "orders" | "trades")}>
        <div className="px-4 pt-2">
          <TabsList className="w-full bg-black/20">
            <TabsTrigger value="orders" className="flex-1 data-[state=active]:bg-dexplay-purple/20">
              Order Book
            </TabsTrigger>
            <TabsTrigger value="trades" className="flex-1 data-[state=active]:bg-dexplay-purple/20">
              Recent Trades
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="orders" className="p-0 mt-0">
          {/* Order book headers */}
          <div className="grid grid-cols-3 gap-2 px-4 py-2 text-xs text-gray-400 border-b border-white/10">
            <div>Price ($DIO)</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Total</div>
          </div>
          
          <ScrollArea className="h-[300px]">
            <div className="px-4">
              {/* Sell orders (red) */}
              <div className="space-y-1 py-2">
                {sellOrders.map((order) => (
                  <div key={order.id} className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-red-500">{order.price.toFixed(2)}</div>
                    <div className="text-right text-gray-300">{order.amount.toFixed(2)}</div>
                    <div className="text-right text-gray-400">{order.total.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              
              {/* Current price indicator */}
              <div className="py-2 border-y border-dexplay-purple/30">
                <div className="text-center font-medium text-dexplay-purple">
                  5.32 $DIO
                </div>
              </div>
              
              {/* Buy orders (green) */}
              <div className="space-y-1 py-2">
                {buyOrders.map((order) => (
                  <div key={order.id} className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-green-500">{order.price.toFixed(2)}</div>
                    <div className="text-right text-gray-300">{order.amount.toFixed(2)}</div>
                    <div className="text-right text-gray-400">{order.total.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="trades" className="p-0 mt-0">
          {/* Trades headers */}
          <div className="grid grid-cols-3 gap-2 px-4 py-2 text-xs text-gray-400 border-b border-white/10">
            <div>Price ($DIO)</div>
            <div className="text-right">Amount</div>
            <div className="text-right">Time</div>
          </div>
          
          <ScrollArea className="h-[300px]">
            <div className="px-4">
              <div className="space-y-1 py-2">
                {orders.slice(0, 20).map((order) => (
                  <div key={order.id} className="grid grid-cols-3 gap-2 text-sm">
                    <div className={order.type === "buy" ? "text-green-500" : "text-red-500"}>
                      {order.price.toFixed(2)}
                    </div>
                    <div className="text-right text-gray-300">{order.amount.toFixed(2)}</div>
                    <div className="text-right text-gray-400">{formatTime(order.timestamp)}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
