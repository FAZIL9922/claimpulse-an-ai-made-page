import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import UploadPolicy from "./pages/UploadPolicy";
import TreatmentChecker from "./pages/TreatmentChecker";
import Documentation from "./pages/Documentation";
import ClaimPredictor from "./pages/ClaimPredictor";
import PersonaEOB from "./pages/PersonaEOB";
import Glossary from "./pages/Glossary";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/upload-policy" element={<UploadPolicy />} />
          <Route path="/treatment-checker" element={<TreatmentChecker />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/claim-predictor" element={<ClaimPredictor />} />
          <Route path="/persona-eob" element={<PersonaEOB />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/feedback" element={<Feedback />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
