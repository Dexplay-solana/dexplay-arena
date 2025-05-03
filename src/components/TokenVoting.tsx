
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface TokenVotingProps {
  gameTitle: string;
  tokenSymbol: string;
  tokenLogo: string;
}

export function TokenVoting({ gameTitle, tokenSymbol, tokenLogo }: TokenVotingProps) {
  const [voteAmount, setVoteAmount] = useState("");
  const [totalVotes, setTotalVotes] = useState(1325);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isVoted, setIsVoted] = useState(false);

  const handleVote = () => {
    const amount = parseFloat(voteAmount);
    if (!isNaN(amount) && amount > 0) {
      setTotalVotes(totalVotes + amount);
      setIsVoted(true);
      setDialogOpen(false);
      
      // Reset vote amount
      setVoteAmount("");
      
      // In a real app, you would interact with a web3 wallet here
      console.log(`Voted ${amount} ${tokenSymbol} tokens`);
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10">
      <div className="flex items-center space-x-3 mb-4">
        <img
          src={tokenLogo}
          alt={`${tokenSymbol} logo`}
          className="w-10 h-10 rounded-full border border-white/20"
        />
        <div>
          <h3 className="font-semibold text-white">{gameTitle}</h3>
          <div className="flex items-center">
            <Badge className="bg-dexplay-purple text-white">
              {tokenSymbol}
            </Badge>
            <span className="ml-2 text-sm text-gray-400">Game Token</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Total Votes</span>
          <span className="font-medium text-white">{totalVotes.toLocaleString()} {tokenSymbol}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Your Votes</span>
          <span className="font-medium text-white">
            {isVoted ? "Active" : "None"}
          </span>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-dexplay-purple hover:bg-dexplay-brightPurple text-white"
              disabled={isVoted}
            >
              {isVoted ? "Already Voted" : "Vote with Tokens"}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-dexplay-darkPurple border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Vote with {tokenSymbol} Tokens</DialogTitle>
              <DialogDescription className="text-gray-400">
                Support this creator by voting with {tokenSymbol} tokens. Higher votes increase their visibility and rewards.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label htmlFor="vote-amount" className="text-sm text-gray-400">
                  Amount to Vote
                </label>
                <div className="flex space-x-2">
                  <Input
                    id="vote-amount"
                    type="number"
                    placeholder="Enter amount"
                    className="bg-black/20 border-white/20"
                    value={voteAmount}
                    onChange={(e) => setVoteAmount(e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    className="border-dexplay-purple text-dexplay-purple hover:bg-dexplay-purple/20"
                    onClick={() => setVoteAmount("10")}
                  >
                    Max
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Available: 10.0 {tokenSymbol}</p>
              </div>
              
              <div className="pt-2">
                <Button 
                  className="w-full bg-dexplay-purple hover:bg-dexplay-brightPurple text-white"
                  onClick={handleVote}
                >
                  Confirm Vote
                </Button>
                <p className="text-xs text-center mt-2 text-gray-500">
                  Connect your wallet to vote with {tokenSymbol} tokens
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
