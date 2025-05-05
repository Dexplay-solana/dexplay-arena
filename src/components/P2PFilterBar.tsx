
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useMobile } from "@/hooks/use-mobile";

export function P2PFilterBar() {
  const isMobile = useMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFiat, setSelectedFiat] = useState("USD");
  const [selectedPayments, setSelectedPayments] = useState<string[]>(["Bank Transfer"]);
  const [selectedTokens, setSelectedTokens] = useState<string[]>(["SOL", "DIO"]);

  const handleAddPaymentMethod = (method: string) => {
    if (selectedPayments.includes(method)) {
      setSelectedPayments(selectedPayments.filter((m) => m !== method));
    } else {
      setSelectedPayments([...selectedPayments, method]);
    }
  };

  const handleAddToken = (token: string) => {
    if (selectedTokens.includes(token)) {
      setSelectedTokens(selectedTokens.filter((t) => t !== token));
    } else {
      setSelectedTokens([...selectedTokens, token]);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input 
            placeholder="Search traders by name" 
            className="pl-9 bg-gray-900 border-gray-700 text-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="bg-gray-900 border-gray-700 text-white">
                {selectedFiat} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-dexplay-darkPurple border border-white/10">
              <div className="grid gap-2">
                {["USD", "EUR", "GBP", "JPY", "CAD"].map((fiat) => (
                  <Button 
                    key={fiat}
                    variant={selectedFiat === fiat ? "default" : "ghost"}
                    className={
                      selectedFiat === fiat
                        ? "bg-dexplay-purple hover:bg-dexplay-brightPurple" 
                        : "text-white hover:bg-gray-800"
                    }
                    onClick={() => setSelectedFiat(fiat)}
                  >
                    {fiat}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="bg-gray-900 border-gray-700 text-white">
                Tokens <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 bg-dexplay-darkPurple border border-white/10">
              <div className="grid gap-2">
                {["SOL", "DIO", "USDT", "ETH", "BTC"].map((token) => (
                  <div key={token} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`token-${token}`} 
                      checked={selectedTokens.includes(token)}
                      onCheckedChange={() => handleAddToken(token)}
                    />
                    <Label 
                      htmlFor={`token-${token}`}
                      className="text-white"
                    >
                      {token}
                    </Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="bg-gray-900 border-gray-700 text-white">
                Payment <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 bg-dexplay-darkPurple border border-white/10">
              <div className="grid gap-2">
                {["Bank Transfer", "PayPal", "Credit Card", "Crypto", "Cash"].map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`payment-${method}`} 
                      checked={selectedPayments.includes(method)}
                      onCheckedChange={() => handleAddPaymentMethod(method)}
                    />
                    <Label 
                      htmlFor={`payment-${method}`}
                      className="text-white"
                    >
                      {method}
                    </Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* Mobile filter tags */}
      {isMobile && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 flex-wrap mt-2">
              {selectedTokens.map((token) => (
                <Badge key={token} variant="secondary" className="bg-gray-800 text-white">
                  {token}
                  <button 
                    onClick={() => handleAddToken(token)}
                    className="ml-1 text-xs"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {selectedPayments.map((method) => (
                <Badge key={method} variant="outline" className="border-gray-700 text-gray-300">
                  {method}
                  <button 
                    onClick={() => handleAddPaymentMethod(method)}
                    className="ml-1 text-xs"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs text-gray-400">
                {isOpen ? "Less" : "More"}
                <ChevronDown className={`ml-1 h-3 w-3 ${isOpen ? "transform rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="mt-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-400 mb-1">More Tokens</p>
                <div className="grid gap-1">
                  {["USDC", "XRP", "ADA", "DOT", "LINK"].map((token) => (
                    <div key={token} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`extra-token-${token}`} 
                        checked={selectedTokens.includes(token)}
                        onCheckedChange={() => handleAddToken(token)}
                      />
                      <Label 
                        htmlFor={`extra-token-${token}`}
                        className="text-gray-300 text-sm"
                      >
                        {token}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">More Payments</p>
                <div className="grid gap-1">
                  {["Venmo", "Apple Pay", "Google Pay", "Western Union", "Wire"].map((method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`extra-payment-${method}`} 
                        checked={selectedPayments.includes(method)}
                        onCheckedChange={() => handleAddPaymentMethod(method)}
                      />
                      <Label 
                        htmlFor={`extra-payment-${method}`}
                        className="text-gray-300 text-sm"
                      >
                        {method}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
