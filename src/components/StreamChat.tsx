
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Emojis for reactions
const emojis = ["❤️", "😂", "🔥", "👍", "💯", "🎮", "🚀", "🏆", "💰", "😍"];

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
}

export function StreamChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [reactions, setReactions] = useState<{ emoji: string; id: string; position: number }[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Generate mock messages on first load
  useEffect(() => {
    const mockMessages: ChatMessage[] = [
      {
        id: "1",
        username: "CryptoGamer",
        message: "This game looks amazing! Can't wait for the next match.",
        timestamp: new Date(Date.now() - 500000),
      },
      {
        id: "2",
        username: "SolanaFan",
        message: "Just staked 50 $DIO tokens on this stream!",
        timestamp: new Date(Date.now() - 400000),
      },
      {
        id: "3",
        username: "Web3Master",
        message: "The graphics in Decimated are incredible 🔥",
        timestamp: new Date(Date.now() - 300000),
      },
      {
        id: "4",
        username: "TokenTrader",
        message: "Anyone else seeing these ROI numbers? Insane!",
        timestamp: new Date(Date.now() - 200000),
      },
      {
        id: "5",
        username: "GameExplorer",
        message: "First time watching, this platform is awesome!",
        timestamp: new Date(Date.now() - 100000),
      },
    ];

    setMessages(mockMessages);
  }, []);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  // Clean up old reactions
  useEffect(() => {
    const interval = setInterval(() => {
      setReactions((prevReactions) => 
        prevReactions.filter((r) => Date.now() - parseInt(r.id) < 3000)
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        username: "You",
        message: message.trim(),
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleEmojiClick = (emoji: string) => {
    const newReaction = {
      emoji,
      id: Date.now().toString(),
      position: Math.floor(Math.random() * 80) + 10,
    };
    setReactions([...reactions, newReaction]);
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(timestamp);
  };

  return (
    <div className="flex flex-col h-full border border-white/10 rounded-lg bg-dexplay-darkPurple/70 backdrop-blur-sm">
      <div className="p-3 border-b border-white/10">
        <h3 className="text-white font-semibold">Live Chat</h3>
      </div>

      {/* Emoji Reactions */}
      <div className="relative overflow-hidden h-12 border-b border-white/10 bg-dexplay-darkPurple/90">
        <div className="flex items-center space-x-2 p-2 overflow-x-auto">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleEmojiClick(emoji)}
              className="hover:bg-white/10 p-1 rounded transition-colors"
            >
              {emoji}
            </button>
          ))}
        </div>
        
        {/* Floating emojis */}
        {reactions.map((reaction) => (
          <div
            key={reaction.id}
            className="absolute bottom-0 reaction-bubble"
            style={{ left: `${reaction.position}%` }}
          >
            <span className="text-xl">{reaction.emoji}</span>
          </div>
        ))}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className="group flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-dexplay-purple flex items-center justify-center flex-shrink-0">
                <UserIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className={cn(
                    "font-medium text-sm",
                    msg.username === "You" ? "text-dexplay-purple" : "text-gray-300"
                  )}>
                    {msg.username}
                  </span>
                  <span className="ml-2 text-xs text-gray-500">
                    {formatTimestamp(msg.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-white">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10">
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message..."
            className="bg-dexplay-darkPurple/50 border-white/20"
          />
          <Button type="submit" className="bg-dexplay-purple hover:bg-dexplay-brightPurple">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
