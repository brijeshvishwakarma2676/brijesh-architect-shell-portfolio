import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import ExperiencePage from "./pages/ExperiencePage";
import PhilosophyPage from "./pages/PhilosophyPage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import TerminalLoader from "./components/TerminalLoader";

function App() {
  const [loading, setLoading] = useState(true);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    // Check if the loader has already been shown in this session
    const hasShownLoader = sessionStorage.getItem("hasShownTerminalLoader");
    if (hasShownLoader) {
      setIsReload(true);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("hasShownTerminalLoader", "true");
    setLoading(false);
  };

  if (loading) {
    return <TerminalLoader onComplete={handleComplete} isReload={isReload} />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
