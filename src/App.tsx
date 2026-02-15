const BETA_LOCK = import.meta.env.VITE_BETA_LOCK === "true";
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
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster position="top-center" />
      {/* reszta Twojej appki */}
    </>
  );
}




const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
<Routes>
  <Route path="/" element={<Index />} />

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

export default App;
