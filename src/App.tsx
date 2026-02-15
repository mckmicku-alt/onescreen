import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Browse from "./pages/Browse";
import Title from "./pages/Title";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Thanks from "./pages/Thanks";

const BETA_LOCK = import.meta.env.VITE_BETA_LOCK === "true";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Toast systems */}
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            {BETA_LOCK ? (
              <>
                <Route path="/" element={<Index />} />
                <Route path="/thanks" element={<Thanks />} />
                <Route path="*" element={<Index />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Index />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/title/:type/:id" element={<Title />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/thanks" element={<Thanks />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
