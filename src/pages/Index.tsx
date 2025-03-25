import { motion } from "framer-motion";
import {
  titleVariants,
  paragraphVariants,
} from "../animations";
import { SBody } from "../components/Styles";

export default function Index() {
  return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ position: "absolute", width: "100%", top: 0, left: 0 }}
      >
        <SBody>
          <motion.h1 variants={titleVariants}>Welcome to Index</motion.h1>
          <motion.p variants={paragraphVariants}>This is the homepage.</motion.p>
        </SBody>
      </motion.div>
  );
}
