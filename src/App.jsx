// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import PortfolioPage from "./pages/PortfolioPage";
import ClassroomTechPage from "./pages/ClassroomTechPage";

// Wrapper component to track navigation state
function AppContent() {
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if this is a page refresh
    const navEntries = performance.getEntriesByType("navigation");
    const isPageRefresh =
      navEntries.length > 0 && navEntries[0].type === "reload";
    setIsRefresh(isPageRefresh);
  }, []);

  // Reset refresh state on route changes
  useEffect(() => {
    if (hasLoadedOnce) {
      setIsRefresh(false);
    }
  }, [location, hasLoadedOnce]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainPage
            hasLoadedOnce={hasLoadedOnce}
            setHasLoadedOnce={setHasLoadedOnce}
            isRefresh={isRefresh}
          />
        }
      />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/classroom" element={<ClassroomTechPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
