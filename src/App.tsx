
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Livestreams from "./pages/Livestreams";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/livestreams" element={<Livestreams />} />
          <Route path="/cross-chain" element={<NotFound />} />
          <Route path="/stake" element={<NotFound />} />
          <Route path="/trading" element={<NotFound />} />
          <Route path="/p2p" element={<NotFound />} />
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
