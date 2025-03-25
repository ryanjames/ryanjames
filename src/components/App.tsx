import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Header from "./Header";
import Index from "../pages/Index";
import Work from "../pages/Work";
import About from "../pages/About";

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
function AnimatedRoutes() {
  const location = useLocation();
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    setIsPageReady(false);
    const timer = setTimeout(() => {
      setIsPageReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <Header />
      <AnimatePresence>
        {isPageReady && (
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
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
              <Route path="/about" element={<About />} />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
