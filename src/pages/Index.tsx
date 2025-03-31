import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { styles } from "../components/Styles";
import {
  heroVariants,
} from "../animations";

export default function Index() {
  return (
    <SHero>
      <Helmet>
        <title>Ryan James - Designer and Developer</title>
        <meta name="description" content="Ryan James - Designer and Developer" />
      </Helmet>
      <motion.div
        variants={heroVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h2>
          Ryan James is a multidisciplinary designer and developer with 20+
          years of experience. He combines strategic thinking with hands-on
          execution, working seamlessly in teams of all sizes. From UX,
          interface design, and design systems to bringing brands and artists’
          visions to life, he takes a thoughtful, enthusiastic approach to every
          project.
        </h2>
        <Link to="/work#san-francisco-standard-featured">View Work</Link>
      </motion.div>
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
  display: flex;
  align-items: center;
  font-size: 1.4em;
  @media (min-width: ${styles.breakpoints.small}px) {
    font-size: 1.6em;
    padding-left: calc(2vw + ${styles.measurements.desktop.margin}px);
  }
  @media (min-width: ${styles.breakpoints.medium}px) {
    font-size: 2em;
  }
  @media (min-width: ${styles.breakpoints.large}px) {
    font-size: 2.2em;
  }
  @media (min-width: ${styles.breakpoints.xLarge}px) {
    font-size: 2.5em;
  }
  h2 {
    width: 100%;
    @media (min-width: ${styles.breakpoints.medium}px) {
      padding-top: ${styles.measurements.desktop.headerHeight}px;
      width: 80%;
    }
    @media (min-width: ${styles.breakpoints.large}px) {
      width: 65%;
    }
    @media (min-width: ${styles.breakpoints.xLarge}px) {
      width: 55%;
    }
    font-size: 1em;
    font-weight: 300;
    width: 90%;
    line-height: 120%;
    margin-bottom: 0.5em;
  }
  a, a:visited, a:active {
    color: ${styles.colors.active} !important;
  }
`;