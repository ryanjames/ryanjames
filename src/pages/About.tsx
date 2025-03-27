import { motion } from "framer-motion";
import { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function About() {

  useEffect(() => {
    document.body.classList.add("about");

    return () => {
      document.body.classList.remove("about");
    };
  }, []);

  return (
    <SAbout
      initial="initial"
      animate="animate"
      exit="exit"
    >
        <motion.h1>About Page</motion.h1>
        <motion.p>
          Here's the about section.
        </motion.p>
        <Link to="/">
          <motion.button>Back to Index</motion.button>
        </Link>
    </SAbout>
  );
}

const SAbout = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  padding-top: 80px;
  left: 0;
  bottom: 0;
`;