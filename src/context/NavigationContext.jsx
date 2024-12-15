import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [history, setHistory] = useState([]); // Store route history
  const [currentIndex, setCurrentIndex] = useState(-1); // Track current position in history
  const location = useLocation();

  useEffect(() => {
    // Update history when location changes
    setHistory((prev) => {
      const newHistory = [...prev];
      if (currentIndex === prev.length - 1) {
        newHistory.push(location.pathname);
      } else {
        newHistory.splice(currentIndex + 1, prev.length, location.pathname);
      }
      return newHistory;
    });
    setCurrentIndex((prev) => prev + 1);
  }, [location]);

  const backRoute = currentIndex > 0 ? history[currentIndex - 1] : null;
  const forwardRoute = currentIndex < history.length - 1 ? history[currentIndex + 1] : null;

  return (
    <NavigationContext.Provider value={{ backRoute, forwardRoute }}>
      {children}
    </NavigationContext.Provider>
  );
};
