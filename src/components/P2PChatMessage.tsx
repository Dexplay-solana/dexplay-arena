
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface P2PChatMessageProps {
  user: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  user: string;
  isMe: boolean;
  content: string;
  timestamp: Date;
}

export function P2PChatMessage({ user, isOnline }: P2PChatMessageProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: user,
      isMe: false,
      content: "Hello! I'm interested in your offer.",
      timestamp: new Date(Date.now() - 60000 * 30),
    },
    {
      id: "2",
      user: "You",
      isMe: true,
      content: "Great! Do you have any questions?",
      timestamp: new Date(Date.now() - 60000 * 25),
    },
    {
      id: "3",
      user: user,
      isMe: false,
      content: "What's the minimum amount I can buy?",
      timestamp: new Date(Date.now() - 60000 * 20),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        user: "You",
        isMe: true,
        content: inputValue,
        timestamp: new Date(),
      };
      
      setMessages([...messages, newMessage]);
      setInputValue("");
      
      // Simulate a response
      setTimeout(() => {
        const response = {
          id: (Date.now() + 1).toString(),
          user: user,
          isMe: false,
          content: "Thanks for your message. I'll get back to you soon!",
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, response]);
        toast(`New message from ${user}`);
      }, 5000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-dexplay-darkPurple/50 border border-dexplay-purple/40 hover:bg-dexplay-purple/20"
        >
          <MessageCircle className="h-4 w-4 text-dexplay-purple" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[90%] sm:w-[385px] bg-dexplay-darkPurple border-l border-white/10">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center">
            <span>{user}</span>
            <span className="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="ml-1 text-xs text-gray-400">
              {isOnline ? "Online" : "Offline"}
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100%-120px)] mt-4">
          <div className="flex-grow overflow-y-auto pr-2">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isMe
                        ? "bg-dexplay-purple text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-gray-300 mt-1 text-right">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Input
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSend}
              className="ml-2 text-dexplay-purple hover:bg-dexplay-purple/20"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
