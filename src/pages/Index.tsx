import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  titleVariants,
  paragraphVariants,
  buttonVariants,
} from "../animations";

export default function Index() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ position: "absolute", width: "100%", top: 0, left: 0 }}
    >
      <motion.h1 variants={titleVariants}>Welcome to Index</motion.h1>
      <motion.p variants={paragraphVariants}>This is the homepage.</motion.p>
      <Link to="/work">
        <motion.button variants={buttonVariants}>Go to Work</motion.button>
      </Link>
    </motion.div>
  );
}
