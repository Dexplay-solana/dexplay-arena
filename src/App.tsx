
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Livestreams from "./pages/Livestreams";
import LivestreamView from "./pages/LivestreamView";
import NotFound from "./pages/NotFound";
import Trading from "./pages/Trading";
import P2P from "./pages/P2P";
import P2PNfts from "./pages/P2PNfts";
import CrossGameNfts from "./pages/CrossGameNfts";
import CrossChain from "./pages/CrossChain";
import Staking from "./pages/Staking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Livestreams />} />
          <Route path="/livestreams" element={<Livestreams />} />
          <Route path="/livestream/:id" element={<LivestreamView />} />
          <Route path="/cross-chain" element={<CrossChain />} />
          <Route path="/stake" element={<Staking />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/p2p" element={<P2P />} />
          <Route path="/p2p/nfts" element={<P2PNfts />} />
          <Route path="/p2p/cross-game" element={<CrossGameNfts />} />
          <Route path="/nfts" element={<NotFound />} />
          <Route path="/leaderboard" element={<NotFound />} />
          <Route path="/competitions" element={<NotFound />} />
          <Route path="/token-creation" element={<NotFound />} />
          <Route path="/about" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
