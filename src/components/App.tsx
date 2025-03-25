import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Index from "../pages/Index";
import Work from "../pages/Work";

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const [isPageReady, setIsPageReady] = useState(false); // Control page readiness

  // Trigger page readiness when the location changes
  useEffect(() => {
    setIsPageReady(false);
    const timer = setTimeout(() => {
      setIsPageReady(true);
    }, 100); // Adjust delay for timing
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <AnimatePresence>
      {isPageReady && (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, filter: "blur(10px)" }} // Initial state for entering page
          animate={{ opacity: 1, filter: "blur(0px)" }} // Final state for entering page
          exit={{ opacity: 0, filter: "blur(10px)" }} // State for exiting page
          transition={{ duration: 0.6, ease: "easeInOut" }} // Transition duration and easing
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1,
          }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Index />} />
            <Route path="/work" element={<Work />} />
          </Routes>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
