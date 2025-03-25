import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  titleVariants,
  paragraphVariants,
  buttonVariants,
} from "../animations";

export default function About() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ position: "absolute", width: "100%", top: 0, left: 0 }}
    >
      <motion.h1 variants={titleVariants}>About Page</motion.h1>
      <motion.p variants={paragraphVariants}>
        Here's the about section.
      </motion.p>
      <Link to="/">
        <motion.button variants={buttonVariants}>Back to Index</motion.button>
      </Link>
    </motion.div>
  );
}
