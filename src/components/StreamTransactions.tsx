
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Generate mock transaction data
const generateTransactions = (count = 15) => {
  const transactions = [];
  const usernames = ["CryptoFan", "TokenHodler", "SolanaLover", "GameStreamer", "DioStaker", "Web3Gamer"];
  const tokenSymbols = ["DIO", "SOL"];
  
  for (let i = 0; i < count; i++) {
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - Math.floor(Math.random() * 60));
    
    const amount = parseFloat((Math.random() * 100 + 5).toFixed(2));
    const tokenSymbol = tokenSymbols[Math.floor(Math.random() * tokenSymbols.length)];
    
    transactions.push({
      id: `tx-${i}`,
      username: usernames[Math.floor(Math.random() * usernames.length)],
      type: Math.random() > 0.5 ? "stake" : "withdraw",
      amount,
      token: tokenSymbol,
      timestamp,
    });
  }
  
  // Sort by timestamp (most recent first)
  return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

interface StreamTransactionsProps {
  streamId: string;
}

export function StreamTransactions({ streamId }: StreamTransactionsProps) {
  const [transactions, setTransactions] = useState(() => generateTransactions());
  const [activeTab, setActiveTab] = useState<"all" | "stakes" | "withdrawals">("all");
  
  const filteredTransactions = transactions.filter(tx => {
    if (activeTab === "all") return true;
    if (activeTab === "stakes") return tx.type === "stake";
    if (activeTab === "withdrawals") return tx.type === "withdraw";
    return true;
  });
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg h-full">
      <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as "all" | "stakes" | "withdrawals")}>
        <TabsList className="w-full grid grid-cols-3 bg-black/40">
          <TabsTrigger value="all" className="data-[state=active]:bg-dexplay-purple">All</TabsTrigger>
          <TabsTrigger value="stakes" className="data-[state=active]:bg-dexplay-purple">Stakes</TabsTrigger>
          <TabsTrigger value="withdrawals" className="data-[state=active]:bg-dexplay-purple">Withdrawals</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="h-[340px]">
          <div className="p-2">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      tx.type === "stake" ? "bg-green-500" : "bg-red-500"
                    }`}></div>
                    <div>
                      <div className="text-sm text-white">{tx.username}</div>
                      <div className="text-xs text-gray-400">{formatTime(tx.timestamp)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      tx.type === "stake" ? "text-green-400" : "text-red-400"
                    }`}>
                      {tx.type === "stake" ? "+" : "-"}{tx.amount} {tx.token}
                    </div>
                    <div className="text-xs text-gray-400">{tx.type === "stake" ? "Staked" : "Withdrawn"}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">No transactions found</div>
            )}
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
