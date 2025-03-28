import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { styles } from "../components/Styles";
import {
  heroVariants,
} from "../animations";

export default function Index() {
  return (
    <SHero>
      <motion.div
        variants={heroVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h2>
        Ryan James is a multidisciplinary designer and developer with 20+ years
        of experience. He combines strategic thinking with hands-on execution,
        working seamlessly in teams of all sizes. From UX, interface design, and
        design systems to bringing brands and artists’ visions to life, he takes
        a thoughtful, enthusiastic approach to every project.
        </h2>
        <div>
          <SButton to="/work">View Work</SButton>
        </div>
      </motion.div>
    </SHero>
  );
}

const SButton = styled(Link)`
  font-size: 1rem;
  border-radius: 3px;
  margin-top: 1.5em;
  background: ${styles.colors.active};
  color: ${styles.colors.white} !important;
  display: inline-block;
  line-height: 100%;
  padding: 1em 1em;
`

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
    line-height: 120%;
    font-size: 1.4em;
    @media (min-width: ${styles.breakpoints.small}px) {
      font-size: 1.6em;
    }
    @media (min-width: ${styles.breakpoints.medium}px) {
      padding-top: ${styles.measurements.desktop.headerHeight}px;
      font-size: 2em;
      width: 80%;
    }
    @media (min-width: ${styles.breakpoints.large}px) {
      font-size: 2.2em;
      width: 65%;
    }
    @media (min-width: ${styles.breakpoints.xLarge}px) {
      font-size: 2.5em;
      width: 55%;
    }
  }
`;