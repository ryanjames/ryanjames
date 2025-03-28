import { motion } from "framer-motion";
import styled from "styled-components";
import { styles } from "../components/Styles";
import {
  heroVariants,
} from "../animations";

export default function Index() {
  return (
    <SHero>
      <motion.h2 variants={heroVariants} initial="initial" animate="animate" exit="exit">
        Aenean eu leo quam. Pellentesque ornare sem lacinia quam
        venenatis vestibulum. Duis mollis, est non commodo luctus, nisi erat
        porttitor ligula, eget lacinia odio sem nec elit. 
      </motion.h2>
    </SHero>
  );
}

const SHero = styled.div`
  position: absolute;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  padding-left: ${styles.measurements.mobile.margin}px;
  @media (min-width: ${styles.breakpoints.small}px) {
    padding-left: ${styles.measurements.desktop.margin}px;
  }
  width: 100%;
  display: flex;
  align-items: center;
  h2 {
    font-weight: 300;
    width: 90%;
    font-size: 2em;
    @media (min-width: ${styles.breakpoints.small}px) {
      font-size: 3em;
      width: 80%;
    }
    @media (min-width: ${styles.breakpoints.medium}px) {
      font-size: 3.5em;
    }
    @media (min-width: ${styles.breakpoints.large}px) {
      font-size: 4em;
      width: 65%;
    }
    line-height: 100%;
  }
`;